import { LoginForm } from '@/components/LoginForm'
import React from 'react'

function Login() {
  return (
    <div>
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gray-300">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
    </div>
  )
}

export default Login