import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Form, Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <span className="loading loading-dots loading-lg"></span>
    }
    if (user) {
        return children;
    }
    return (
        <Navigate to='/login' state={{from:location}}></Navigate>
    );
};

export default PrivateRoute;