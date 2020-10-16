import React from 'react'
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute(props) {
    const { isAuthenticated, ...rest } = props;
    let output;
    (isAuthenticated) ? output = <Route {...rest} /> : output = <Redirect to='/login' />;
    return <React.Fragment>{ output }</React.Fragment>
}
