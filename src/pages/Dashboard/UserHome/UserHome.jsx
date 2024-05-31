import React from 'react';
import useAuth from '../../../hooks/useAuth';

const UserHome = () => {
    const {user} = useAuth()
    return (
        <div>
            {user?.displayName}
        </div>
    );
};

export default UserHome;