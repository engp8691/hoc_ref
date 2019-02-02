import React from 'react';

const preload = {
	"data": [
		{
			"id": "100000",
			"name": "Ojo",
			"zone": "Lagos State",
			"region": "South West"
		},
		{
			"id": "200000",
			"name": "Ahiazu Mbaise",
			"zone": "Imo State",
			"region": "South East"
		},
		{
			"id": "300000",
			"name": "Akoko-Edo",
			"zone": "Edo State",
			"region": "South South"
		},
		{
			"id": "400000",
			"name": "Anka",
			"zone": "Zamfara State",
			"region": "North West"
		},
		{
			"id": "500000",
			"name": "Akwanga",
			"zone": "Nasarawa State",
			"region": "North Central"
		}
	]
}

const withSearch = (WrappedComponent) => {
	return class extends React.Component {
		state = { searchTerm: '' }
		handleSearch = event => {
			this.setState({ searchTerm: event.target.value })
		}

		render() {
			return (
				<div>
					<div>
						<input onChange={this.handleSearch} value={this.state.searchTerm} type="text" placeholder="Search" />
					</div>
					<WrappedComponent searchTerm={this.state.searchTerm} />
				</div>
			)
		}
	}
}

const Location = (props) => {
	const { searchTerm } = props;

	return (
		<div>
			<div>
				<div>
					<h2>Preferred Locations</h2>
				</div>
			</div>
			<div>
				{preload.data
					.filter(location => `${location.name} ${location.zone} ${location.region}`.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0)
					.map(location => <LocationCard key={location.id} {...location} />)}
			</div>
		</div>
	)
}

const LocationCard = (props) => {
	return (
		<div>
			<hr />
			<p><b>Name:</b> {props.name}</p>
			<p><b>Zone:</b> {props.zone}</p>
			<p><b>Region:</b> {props.region}</p>
			<hr />
		</div>
	)
}

// export default const LocationSearch = withSearch(Location);
// export const LocationSearch = withSearch(Location);
const LocationSearch = withSearch(Location);

export default LocationSearch;

