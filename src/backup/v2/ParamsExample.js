import React from "react";
import { HashRouter as Router, Link, Route } from "react-router-dom";
import queryString from "query-string";

const addresses = ["江西省", "临江府", "大有乡", "庙背李家"];
const titles = ["所在省份", "所在县市", "所在乡镇", "所在村组"];

function ParamsExample() {
	return (
		<Router basename={'/reactjs'}>
			<div>
				<h2>参数传递实例，您想查询</h2>
				<ul>
					<li> <Link to={{ pathname: "/homeaddress", search: "?order=1" }}> 所在省份 </Link> </li>
					<li> <Link to={{ pathname: "/homeaddress", search: "?order=2" }}> 所在县市 </Link> </li>
					<li> <Link to={{ pathname: "/homeaddress", search: "?order=3" }}> 所在乡镇 </Link> </li>
					<li> <Link to={{ pathname: "/homeaddress", search: "?order=4" }}> 所在村组 </Link> </li>
				</ul>

				<Route path="/homeaddress" render={(props) =>{console.log(props); return (<Child {...props}/>)}} />
			</div>
		</Router>
	);
}

function Child({ location }) {
	let name = "";
	let address = "";

	if(location){
		let params = queryString.parse(location.search);
		console.log(params);
		name = params.name;
		let order = +params.order-1;
		address = addresses[order];
		name = titles[order];;
	}

	return (
		<div>
			{name ? ( <h3> 阁下府上{name}为{address} </h3>) : ( <h3>阁下住址不明</h3>)}
		</div>
	);
}

export default ParamsExample;

