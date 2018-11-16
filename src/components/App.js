import React, { Component } from 'react';
import '../assets/css/App.css';
import Index from '../pages/Index';
import routes from '../config/routes'
import { BrowserRouter } from "react-router-dom";
import state from '../stores/State'
import createContext from '../config/context'
import autorun from '../config/autorun'
const context = createContext(state)

// React to changes
autorun(context)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Index {...context} >
          {routes}
        </Index>
      </BrowserRouter>
    );
  }
}

export default App;
