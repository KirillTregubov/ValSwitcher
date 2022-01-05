import React from 'react';

// Currently supported agents:
const agents = ['Astra', 'Breach', 'Brimstone', 'Chamber', 'Cypher', 'Jett', 'KAYO', 'Killjoy', 'Omen', 'Phoenix', 'Raze', 'Reyna', 'Sage', 'Skye', 'Sova', 'Viper', 'Yoru'];

export default function ValorantAgent({ name, className }) {
	if (agents.includes(name))
		return <img className={`w-full ${className}`} src={`./images/${name}.png`} alt="Valorant agent" draggable="false" />
	else
		<img className="w-36 brightness-0" src={`./images/Jett.png`} alt="Valorant agent" draggable="false" />
}
