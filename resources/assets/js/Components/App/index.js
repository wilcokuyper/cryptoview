import React, { useEffect } from 'react';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {fetchUser, fetchWallet, fetchCurrencies, fetchPrices} from '../../actions';

import requireAuth from '../../Helpers/requireAuth';
import Header from '../Header';
import Dashboard from '../Dashboard';
import Login from '../Login';

export default function () {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchCurrencies());
    dispatch(fetchWallet());
    dispatch(fetchPrices());
  }, []);
    
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={requireAuth(Dashboard)} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}
