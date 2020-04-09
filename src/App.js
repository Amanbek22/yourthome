import React, {Suspense, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom";
import MenuContainer from "./components/menu/menu";
import {FilterContainer} from "./components/filterComponent/filterContainer";
import Cards from "./components/cards/cards";
import About from "./components/abautCompony/abautCompony";
import Footer from "./components/footer/footer";
import WithRouterDeteilsPage from "./components/deteilesPage/deteilsPage";
import AddApartment from "./components/add_apartment/addApartmant";
import Admin from "./components/admin/admin";
import ChangeApartment from "./components/changeApartment/changeApartment";
import BookingSystem from "./components/BookingSystem/bookingSystem";
import AddPhoto from "./components/addPhoto/addPhoto";
import WrapperMapContainer from "./components/mapComponent/googleMapContainer";
import SignIn from "./components/signin/signin";
import SignUp from "./components/signUp/signup";
import {connect} from "react-redux";
import {setData} from "./redux/authReducer";
import {compose} from "redux";
function App(props) {
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('userData'));
        if (!data) {
            return 0
        } else {
            let logged = true
            props.setData(data, logged)
        }
    }, [])
    return (
      <div className="wrapper">
        <Router>
            <div className={"menuWrapper"}>
                <MenuContainer />
            </div>
            <div className={"content"}>
                <Suspense fallback={<div style={{textAlign: 'center'}}>Загрузка...</div>}>
                <Switch>
                <Route exact path={"/"}>
                    {/*<MainPage />*/}
                    <FilterContainer />
                    <Cards />
                    <About />
                    <Footer/>
                </Route>
                <Route exact path={"/add-apartment"}>
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
                <Route exact path={"/addPhoto/:id"}>
                    <AddPhoto />
                </Route>
            </Switch>
                </Suspense>
                </div>
        </Router>
      </div>
  );
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}
export default  compose(connect(mapStateToProps, {setData}))(App);
