//@ts-check
import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthProvider from './components/AuthProvider'
import App from './App.jsx'

import './index.css'

const BASE_URL = import.meta.env.BASE_URL
if (!BASE_URL) {
    throw new Error('BASE_URL is not defined')
}

const rootElement = document.getElementById('root')
if (!rootElement) {
    throw new Error('root element was not found!')
}

console.table(import.meta.env)

const root = ReactDOM.createRoot(rootElement)
root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
)
