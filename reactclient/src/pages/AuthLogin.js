import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExclamationIcon } from '@heroicons/react/solid'

import Input from '../components/Input'
import { useAuthentication } from '../lib/Authentication'

export default function AuthLogin() {
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [warning, setWarning] = useState(null)
  const [, setAuthenticated] = useAuthentication()
  let navigate = useNavigate()

  const handleInput = (e) => {
    setPassword(e.target.value)

    if (e.target.value.length > 0) {
      setIsValid(true)
      setWarning('')
    } else {
      setIsValid(false)
    }
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      login()
    }
  }

  const login = (e) => {
    if (!isValid) {
      setWarning('Password cannot be empty.')
      return
    }

    const response = window.app.emitSync('login', {
      password: password
    })

    if (response) {
      navigate('/home')
      setAuthenticated(true)
    } else if (response === false) {
      setWarning('Incorrect password.')
    }
  }

  const resetData = async (e) => {
    // TODO: Trigger confirmation
    // Make method that resets data

    // setShowLogin(false);
    // setTimeout(() => { setShowRegister(true); }, 800);
    console.log('reset data')
    navigate('/register')
  }

  return (
    <div className="mx-auto max-w-md py-6 px-12 text-base">
      <h2 className="mb-2 text-lg font-medium">Welcome Back!</h2>
      <p>Please unlock your account data to continue.</p>
      <Input
        className="my-2"
        value={password}
        onChange={handleInput}
        onKeyDown={handleEnter}
        placeholder="Master Password"
        type="password"
        autoComplete="password"
        minLength="1"
      />
      {warning && (
        <p className="mb-3 flex animate-pulse items-center text-amber-500">
          <ExclamationIcon className="mr-1 h-6 w-6" />
          {warning}
        </p>
      )}
      <div className="mt-1 flex gap-2">
        <button
          className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-200 outline-none transition-all hover:scale-105 hover:border-zinc-900 hover:bg-zinc-700 hover:text-zinc-50 focus-visible:scale-105 focus-visible:ring-2 focus-visible:ring-zinc-500"
          tabIndex="1"
          onClick={resetData}
        >
          Reset Data
        </button>
        <button
          className="w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 outline-none transition-all hover:scale-105 hover:border-zinc-400 hover:bg-zinc-300 focus-visible:scale-105 focus-visible:ring-2 focus-visible:ring-zinc-500"
          tabIndex="0"
          onClick={login}
        >
          Unlock
        </button>
      </div>
    </div>
  )
}
