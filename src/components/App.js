import React, { Component } from 'react';
import '../assets/css/App.css';
import Index from '../pages/Index';
import routes from '../config/routes'
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Index>
          {routes}
        </Index>
      </BrowserRouter>
    );
  }
}

export default App;
