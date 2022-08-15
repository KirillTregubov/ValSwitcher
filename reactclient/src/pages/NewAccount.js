import React from 'react'
import { Link } from 'react-router-dom'
import { XIcon } from '@heroicons/react/outline'

export default function Account() {
  return (
    <>
      <div>New Account</div>
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
