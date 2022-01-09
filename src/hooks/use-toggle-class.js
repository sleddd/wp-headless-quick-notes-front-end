import React, { useState, useCallback } from "react";

export const useToggleClass = ( currentClass, toggleClasses ) => {
    // Set toggle class in state
    const [toggleClass, setToggleClass ] = useState(currentClass);
    /// Set toggle handler 
    const toggle = useCallback(() => {
        setToggleClass(toggleClasses[toggleClass]);
        console.log(toggleClass);
    });
    return [toggleClass, toggle, toggleClasses];
}