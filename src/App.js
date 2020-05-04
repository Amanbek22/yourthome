import React, {Suspense, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {initializeApp, initializeAppData} from "./redux/appReducer";
import {compose} from "redux";
import MenuContainer from "./components/menu/menu";
import {FilterContainer} from "./components/filterComponent/filterContainer";
import Footer from "./components/footer/footer";
import WithRouterDeteilsPage from "./components/deteilesPage/deteilsPage";
import AddApartment from "./components/add_apartment/addApartmant";
import Admin from "./components/admin/admin";
import ChangeApartment from "./components/changeApartment/changeApartment";
import WrapperMapContainer from "./components/mapComponent/googleMapContainer";
import {connect} from "react-redux";
import Preloader from "./components/preloader/Preloader";
import AddPhoto from "./components/addPhoto/addPhoto";
const BookingSystem = React.lazy(()=> import("./components/BookingSystem/bookingSystem"));
const SignIn = React.lazy(()=>import("./components/signin/signin"));
const SignUp = React.lazy(()=> import("./components/signUp/signup"));
const About = React.lazy(()=> import("./components/about-us/About-us"));
const Feedback = React.lazy(()=> import("./components/feedback/feedback"));

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
        return <Preloader />
        {/*<div>*/}
            {/*<div className="App-header">*/}
                {/*<h2>Yourt Home</h2>*/}
            {/*</div>*/}
            {/*<p className="App-intro">*/}
                {/*Loading site...*/}
            {/*</p></div>*/}
    }
    return (
        <div className="wrapper">
            <Router>
                <div className={"menuWrapper"}>
                    <MenuContainer/>
                </div>
                <div className={"content"}>
                    <Suspense fallback={<Preloader/>}>
                        <Switch>
                            <Route exact path={"/"}>
                                <div className={'filterPage'}>
                                <FilterContainer/>
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
                            <Route path={"/more-info/:id"}>
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
                            <Route exact path={"/about-us"}>
                                <About/>
                            </Route>
                            <Route exact path={"/feedback"}>
                                <Feedback/>
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
