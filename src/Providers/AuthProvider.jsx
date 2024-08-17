import React, { createContext, useState, useEffect } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';
import auth from '../firebase.config';

// Create a Context for the Auth
export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

// Create the AuthProvider component
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Google login
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .catch(error => toast.error(error.message))
            .finally(() => setLoading(false));
    };

    // Register user with email and password
    const createUser = async (email, password) => {
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            setUser(result.user);
            toast.success('Registration Successful');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error('Email already in use');
            } else if (error.code === 'auth/weak-password') {
                toast.error('Password should be at least 6 characters');
            } else {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    // Sign in user with email and password
    const signInUser = async (email, password) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setUser(result.user);
            toast.success('Sign In Successful');
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                toast.error('Incorrect password');
            } else if (error.code === 'auth/user-not-found') {
                toast.error('User not found');
            } else {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    // Log out user
    const logOutUser = async () => {
        await signOut(auth);
        toast.success('Logged Out Successfully');
        setUser(null);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [user]);

    const contextValue = { user, createUser, signInUser, logOutUser, googleLogin, loading };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
