import React from 'react'
import { useAuth } from '../../Hooks/useAuth'
import NotFound from '../../pages/Menu/components/NotFound/NotFound';
import AuthRoute from '../Loading/AuthRoute.js/AuthRoute';

function AdminRoute({children}) {

    const { user } = useAuth();

    return user.isAdmin ? ( children ) : ( 
        <NotFound
        linkRoute="/dashboard"
        linkText="Go to Dashboard"
        message="You do not have access to this page."
        />
    );
}

const AdminRouteExport = ({children}) => (
    <AuthRoute><AdminRoute>{children}</AdminRoute></AuthRoute>
);

export default AdminRouteExport;