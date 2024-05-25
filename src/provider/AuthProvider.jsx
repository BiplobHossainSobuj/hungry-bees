import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import{ createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(user)=>{
            setUser(user);
            console.log('observer',user);
            setLoading(false);
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