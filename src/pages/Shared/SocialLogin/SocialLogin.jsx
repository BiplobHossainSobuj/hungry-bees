import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const SocialLogin = () => {
    const {loginWithGoogle} = useAuth();
    const axiosPublic = useAxiosPublic();
    const handleGoogleLogin = () =>{
        loginWithGoogle()
        .then(res=>{
            const user = {email:res.user.email,name:res.user.displayName};
            axiosPublic.post('/users',user)
            .then(res=>console.log(res.data))
            console.log(res.user);
        })
    }
    return (
        <div className='mx-auto p-4'>
            <button onClick={handleGoogleLogin} className="btn btn-outline">
                <FaGoogle></FaGoogle>
                Google
            </button>
        </div>
    );
};

export default SocialLogin;