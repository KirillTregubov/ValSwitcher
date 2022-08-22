import React, { useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { AuthenticationProvider } from './lib/Authentication'
import AuthLogin from './pages/AuthLogin'
import AuthRegister from './pages/AuthRegister'
import Authenticated from './pages/Authenticated'
import Home from './pages/Home'
import Account from './pages/Account'
import NewAccount from './pages/NewAccount'
import Navbar from './components/Navbar'

export default function App() {
  const nodeRef = useRef(null)
  const location = useLocation()

  return (
    <div className="h-screen text-white antialiased">
      <AuthenticationProvider>
        <Navbar />
        <div className="flex h-full flex-col items-center justify-center overflow-hidden pt-20 pb-10">
          <SwitchTransition>
            <CSSTransition
              nodeRef={nodeRef}
              key={location.pathname}
              classNames="page"
              timeout={300}
            >
              <div className="w-full" ref={nodeRef}>
                <Routes location={location}>
                  <Route path="register" element={<AuthRegister />} />
                  <Route path="login" element={<AuthLogin />} />
                  <Route path="/" element={<Authenticated />}>
                    <Route path="home" element={<Home />} />
                    <Route path="account/:id" element={<Account />} />
                    <Route path="new-account" element={<NewAccount />} />
                  </Route>
                </Routes>
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
        <div className="fixed bottom-0 left-0 flex h-10 w-full items-center justify-center text-xs text-zinc-500">
          <p>
            Riot Games, VALORANT, and any associated logos are trademarks,
            service marks, and/or registered trademarks of Riot Games, Inc.
          </p>
        </div>
      </AuthenticationProvider>
    </div>
  )
}
