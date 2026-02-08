
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const fetchHealth = async () => {
    // Relative path for compatibility with Docker/Coolify proxies
    try {
        const response = await axios.get('/api/health')
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to fetch health status')
    }
}

function App() {
    const { isPending, isError, data, error, refetch } = useQuery({
        queryKey: ['health'],
        queryFn: fetchHealth,
    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-6 selection:bg-blue-200">
            <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-8 text-center transition-all duration-300 hover:shadow-3xl ring-1 ring-gray-100">
                <h1 className="text-3xl font-extrabold mb-8 text-gray-800 tracking-tight">System Status</h1>

                {isPending && (
                    <div className="flex flex-col items-center justify-center space-y-4 py-8">
                        <div className="relative">
                            <div className="h-16 w-16 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
                        </div>
                        <p className="text-gray-500 font-medium animate-pulse">Checking system health...</p>
                    </div>
                )}

                {isError && (
                    <div className="bg-red-50 border border-red-100 rounded-xl p-6 shadow-sm">
                        <div className="text-red-500 text-6xl mb-3 transform transition-transform hover:rotate-12 inline-block">⚠️</div>
                        <h2 className="text-xl font-bold text-red-700 mb-2">Service Unavailable</h2>
                        <p className="text-red-600 text-sm mb-4">{error.message}</p>
                        <button
                            onClick={() => refetch()}
                            className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-full text-sm font-semibold transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {data && (
                    <div className="bg-green-50 border border-green-100 rounded-xl p-6 shadow-sm">
                        <div className="text-green-500 text-6xl mb-3 transform transition-transform hover:scale-110 inline-block">✅</div>
                        <h2 className="text-xl font-bold text-green-800 mb-3">All Systems Operational</h2>
                        <div className="text-green-700 font-mono text-sm bg-green-100 px-4 py-2 rounded-lg inline-block break-all">
                            {typeof data === 'object' ? JSON.stringify(data.message || data) : data}
                        </div>
                        <div className="mt-6 text-xs text-gray-400">
                            Last checked: {new Date().toLocaleTimeString()}
                        </div>
                    </div>
                )}

                <div className="mt-8 text-xs text-gray-400 font-light">
                    health-frontend v1.0.0
                </div>
            </div>
        </div>
    )
}

export default App
