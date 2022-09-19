import React, { useLayoutEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

// Currently supported agents:
const agents = [
  'Astra',
  'Breach',
  'Brimstone',
  'Chamber',
  'Cypher',
  'Fade',
  'Jett',
  'KAYO',
  'Killjoy',
  'Neon',
  'Omen',
  'Phoenix',
  'Raze',
  'Reyna',
  'Sage',
  'Skye',
  'Sova',
  'Viper',
  'Yoru'
]

const ValorantAgent = React.memo(({ name, className }) => {
  const [loaded, setLoaded] = useState(false)
  const nodeRef = useRef(null)

  useLayoutEffect(() => {
    return () => {
      setLoaded(false)
    }
  }, [])

  if (agents.includes(name))
    return (
      <CSSTransition
        appear={true}
        in={loaded}
        classNames="fade"
        timeout={300}
        nodeRef={nodeRef}
      >
        <div ref={nodeRef}>
          <img
            className={`w-full select-none ${className}`}
            src={`./images/${name}.png`}
            alt={`Artwork of ${name}`}
            onLoad={() => setLoaded(true)}
          />
          {/* <button
            onClick={() => {
              setLoaded(!loaded)
            }}
          >
            Press
          </button> */}
        </div>
      </CSSTransition>
    )
  else
    return (
      <img
        className={`w-full brightness-0 ${className}`}
        src={`./images/Jett.png`}
        alt="Artwork of Jett"
        draggable="false"
      />
    )
})

export default ValorantAgent
