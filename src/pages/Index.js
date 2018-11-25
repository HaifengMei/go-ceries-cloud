import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import routes from '../config/routes'
import AppBar from '../components/common/AppBar'
import NotFound from './NotFound'
import Footer from '../components/common/Footer'
import Notification from '../components/common/Notification'


class Index extends Component {
  render() {
    // Wrapping with provider gives children access to stores
    return (
      <Provider {...this.props}>
        <div>
          <AppBar />
          <Switch>
            {routes.map((route, i) => {
              return <Route key={i} exact path={route.path} component={route.component} />
            })}
            <Route component={NotFound} />
          </Switch>
          <Notification />
          <Footer />
        </div>
      </Provider>
    )
  }
}

export default Index
