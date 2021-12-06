import React from "react";
import Filter from "../Filter/Filter";
import Classifieds from "../Classifieds/Classifieds";

export default function Home() {
	return (
		<div className="home_page">
			<div className="container">
				<Filter />
				<Classifieds />
			</div>
		</div>
	);
}
