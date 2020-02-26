import React from 'react';

export default function ErrorMessage(err) {
	return (
		<div
			style={{
				padding: '16% 30%',
				color: '#f47b13',
				textAlign: 'center'
				//backgroundImage: "url(" + "/images/Errorimg.jpg" + ")"
			}}
		>
			<h1>Something went wrong.</h1>
			<h2>Error:{err}</h2>
		</div>
	);
}