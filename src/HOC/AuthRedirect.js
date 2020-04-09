import React from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";



export const WithAuthRedirect = Component => {
    const RedirectComponent = props => {
        if(props.data.logged === true) return <Redirect to={'/admin'} />
        return <Component {...props}/>
    }
    const mapStateToProps = state => {
        return {
            data: state.data
        }
    }
    const RedirectComponentConnect = connect(mapStateToProps,{})(RedirectComponent);
    return RedirectComponentConnect
}



export const WithNotAuthRedirect = Component => {
    const RedirectComponent = props => {
        if(props.data.logged === false) return <Redirect to={'/sign-in'} />
        return <Component {...props}/>
    }
    const mapStateToProps = state => {
        return {
            data: state.data
        }
    }
    const AdminContainer = connect(mapStateToProps, {})(RedirectComponent)
    return AdminContainer
}

