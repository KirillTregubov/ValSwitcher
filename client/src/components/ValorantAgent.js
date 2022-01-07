import React, { useState } from 'react';
import ReactPlaceholder from "react-placeholder";

// Currently supported agents:
const agents = ['Astra', 'Breach', 'Brimstone', 'Chamber', 'Cypher', 'Jett', 'KAYO', 'Killjoy', 'Omen', 'Phoenix', 'Raze', 'Reyna', 'Sage', 'Skye', 'Sova', 'Viper', 'Yoru'];

function getImage(name, className, onLoad) {
	if (agents.includes(name))
		return <img className={`w-full ${className}`} src={`./images/${name}.png`} alt="Valorant agent" draggable="false" onLoad={onLoad} />
	else
		return <img className="w-36 brightness-0" src={`./images/Jett.png`} alt="Valorant agent" draggable="false" onLoad={onLoad} />
}

export default function ValorantAgent({ name, className }) {
	// const [loading, setLoading] = useState(true);

	// function handleImageLoad() {
	// 	console.log('stopped loading')
	// 	setLoading(false);
	// }

	// const image = <img src="http://someImage.png" alt="cool image" onLoad={handleImageLoaded} />;

	return getImage(name, className, null);
	// return <div>
	// 	<ReactPlaceholder type="rect" ready={!loading} className="animate-pulse rounded-md ml-4 !mr-0" >
	// 		<div className="imageHolder" >
	// 			{image}
	// 		</div>
	// 	</ReactPlaceholder>
	// 	{ !loading && image }
	// </div>
}
