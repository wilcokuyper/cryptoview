<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Services\CurrencyReader\CurrencyReader;
use App\Models\WalletRepository;
use Illuminate\Support\Facades\Cache;

class CurrencyController extends Controller
{
    protected WalletRepository $walletRepository;

    public function __construct(WalletRepository $walletRepository)
    {
        $this->walletRepository = $walletRepository;
    }

    public function getCurrencyList(CurrencyReader $reader, bool $default = false): JsonResponse
    {
        $currency_list = Cache::remember(
            'currency_list',
            10,
            function () use ($reader, $default) {
                return $reader->getCoinList($default);
            }
        );

        return response()->json($currency_list);
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
