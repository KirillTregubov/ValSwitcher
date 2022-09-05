import React, { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuthentication } from '../lib/Authentication'

export default function Authenticated() {
  const [authenticated, setAuthenticated] = useAuthentication()
  let location = useLocation()
  let navigate = useNavigate()

  useEffect(() => {
    // console.log('checking' + location.pathname + ' ' + state.authenticated)

    if (
      !authenticated &&
      location.pathname !== '/login' &&
      location.pathname !== '/register'
    ) {
      // console.log('no auth in state')

      const authStatus = window.app.emitSync('is-authenticated')
      if (authStatus) {
        setAuthenticated(true)
      } else if (authStatus === false) {
        const canAuthenticate = window.app.emitSync('can-authenticate')
        if (canAuthenticate) {
          console.log('main -> login')
          navigate('/login')
        } else {
          console.log('main -> register')
          navigate('/register')
        }
      } else {
        console.log('Error: not authenticated.')
      }
    }

    // if (location.pathname === '/') {
    //   console.log('main -> home')
    //   navigate('/home')
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, authenticated])

  return (
    <div className="w-full">
      <Outlet />
    </div>
  )
}
