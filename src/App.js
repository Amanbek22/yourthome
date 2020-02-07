import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Menu from "./components/menu/menu";
import Filter from "./components/filterComponent/filter";
import Cards from "./components/cards/cards";
import Abaut from "./components/abautCompony/abautCompony";
import Footer from "./components/footer/footer";
import SignIn from "./components/signin/signin";
import SignUp from "./components/signUp/signup";
import WrapperMap from "./googleMap";
import someData from './point.json'

function App() {
  return (
      <div className="wrapper">
        <Router>
            <div className={"menuWrapper"}>
                <Menu />
            </div>
            <div className={"content"}>
            <Switch>
                <Route exact path={"/"} >
                    <Filter/>
                    <Cards/>
                    <Abaut/>
                </Route>
                <Route exact path="/map">
                    <WrapperMap/>
                </Route>
                <Route exact path={"/sign_in"}>
                    <SignIn/>
                </Route>
                <Route exact path={"/sign_up"}>
                    <SignUp/>
                </Route>
            </Switch>
            </div>
            <div className={"footer"}>
                <Footer/>
            </div>
        </Router>
      </div>
  );
}

export default App;
