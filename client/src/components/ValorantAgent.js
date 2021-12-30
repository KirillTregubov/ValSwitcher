import React, { useEffect, useState } from 'react';

// Currently supported agents:
const agents = ['Astra', 'Breach', 'Brimstone', 'Chamber', 'Cypher', 'Jett', 'KAYO', 'Killjoy', 'Omen', 'Phoenix', 'Raze', 'Reyna', 'Sage', 'Skye', 'Sova', 'Viper', 'Yoru'];

export default function ValorantAgent({ name }) {
	return <div>
		{agents.includes(name) ? <img className="w-36" src={`./images/${name}.png`} alt="Valorant agent" /> : <img className="w-36 brightness-0" src={`./images/Jett.png`} alt="Valorant agent" />}
	</div>
};
