import { useAutoAnimate } from '@formkit/auto-animate/react'
import { LogoutIcon, PlusSmIcon } from '@heroicons/react/outline'

import { useAuthentication } from '../lib/Authentication'
import Button from './Button'
import Logo from '../assets/images/ValorantLogo.svg'

const NavbarButton = ({ authenticated, ...props }) => {
  const [parent] = useAutoAnimate({ duration: 300 })

  return <div ref={parent}>{authenticated && <Button {...props} />}</div>
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
          authenticated={authenticated}
          isLink
          to={`/new-account/`}
          iconLeft
          onClick={(event) => {
            event.currentTarget.blur()
          }}
        >
          <PlusSmIcon className="mr-1 h-4" />
          <span>New Account</span>
        </NavbarButton>
      </div>
      <div className="flex items-center justify-center space-x-1.5">
        <img className="block w-44" src={Logo} alt="Valorant" />
        <h1 className="pt-[6px] font-valorant text-[1.55rem] leading-none text-valbeige">
          Switcher
        </h1>
      </div>
      <div className="flex flex-1 justify-end">
        <NavbarButton authenticated={authenticated} iconRight onClick={logout}>
          <span>Logout</span>
          <LogoutIcon className="ml-1.5 h-4 w-4" />
        </NavbarButton>
      </div>
    </div>
  )
}

export default Navbar
