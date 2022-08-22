import { Link } from 'react-router-dom'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { LogoutIcon, PlusSmIcon } from '@heroicons/react/outline'

import { useAuthentication } from '../lib/Authentication'
import Logo from '../assets/images/ValorantLogo.svg'

const NavbarButton = ({ isLink, authenticated, children, ...props }) => {
  const className =
    'flex items-center rounded-full bg-valneutral-600 py-2 pl-[11px] pr-3.5 text-sm font-medium text-valneutral-50 outline-none ring-valred-800 transition duration-200 will-change-transform hover:!bg-valred-800 hover:text-valred-100 hover:ring-2 hover:ring-valred focus-visible:bg-valred-900 focus-visible:text-valred-100 focus-visible:ring-2 active:scale-95 active:!bg-valred-900 active:ring-valred-800'

  const [parent] = useAutoAnimate({ duration: 300 })

  return (
    <div ref={parent}>
      {authenticated &&
        (isLink ? (
          <Link className={className} {...props}>
            {children}
          </Link>
        ) : (
          <button className={className} {...props}>
            {children}
          </button>
        ))}
    </div>
  )
}

const Navbar = () => {
  const [authenticated, setAuthenticated] = useAuthentication()

  const logout = (event) => {
    const response = window.app.emitSync('logout')
    if (response) {
      setAuthenticated(false)
    }
    event.currentTarget.blur()
  }

  return (
    <div className="fixed top-0 left-0 z-0 flex h-20 w-full select-none items-center px-12">
      <div className="flex flex-1">
        <NavbarButton
          isLink
          to={`/new-account/`}
          onClick={(event) => {
            event.currentTarget.blur()
          }}
          authenticated={authenticated}
        >
          <PlusSmIcon className="mr-0.5 h-4" />
          New Account
        </NavbarButton>
      </div>
      <div className="flex items-center justify-center space-x-1.5">
        <img className="block w-44" src={Logo} alt="Valorant" />
        <h1 className="pt-[6px] font-valorant text-[1.55rem] leading-none text-valbeige">
          Switcher
        </h1>
      </div>
      <div className="flex flex-1 justify-end">
        <NavbarButton onClick={logout} authenticated={authenticated}>
          Logout <LogoutIcon className="ml-1 h-4 w-4" />
        </NavbarButton>
      </div>
    </div>
  )
}

export default Navbar
