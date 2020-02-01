import React from 'react';
import './App.css';
import ClustererCreate from "./map";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Menu from "./components/menu/menu";
import Filter from "./components/filterComponent/filter";
import Cards from "./components/cards/cards";



function App() {
  return (
        <Router>
            <div>
                <Menu />
            </div>
            <Switch>
                <Route exact path={"/"} >
                    <Filter/>
                    <Cards/>
                </Route>
                <Route exact path="/map" component={ClustererCreate} />
            </Switch>
        </Router>
  );
}

export default App;
