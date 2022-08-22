import React, { useEffect, useState } from 'react'
import MyTransition from './MyTransitions'

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

export default function ValorantAgent({ name, className }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    return () => {
      setLoaded(false)
    }
  }, [])

  if (agents.includes(name))
    return (
      <MyTransition in={loaded} timeout={0.3}>
        <img
          className={`w-full ${className}`}
          src={`./images/${name}.png`}
          alt={`Artwork of ${name}`}
          onLoad={() => setLoaded(true)}
        />
        <button
          onClick={() => {
            setLoaded(false)
            console.log('to')
          }}
        >
          Press
        </button>
      </MyTransition>
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
}
