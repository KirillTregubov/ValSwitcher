import React from 'react'
import { Link } from 'react-router-dom'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { LogoutIcon, PlusSmIcon } from '@heroicons/react/outline'

import Logo from '../assets/images/ValorantLogo.svg'
import { useAuthentication } from '../lib/Authentication'

export default function Navbar() {
  const [authenticated, setAuthenticated] = useAuthentication()
  const [parent] = useAutoAnimate({ duration: 300 })

  const logout = (event) => {
    const response = window.app.emitSync('logout')
    if (response) {
      setAuthenticated(false)
    }
    event.currentTarget.blur()
  }

  return (
    <div className="fixed top-0 left-0 z-0 flex h-20 w-full select-none items-center px-12">
      <div ref={parent} className="flex flex-1">
        {authenticated && (
          <Link
            to={`/new-account/`}
            className="flex items-center rounded-full bg-valneutral-600 py-2 pl-[11px] pr-3.5 text-sm font-medium text-valneutral-50 outline-none ring-valred-800 transition duration-200 hover:!bg-valred-800 hover:text-valred-100 hover:ring-2 focus-visible:bg-valred-900 focus-visible:text-valred-100 focus-visible:ring-2 active:ring-0"
            onClick={(event) => {
              event.currentTarget.blur()
            }}
          >
            <PlusSmIcon className="mr-0.5 h-4" />
            New Account
          </Link>
        )}
      </div>
      <div className="flex items-center justify-center space-x-1.5">
        <img className="block w-44" src={Logo} alt="Valorant" />
        <h1 className="pt-[6px] font-valorant text-[1.55rem] leading-none text-valbeige">
          Switcher
        </h1>
      </div>
      <div className="flex flex-1 justify-end">
        <button
          className="flex items-center rounded-full bg-valneutral-600 py-2 pl-3.5 pr-[13px] text-sm font-medium text-valneutral-50 outline-none ring-valred-800 transition duration-200 hover:!bg-valred-800 hover:text-valred-100 hover:ring-2 focus-visible:bg-valred-900 focus-visible:text-valred-100 focus-visible:ring-2 active:ring-0"
          onClick={logout}
        >
          Logout <LogoutIcon className="ml-1 h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
