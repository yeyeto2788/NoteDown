import React, { createContext, useContext, useReducer } from "react";

export const ApplicationContext = createContext();

export const ApplicationStateProvider = ({ reducer, initialState, children }) => (
  <ApplicationContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ApplicationContext.Provider>
);

// To retrieve data from the data layer normally we'll do something like
// `const [{ propertyToFeth }, dispatch] = useApplicationValue();`
export const useApplicationValue = () => useContext(ApplicationContext);
