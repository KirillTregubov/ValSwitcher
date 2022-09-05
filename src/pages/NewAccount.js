import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { XIcon } from '@heroicons/react/outline'

export default function NewAccount() {
  const navigate = useNavigate()
  // TODO: configuration for new account
  const username = 'thespectra23'
  const agent = 'Chamber'

  const createAccount = async () => {
    const success = await window.app.emitSync('create-account', {
      username,
      agent
    })

    if (success) {
      navigate(`/account/${username}`)
    }
  }

  return (
    <>
      <div>New Account</div>
      <button onClick={createAccount}>Create Account</button>
      <Link
        className="mb-2 inline-flex items-center rounded-full pr-2 font-medium text-zinc-500 outline-none ring-zinc-600 focus-visible:ring-2"
        to={'/home'}
      >
        <XIcon className="h-4 w-4" />
        <span>Cancel</span>
      </Link>
    </>
  )
}
