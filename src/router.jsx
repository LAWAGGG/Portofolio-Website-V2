import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Achievement from './pages/Achievement'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'about', element: <About /> },
            { path: 'projects', element: <Projects /> },
            { path: 'achievement', element: <Achievement /> },
            { path: '*', element: <Navigate to="/" replace /> },
        ],
    },
])