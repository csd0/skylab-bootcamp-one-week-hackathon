import React from 'react';

import Modal from './Modal';
import ColumnsPanel from './ColumnsPanel';
import EventList from './EventList';

class MainPanel extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			eventIdentifierForModal: '',
			contentForColumn_One: ['colimgpromo1', 'colimgpromo1-back', 'Select your city and press GO button to obtain lots of events around you! If you are interested in live music shows, select music on What list!'],
			contentForColumn_Two: ['colimgpromo2', 'colimgpromo2-back', 'If you like sports, prove you are a true fan and go to the stadium!'],
			contentForColumn_Three: ['colimgpromo3', 'colimgpromo3-back', 'To be, or not to be? This is the Tiki question. Sounds familiar? oh boy… You should go to the theater more often!'],
			dataForEventList: [],
			noResults: false,
			noResultsCounter:0
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.searchresults.length > 0) {
			this.setState({ dataForEventList: nextProps.searchresults })
		}
		else {this.setState( {noResults: true,noResultsCounter: this.state.noResultsCounter+0.5})}
	}

	handlerOnClickEvent = (eventIdentifier) => {
		/* Esta función envía al modal el id del evento del cual debe mostrar detalles */
		this.setState({ eventIdentifierForModal: eventIdentifier })
	}

	render() {
		if (this.props.displayThis) {
			return (
				<section className="container-fluid home">
					<div className="">
						<Modal eventIdentifier={this.state.eventIdentifierForModal} />
						<EventList onClickEvent={this.handlerOnClickEvent} eventMap={this.state.dataForEventList} />
					</div>
				</section>
			);
		} else if (this.state.noResults) {
			if (this.state.noResultsCounter%2) {
				return <div className="no-results mt-5"><p className="pb-3">The Tiki found nothing</p></div>
			} else {
				return <div className="no-results mt-5"><p className="pb-3 text-warning">The Tiki found nothing</p></div>
			}
		} else {
			return (
				<section className="container-fluid home">
					<div className="row">
						<ColumnsPanel dataForComponent={this.state.contentForColumn_One} />
						<ColumnsPanel dataForComponent={this.state.contentForColumn_Two} />
						<ColumnsPanel dataForComponent={this.state.contentForColumn_Three} />
						<Modal eventIdentifier={this.state.eventIdentifierForModal} />
					</div>
				</section>
			);
		}
	}
}

export default MainPanel;