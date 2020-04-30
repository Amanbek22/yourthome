import React, {Suspense, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MenuContainer from "./components/menu/menu";
import {FilterContainer} from "./components/filterComponent/filterContainer";
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
import {initializeApp, initializeAppData} from "./redux/appReducer";
import {compose} from "redux";

function App(props) {
    const allPromiseRejection = (promiseRejectionEvent) =>{
        alert(promiseRejectionEvent)
    }
    useEffect( () => {
        props.initializeAppData()
        props.initializeApp()
        window.addEventListener('unhandledrejection', allPromiseRejection)
        return () => {
            window.removeEventListener('unhandledrejection', allPromiseRejection)
        }
    }, [])
    if (!props.initialized.initialise) {
        return <div>
            <div className="App-header">
                <h2>Yourt Home</h2>
            </div>
            <p className="App-intro">
                Loading site...
            </p></div>
    }
    return (
        <div className="wrapper">
            <Router>
                <div className={"menuWrapper"}>
                    <MenuContainer/>
                </div>
                <div className={"content"}>
                    <Suspense fallback={<div style={{textAlign: 'center'}}>Загрузка...</div>}>
                        <Switch>
                            <Route exact path={"/"}>
                                <div className={'filterPage'}>
                                {/*<MainPage />*/}
                                <FilterContainer/>
                                {/*<Cards/>*/}
                                <Footer/>
                                </div>
                            </Route>
                            <Route exact path={"/add-apartment"}>
                                <AddApartment/>
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
                                <Admin/>
                            </Route>
                            <Route exact path={"/change-apartment/:id"}>
                                <ChangeApartment/>
                            </Route>
                            <Route exact path={"/booking/:id"}>
                                <BookingSystem/>
                            </Route>
                            <Route exact path={"/addPhoto/:id"}>
                                <AddPhoto/>
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
        initialized: state.app
    }
}
export default compose(connect(mapStateToProps, {initializeApp,initializeAppData}))(App);
