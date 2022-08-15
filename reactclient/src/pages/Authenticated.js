import React, { useEffect, useContext } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { AuthenticationContext } from '../contexts/Authentication'

export default function Authenticated() {
  const [state, setState] = useContext(AuthenticationContext)
  let location = useLocation()
  let navigate = useNavigate()

  useEffect(() => {
    console.log('checking')

    if (!state.isAuthenticated) {
      console.log('no auth in state')

      const authStatus = window.app.emitSync('authenticate')
      if (authStatus) {
        setState({ key: 'authentication', value: true })
      } else if (authStatus === false) {
        const canRegister = window.app.emitSync('authenticate-can-register')
        if (canRegister) {
          console.log('main -> register')
          navigate('/register')
        } else {
          console.log('main -> login')
          navigate('/login')
        }
      } else {
        console.log('Error: not authenticated.')
      }
    }

    if (location.pathname === '/') {
      navigate('/home')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, state.isAuthenticated])

  // useEffect(() => {
  // 	if (loading || !isAuthenticated) {
  // 		console.log('executing');

  // 		const authStatus = window.app.emitSync('authenticate');
  // 		console.log('Main.js Authenticated status:', authStatus);
  // 		if (authStatus) {
  // 			setLoading(false);
  // 			setIsAuthenticated(true);
  // 		} else if (authStatus === false) {
  // 			const canRegister = window.app.emitSync('authenticate-can-register');
  // 			if (canRegister) {
  // 				console.log('main -> register');
  // 				navigateWithDelay('/register', navigate);
  // 			} else {
  // 				console.log('main -> login');
  // 				navigateWithDelay('/login', navigate);
  // 			}
  // 		} else {
  // 			console.log('Error: not authenticated.')
  // 		}
  // 	}
  // }, [loading, isAuthenticated, navigate]);

  return (
    <div className="w-full will-change-transform">
      <Outlet />
    </div>
  )
}
