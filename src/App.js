import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MenuContainer from "./components/menu/menu";
import {FilterContainer} from "./components/filterComponent/filterContainer";
import Cards from "./components/cards/cards";
import About from "./components/abautCompony/abautCompony";
import Footer from "./components/footer/footer";
import SignIn from "./components/signin/signin";
import SignUp from "./components/signUp/signup";
import WrapperMapContainer from "./components/mapComponent/googleMapContainer";
// import ExampleMap from "./exampleMap";
import MainPage from "./components/mainPage/mainPage";
import WithRouterDeteilsPage from "./components/deteilesPage/deteilsPage";
import AddApartment from "./components/add_apartment/addApartmant";
import Admin from "./components/admin/admin";
import ChangeApartment from "./components/changeApartment/changeApartment";
import api from "./api/api";
import BookingSystem from "./components/BookingSystem/bookingSystem";

function App() {
  return (
      <div className="wrapper">
        <Router>
            <div className={"menuWrapper"}>
                <MenuContainer />
            </div>
            <div className={"content"}>
            <Switch>
                <Route exact path={"/"}>
                    {/*<MainPage />*/}
                    <FilterContainer />
                    <Cards />
                    <About />
                    <Footer/>
                </Route>
                <Route path={"/add-apartment"}>
                    <AddApartment />
                </Route>
                <Route exact path={"/map"}>
                    <WrapperMapContainer/>
                </Route>
                <Route exact path={"/sign-in"}>
                    <SignIn/>
                </Route>
                <Route exact path={"/sign-up"}>
                    <SignUp/>
                </Route>
                <Route exact path={"/more-info/:id"}>
                    <WithRouterDeteilsPage/>
                </Route>
                <Route exact path={"/admin"}>
                    <Admin />
                </Route>
                <Route exact path={"/change-apartment/:id"}>
                    <ChangeApartment/>
                </Route>
                <Route exact path={"/booking/:id"}>
                    <BookingSystem />
                </Route>
            </Switch>
            </div>
        </Router>
      </div>
  );
}

export default App;
