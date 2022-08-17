import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExclamationIcon } from '@heroicons/react/solid'

import { useAuthentication } from '../lib/Authentication'
import Input from '../components/Input'

export default function AuthRegister() {
  const [password, setPassword] = useState('')
  const [warning, setWarning] = useState(null)
  const [repeatPassword, setRepeatPassword] = useState('')
  const [repeatWarning, setRepeatWarning] = useState(null)
  const [isValid, setIsValid] = useState(false)
  const [, setAuthenticated] = useAuthentication()
  let navigate = useNavigate()

  const handleInput = (event) => {
    setPassword(event.target.value)

    if (event.target.value.length > 0) {
      setWarning(null)
    } else {
      setWarning('Password cannot be empty.')
    }
  }

  const handleRepeatInput = (event) => {
    setRepeatPassword(event.target.value)

    if (password.length > 0 && event.target.value === password) {
      setIsValid(true)
      setRepeatWarning(null)
    } else {
      setIsValid(false)
    }
  }

  const register = (event) => {
    if (password.length > 0 && repeatPassword === password) {
      setIsValid(true)
    }

    if (!isValid) {
      if (password.length === 0) {
        setWarning('Password cannot be empty.')
        return
      }
      setRepeatWarning('Passwords must match.')
      return
    }

    const response = window.app.emitSync('register', {
      password: password
    })
    if (response) {
      navigate('/home')
      setAuthenticated(true)
    } else {
      // TODO: ERROR
      alert('We ran into an error...')
      setWarning(null)
      setRepeatWarning('An error occurred.')
    }
  }

  return (
    <div className="w-full max-w-md py-6 px-12 text-zinc-300">
      <h2 className="mb-2 text-lg font-medium text-zinc-200">
        Welcome to <span className="text-valred">Valorant</span> Switcher!
      </h2>
      <p className="mb-2">
        Valorant Switcher stores and automatically switches between accounts in
        the Riot Client, allowing you to switch between Valorant accounts with
        ease.
      </p>
      <p>
        For your security, please set a master password to secure your account
        data with. Do NOT re-use an account password.
      </p>
      <div className="my-3 space-y-2">
        <Input
          value={password}
          onChange={handleInput}
          placeholder="Master Password"
          type="password"
          autoComplete="new-password"
          minLength="1"
        />
        {warning && (
          <p className="-mt-1 mb-3 flex animate-pulse items-center text-amber-500">
            <ExclamationIcon className="mr-1 h-6 w-6" />
            {warning}
          </p>
        )}
        <Input
          value={repeatPassword}
          onChange={handleRepeatInput}
          placeholder="Repeat Master Password"
          type="password"
          autoComplete="new-password"
          minLength="1"
        />
        {repeatWarning && (
          <p className="-mt-1 mb-3 flex animate-pulse items-center text-amber-500">
            <ExclamationIcon className="mr-1 h-6 w-6" />
            {repeatWarning}
          </p>
        )}
      </div>
      <div className="mt-1 flex gap-2">
        <button
          className="w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 outline-none transition-all hover:scale-105 hover:border-zinc-400 hover:bg-zinc-300 focus-visible:scale-105 focus-visible:ring-2 focus-visible:ring-zinc-500"
          onClick={register}
        >
          Set Password
        </button>
        <button
          className="w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 outline-none transition-all hover:scale-105 hover:border-zinc-400 hover:bg-zinc-300 focus-visible:scale-105 focus-visible:ring-2 focus-visible:ring-zinc-500"
          onClick={() => navigate('/home')}
        >
          Go to Home
        </button>
      </div>
    </div>
  )
}
