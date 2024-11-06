"use client"

import React from 'react';
import {type StateContextProps} from '@/stateContext';

export interface StateContextProviderProp {
    value: StateContextProps;
    children: React.ReactNode;
}

export const StateContext = React.createContext<StateContextProps | null>(null);

export const StateContextProvider = ({ value, children } : StateContextProviderProp) => {
    return(
        <StateContext.Provider value={value}>
            { children }
        </StateContext.Provider>
    );
}