import React, { useState } from 'react';
import { Router, Lock, User, Loader2 } from 'lucide-react';
import type { LoginCredentials } from '../types/mikrotik';
import { useMikrotikLogin } from '../hooks/useMikrotikLogin';

export function LoginForm() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    host: '',
    username: '',
    password: '',
    port: 8728,
  });

  const { loginState, login } = useMikrotikLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center mb-8">
        <Router className="w-12 h-12 text-blue-600 mb-2" />
        <h1 className="text-2xl font-bold text-gray-900">MikroTik Login</h1>
        <p className="text-gray-600">Connect to your router</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="host" className="block text-sm font-medium text-gray-700">
            Router IP/Hostname
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              id="host"
              value={credentials.host}
              onChange={(e) => setCredentials({ ...credentials, host: e.target.value })}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="192.168.1.1"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="block w-full pl-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="admin"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="block w-full pl-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="port" className="block text-sm font-medium text-gray-700">
            Port (Optional)
          </label>
          <input
            type="number"
            id="port"
            value={credentials.port}
            onChange={(e) => setCredentials({ ...credentials, port: parseInt(e.target.value) })}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="8728"
          />
        </div>

        {loginState.error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            {loginState.error}
          </div>
        )}

        <button
          type="submit"
          disabled={loginState.isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loginState.isLoading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Connecting...
            </>
          ) : (
            'Connect'
          )}
        </button>
      </form>
    </div>
  );
}