import React from 'react'

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
  if (agents.includes(name))
    return (
      <img
        className={`w-full ${className}`}
        src={`./images/${name}.png`}
        alt={`Artwork of ${name}`}
        draggable="false"
      />
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
