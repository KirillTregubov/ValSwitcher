import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BadgeCheckIcon, ExclamationIcon } from '@heroicons/react/solid'

import { useAuthentication } from '../lib/Authentication'
import Input from '../components/Input'

// const BadgeEmptyIcon = ({ className }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className={className}
//     viewBox="0 0 20 20"
//     fill="currentColor"
//   >
//     <path
//       fill-rule="evenodd"
//       d="M6.267 3.455a3.066 3.066 0 0 0 1.745-.723 3.066 3.066 0 0 1 3.976 0 3.066 3.066 0 0 0 1.745.723 3.066 3.066 0 0 1 2.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 0 1 0 3.976 3.066 3.066 0 0 0-.723 1.745 3.066 3.066 0 0 1-2.812 2.812 3.066 3.066 0 0 0-1.745.723 3.066 3.066 0 0 1-3.976 0 3.066 3.066 0 0 0-1.745-.723 3.066 3.066 0 0 1-2.812-2.812 3.066 3.066 0 0 0-.723-1.745 3.066 3.066 0 0 1 0-3.976 3.066 3.066 0 0 0 .723-1.745 3.066 3.066 0 0 1 2.812-2.812Z"
//     />
//   </svg>
// )

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
    <div className="mx-auto flex max-w-window space-x-6 py-6 px-12 text-base text-zinc-300">
      <div>
        <h1 className="mb-2 text-xl font-medium text-zinc-200">
          Welcome to{' '}
          <span className="font-bold">
            <span className="text-valred">Valorant</span> Switcher
          </span>
        </h1>
        <p>Thanks for installing! With Valorant Switcher, you can:</p>
        <ul className="mt-2 mb-4">
          <li className="flex">
            <BadgeCheckIcon className="box-content h-5 w-5 flex-shrink-0 p-0.5 text-valred" />
            <h2 className="ml-1 text-valred-50">
              View all your Riot accounts in one place
            </h2>
          </li>
          <li className="mt-2 flex">
            <BadgeCheckIcon className="box-content h-5 w-5 flex-shrink-0 p-0.5 text-valred" />
            <h2 className="ml-1 text-valred-50">
              Switch between them with ease
            </h2>
          </li>
        </ul>
        <p>
          For your security, please set a master password to secure your account
          data with.
        </p>
        <p className="mt-1">Do NOT re-use an account password.</p>
      </div>
      <div className="my-auto w-80 flex-shrink-0 space-y-3">
        <div className="space-y-2">
          <Input
            value={password}
            onChange={handleInput}
            placeholder="Master Password"
            type="password"
            autoComplete="new-password"
            minLength="1"
            title="Master Password"
          />
          {warning && (
            <p
              className={`-mt-1 mb-3 flex animate-pulse items-center text-amber-500`}
              key={warning}
            >
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
            title="Repeat Master Password"
          />
          {repeatWarning && (
            <p className="-mt-1 mb-3 flex animate-pulse items-center text-amber-500">
              <ExclamationIcon className="mr-1 h-6 w-6" />
              {repeatWarning}
            </p>
          )}
        </div>
        <div className="flex gap-2">
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
    </div>
  )
}
