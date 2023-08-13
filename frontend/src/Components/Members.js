import React from 'react'

export const Members = ({data}) => {
	return (
		<div>
			{(typeof data.members === 'undefined') ? (
				<p>Loading...</p>
			) : (
				data.members.map((member, i) => (
					<p key={i}>{member}</p>
				))
			)}

		</div>
	)
}