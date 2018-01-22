import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';

import Wallet from '../Wallet';
import AddWalletItem from '../../Helpers/Dialogs/AddWalletItem';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: {
        types: [],
        prices: []
      }
    }

    this.updateWallet = this.updateWallet.bind(this);
    this.deleteWalletItem = this.deleteWalletItem.bind(this);
  }

  componentDidMount() {
    this.props.fetchCurrencies();
    this.props.fetchPrices().then(() => this.timer = setInterval(this.props.fetchPrices, 10000));
    this.props.fetchWallet();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  updateWallet(values) {
    this.props.updateWalletItem(values, 'add').then(() => $('#addCurrencyModal').modal('hide'));
  }

  deleteWalletItem(id) {
    this.props.deleteWalletItem(id);
  }

  render() {
    return (
      <div>

        <div className="container">
          <div className="row">
            <div className="col-sm">

              <div className="d-flex">
                <h1 className="mr-auto">Cryptoview</h1>
                <button className="btn btn-primary ml-auto" data-toggle="modal" data-target="#addCurrencyModal"><i className="fa fa-plus" aria-hidden="true"></i></button>
              </div>

              <p>View your cryptocurrency balances</p>
              <Wallet items={this.props.wallet} prices={this.props.currencies.prices} editItem={this.editWalletItem} deleteItem={this.deleteWalletItem} />

            </div>
          </div>
        </div>

        <AddWalletItem currencies={this.props.currencies.types} onSubmit={this.updateWallet} />

      </div>
    );
  }
}

 const mapStateToProps = ({ wallet, currencies }) => {
   return {
     wallet,
     currencies
   }
 }

export default connect(mapStateToProps, actions)(App);
