import React from 'react';
import { StateContext } from '.';

export default function useContext(){
    const context = React.useContext(StateContext);
    if(!context) {
        throw new Error("Must be used within Statecontext");
    }
    
    return { ...context }

}