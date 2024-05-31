import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import{ createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic();
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(user)=>{
            setUser(user);
            const userInfo = {email:user.email}
            if(user){
                axiosPublic.post('/jwt',userInfo)
                .then(res=>{
                    if (res.data.token) {
                        localStorage.setItem('access-token',res.data.token);
                        setLoading(false);
                    }
                })
            }else{
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            console.log('observer',user);
            
            
        })
        return ()=>unSubscribe();
    },[])

    const loginWithGoogle =()=>{
        return signInWithPopup(auth,googleProvider);
    }
    const createUser =(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const login = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logout = ()=>{
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name)=>{
        return updateProfile(auth.currentUser, {
            displayName: name,
          })
    }

    const authInfo = {
        user,
        loading,
        createUser,
        login,
        logout,
        updateUserProfile,
        loginWithGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;