import React from 'react';

function Header(props) {
	return (
		<header className="container-fluid">
			<div className="row ">
				<div id="tikiFace" className="d-none d-sm-block col-lg-1 tiki"></div>
				<div className="d-none d-sm-block col-lg-2"></div>
				<div className="col-lg-6 title">
					<h1>Tiki Ticket</h1>
				</div>
				<div className="d-none d-lg-block col-lg-3">
					<h3>The ancient
						<br />event finder
					</h3>
				</div>
			</div>
		</header>
	);
}

export default Header;