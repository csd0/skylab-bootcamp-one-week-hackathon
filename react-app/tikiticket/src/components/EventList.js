import React from 'react';

import EventBox from './EventBox';

function EventList(props){
	return (
		<div className="col-sm-6 col-md-4">
			<ul className="list-group">
				<EventBox />
				<EventBox />
			</ul>
		</div>
	);
}

export default EventList;