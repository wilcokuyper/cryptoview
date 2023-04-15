<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Services\CurrencyReader\CurrencyReader;
use App\Models\WalletRepository;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class CurrencyController extends Controller
{
    protected WalletRepository $walletRepository;

    public function __construct(WalletRepository $walletRepository)
    {
        $this->walletRepository = $walletRepository;
    }

    public function getCurrencyList(Request $request, CurrencyReader $reader, bool $default = false): JsonResponse
    {
        /** @var Collection $currency_list */
        $currency_list = Cache::remember(
            'currency_list',
            10,
            static fn() => $reader->getCoinList($default)
        );

        if ($request->has('q')) {
            $currency_list = $currency_list->filter(
                static fn($currency) => \Str::startsWith($currency['symbol'], $request->get('q')) || \Str::startsWith($currency['name'], $request->get('q'))
            );
        }

        return response()->json($currency_list->take(50)->values());
    }

    public function getPriceList(Request $request, CurrencyReader $reader): JsonResponse
    {
        $userCurrencies = array_map(
            static fn($currency) => $currency['currency'],
            $this->walletRepository->getCurrenciesInWallet($request->user())->toArray()
        );

        return response()->json($reader->getPriceList($userCurrencies));
    }

    public function getHistory(Request $request, CurrencyReader $reader): ?array
    {
        $currency = $request->get('currency');
        if (!$currency) {
            return [];
        }

        $count = $request->get('count', 10);
        return $reader->getHistoricalData($currency, $count);
    }
}
