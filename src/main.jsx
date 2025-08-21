// import React from 'react';
import './index.css'
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import * as React from "react";
import { HeroUIProvider } from "@heroui/react";



const root = createRoot(document.getElementById('root'));
root.render(
    <HeroUIProvider>
        {/* <AuthContextProvider> */}

            <App />

        {/* </AuthContextProvider> */}
    </HeroUIProvider>
);
