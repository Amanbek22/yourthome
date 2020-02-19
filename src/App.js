import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Menu from "./components/menu/menu";
// import Filter from "./components/filterComponent/filter";
// import Cards from "./components/cards/cards";
// import Abaut from "./components/abautCompony/abautCompony";
import Footer from "./components/footer/footer";
import SignIn from "./components/signin/signin";
import SignUp from "./components/signUp/signup";
import WrapperMapContainer from "./components/mapComponent/googleMapContainer";
// import ExampleMap from "./exampleMap";
import MainPage from "./components/mainPage/mainPage";
import DeteilsPage from "./components/deteilesPage/deteilsPage";
import AddApartment from "./components/add_apartment/addApartmant";
// import someData from './point.json'

function App() {
  return (
      <div className="wrapper">
        <Router>
            <div className={"menuWrapper"}>
                <Menu />
            </div>
            <div className={"content"}>
            <Switch>
                <Route exact path={"/"}>
                    <MainPage />
                </Route>
                {/*<Route exact path={"/"} >*/}
                    {/*<Filter/>*/}
                    {/*<Cards/>*/}
                    {/*<Abaut/>*/}
                    {/*<div className={"footer"}>*/}
                        {/*<Footer />*/}
                    {/*</div>*/}
                {/*</Route>*/}
                <Route exact path="/map">
                    <WrapperMapContainer/>
                </Route>
                <Route exact path={"/sign_in"}>
                    <SignIn/>
                    <div className={"footer"}>
                        <Footer/>
                    </div>
                </Route>
                <Route exact path={"/sign_up"}>
                    <SignUp/>
                    <div className={"footer"}>
                        <Footer/>
                    </div>
                </Route>
                <Route exact path={"/more-info"}>
                    <DeteilsPage

                    />
                </Route>
                <Route exact path={"/add"}>
                    <AddApartment/>
                </Route>
            </Switch>
            </div>

        </Router>
      </div>
  );
}

export default App;
