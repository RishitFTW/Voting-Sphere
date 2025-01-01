import {  SignupForm } from '@/components/SignupForm'
import React from 'react'

function Signup() {
  return (
    <div>
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gray-300">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
    </div>
  )
}

export default Signup