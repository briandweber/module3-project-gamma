//@ts-check
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


import TournamentList from './components/Tournaments'
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import App from './App';
import AuthProvider from './components/AuthProvider';
import RandomNumberPage from './testpage';
import ProfileConstruct from './components/ProfileConstruct';
import TournamentApplicationList from './components/TournamentApplications';
import ApplicationConstruct from './components/ApplicationsConstruct'

import './index.css';

const BASE_URL = import.meta.env.BASE_URL;
if (!BASE_URL) {
    throw new Error('BASE_URL is not defined');
}

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [
                { path: 'signup', element: <SignUpForm /> },
                { path: 'signin', element: <SignInForm /> },
                { path: 'testpage', element: <RandomNumberPage /> },
                { path: 'tournaments', element: <TournamentList /> },
            ],
        },
        {
            path: '/profile',
            element: <ProfileConstruct />,
        },
        {
            path: '/applications/',
            element: <App />,
            children: [{ path: 'tournament', element: <ApplicationConstruct /> }],
        },
    ],
    {
        basename: BASE_URL,
    }
);

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('root element was not found!');
}

console.table(import.meta.env);

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
