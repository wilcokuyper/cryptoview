<?php

namespace App\Http\Controllers;

use App\Models\WalletItem;
use App\Models\WalletRepository;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    protected $walletRepository;

    public function __construct(WalletRepository $walletRepository)
    {
        $this->middleware('auth');
        $this->walletRepository = $walletRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return response()->json($this->walletRepository->getWallet($request->user()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      if($request->has('currency') && $request->has('amount'))
      {
          $this->walletRepository->updateOrCreateItem($request->user(), $request->input('currency'), $request->input('amount'));
      }

      return $this->index($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\WalletItem  $walletItem
     * @return \Illuminate\Http\Response
     */
    public function show(WalletItem $walletItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\WalletItem  $walletItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, WalletItem $walletItem)
    {
      if($request->has('currency') && $request->has('amount'))
      {
          $this->walletRepository->updateOrCreateItem($request->user(), $walletItem->currency, $walletItem->amount);
      }
      return $this->index($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\WalletItem  $walletItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
      $this->walletRepository->deleteItem($request->user(), $id);
      return $this->index($request);
    }
}
