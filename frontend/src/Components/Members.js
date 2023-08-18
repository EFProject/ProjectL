import React from 'react'

export const Members = ({data}) => {
	console.log(data)
	return (
		<div>
			{(typeof data.events === 'undefined') ? (
				<p>Loading...</p>
			) : (
				data.events.map((event, i) => (
					<p key={i}>{event.description}</p>
				))
			)}

		</div>
	)
}