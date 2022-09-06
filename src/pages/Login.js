import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExclamationIcon } from '@heroicons/react/solid'

import Input from '../components/Input'
import { useAuthentication } from '../lib/Authentication'
import Button from '../components/Button'

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
    <div className="mx-auto max-w-md select-none py-6 px-12 text-base">
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
        title="Master Password"
      />
      {warning && (
        <p className="mb-2 flex animate-pulse items-center text-amber-500">
          <ExclamationIcon className="mr-1 h-6 w-6" />
          {warning}
        </p>
      )}
      {/* <div className="mt-1 flex gap-2"> */}
      {/* <button
          className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm font-medium text-neutral-200 outline-none transition-all hover:scale-105 hover:border-neutral-900 hover:bg-neutral-700 hover:text-neutral-50 focus-visible:scale-105 focus-visible:ring-2 focus-visible:ring-neutral-500"
          tabIndex="1"
          onClick={resetData}
        >
          Reset Data
        </button> */}
      <Button className="mb-1.5 w-full" onClick={login}>
        Unlock
      </Button>
      <Button text onClick={resetData}>
        Reset your data
      </Button>
      {/* <button
          className="w-full rounded-md border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-900 outline-none transition-all hover:scale-105 hover:border-neutral-400 hover:bg-neutral-300 focus-visible:scale-105 focus-visible:ring-2 focus-visible:ring-neutral-500"
          tabIndex="0"
          onClick={login}
        >
          Unlock
        </button> */}
      {/* </div> */}
    </div>
  )
}
