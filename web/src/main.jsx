
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a query client with reasonable defaults
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1, // Retry failed requests once
            staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
            refetchOnWindowFocus: false, // Don't refetch on window focus
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>,
)
