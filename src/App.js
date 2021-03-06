import React, { Component } from 'react';

import Header from './components/Header';
import SearchPanel from './components/SearchPanel';
import MainPanel from './components/MainPanel';
import ticketmasterApi from './utils/ticketmaster-api-0.7';

/**
 * Diseño de componentes:
 *
 * 		App
 * 			Header
 * 			SearchPanel
 * 				SelectButton
 * 				SelectButton
 * 				InputButton
 * 		  		GoButton
 *       	MainPanel
 *       		Modal
 *       		EventList
 *       			EventBox
 * 
 */

class App extends Component {

	constructor() {
		super()
		this.state = {
			searchPanel: false,
			results: [],
			page: 0,
			lastQueryCity: '',
			lastQueryWhat: '',
			lastQueryKeyword: '',
			noResultsCounter:0
		}
	}

	easterEgg = (keyword) => {
		let tikiFace = document.getElementById('tikiFace');
		if(keyword.toLowerCase() === 'tiki'){
			tikiFace.classList.add('animateTiki');
		}else{
			tikiFace.classList.remove('animateTiki');
		}
	}

	getQueryParams = (city, what, keyword) => {
		this.easterEgg(keyword);

		if( (this.state.lastQueryCity !== city) || (this.state.lastQueryWhat !== what) || (this.state.lastQueryKeyword !== keyword) ){
			keyword? 
				ticketmasterApi.searchEventsOnASpanishCityAndSegmentNameAndKeyword(city, what, keyword).then(res => this.testResults(res)).catch(error => { throw new Error(error)})
			:
				ticketmasterApi.searchEventsOnASpanishCityAndSegmentName(city, what).then(res => {this.testResults(res)}).catch(error => { throw new Error(error)});

			this.setState ({lastQueryCity: city, lastQueryWhat: what, lastQueryKeyword: keyword});
		} else {
			this.setState(prevState => {
				return {
					noResultsCounter: prevState.noResultsCounter+1
				}
			})
		}
	}

	testResults = (res) => {
		if (typeof(res._embedded) === "undefined") {
			this.setState({searchPanel : false})
			this.setState({results:[], page: 0})
		} 
		else {
			this.setState({searchPanel : true})
			this.setState({results:res._embedded.events, page: 0})
		}
	}

	incrementPage = () => {
		if( (this.state.lastQueryCity !== '') && (this.state.lastQueryWhat !== '') && (this.state.results.length >= 20 ) ){
			this.setState( prevState =>{
				return {
					page: prevState.page+1
				}
			})

			if(this.state.keyword === ''){
				ticketmasterApi.searchEventsOnASpanishCityAndSegmentNameWithPage(this.state.lastQueryCity,this.state.lastQueryWhat, this.state.page).then(res => {this.treatMoreResults(res)}).catch(error => { throw new Error(error)});
			}else{
				ticketmasterApi.searchEventsOnASpanishCityAndSegmentNameAndKeywordWithPage(this.state.lastQueryCity,this.state.lastQueryWhat, this.state.lastQueryKeyword, this.state.page).then(res => {this.treatMoreResults(res)}).catch(error => { throw new Error(error)});
			}
		}
	}
		
	treatMoreResults = (res) => {
		if (typeof(res._embedded) !== "undefined") {
			this.setState( prevState =>{
				return {
					results: [...prevState.results, ...res._embedded.events]
				}
				
			})
		} 

	}

	render() {
		return (
			<div>
				<Header />
				<SearchPanel onSubmit={this.getQueryParams}/>
				<MainPanel searchresults={this.state.results} displayThis={this.state.searchPanel} incrementPage={this.incrementPage} noResultsCounter={this.state.noResultsCounter}/>
			</div>
		);
	}
}

export default App;