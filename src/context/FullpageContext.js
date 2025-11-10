// src/context/FullpageContext.js
import { createContext, useContext } from "react";

export const FullpageContext = createContext(null);

export const useFullpageAPI = () => useContext(FullpageContext);
