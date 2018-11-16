import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import routes from '../config/routes'
import AppBar from '../components/common/AppBar'
import NotFound from './NotFound'
import Footer from '../components/common/Footer'

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
          <Footer />
        </div>
      </Provider>
    )
  }
}

Index.propTypes = {
  store: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
}

export default Index
