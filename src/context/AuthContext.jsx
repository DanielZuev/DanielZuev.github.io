// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import usePostRequest from './usePostRequest';
import useAuthPostRequest from './useAuthPostRequest';
import useAuthGetRequest from './useAuthGetRequest';
import useAuthDeleteRequest from './useAuthDeleteRequest';
import useAuthUpdateRequest from './useAuthUpdateRequest';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const postRequest = usePostRequest();
    const authPostRequest = useAuthPostRequest();
    const authGetRequest = useAuthGetRequest();
    const authDeleteRequest = useAuthDeleteRequest();
    const authUpdateRequest = useAuthUpdateRequest();

    const value = { postRequest, authPostRequest, authGetRequest, authDeleteRequest, authUpdateRequest };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
