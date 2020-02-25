import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Pricer from "./Pricer"
//import Main from "./Main";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Pricer}/>
        <Route exact path='/visualizer' component={Pricer} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
