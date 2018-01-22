import React, { Component } from 'react';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import requireAuth from '../../Helpers/requireAuth';
import Header from '../Header';
import Dashboard from '../Dashboard';
import Login from '../Login';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
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
}

export default connect(null, actions)(App);
