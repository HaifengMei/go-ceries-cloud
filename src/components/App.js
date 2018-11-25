import React, { Component } from 'react';
import '../assets/css/App.css';
import Index from '../pages/Index';
import routes from '../config/routes'
import { BrowserRouter } from "react-router-dom";
import UserStore from '../stores/UserStore';
import { observer } from 'mobx-react';

@observer
class App extends Component {

  async componentDidMount() {
    await UserStore.authenticate()
  }

  render() {
    return (
      <BrowserRouter>
        {!UserStore.isAuthenticating &&
          <Index>
            {routes}
          </Index>
        }
      </BrowserRouter>
    );
  }
}

export default App;
