import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchUser, fetchWallet, fetchPrices } from '../../actions'

import useAuth from '../../Helpers/useAuth'
import Header from '../Header'
import Dashboard from '../Dashboard'
import Login from '../Login'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
    dispatch(fetchWallet())
    dispatch(fetchPrices())
  }, [dispatch])

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={useAuth(Dashboard)} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
