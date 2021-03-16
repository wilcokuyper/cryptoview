<?php

namespace App\Http\Controllers;

use App\Models\WalletRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    protected WalletRepository $walletRepository;

    /**
     * WalletController constructor.
     *
     * @param WalletRepository $walletRepository
     */
    public function __construct(WalletRepository $walletRepository)
    {
        $this->walletRepository = $walletRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        return response()->json($this->walletRepository->getWallet($request->user()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        if ($request->has('currency') && $request->has('amount')) {
            $this->walletRepository->updateOrCreateItem(
                $request->user(),
                $request->input('currency'),
                $request->input('amount'),
                $request->get('update', false)
            );
        }

        return $this->index($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @param  $id
     * @return JsonResponse
     */
    public function destroy(Request $request, $id): JsonResponse
    {
        $this->walletRepository->deleteItem($request->user(), $id);
        return $this->index($request);
    }
}
