import React, { lazy, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
const Header = lazy(() => import("./Components/Header/Header"));
const Menu = lazy(() => import("./Components/Menu/Menu"));
const Login = lazy(() => import("./Components/Login/Login"));
const Create = lazy(() => import("./Components/Create/Create"));
const Account = lazy(() => import("./Components/Account/Account"));
const Home = lazy(() => import("./Components/Home/Home"));
const Settings = lazy(() => import("./Components/Settings/Settings"));
const NewClassified = lazy(() =>
	import("./Components/NewClassified/NewClassified")
);

function App() {
	useEffect(() => {
		if (window.location.pathname === "/") {
			window.location.pathname = "home";
		}
	}, []);

	return (
		<React.Suspense fallback={<>loading...</>}>
			<Header />
			<Switch>
				<Route path="/home" component={Home} exact />
				<Route path="/account" exact>
					<Account />
					<Menu />
				</Route>

				<Route path="/account/settings" exact>
					<Settings />
				</Route>

				<Route path="/login" exact>
					<Login />
				</Route>

				<Route path="/create" exact>
					<Create />
				</Route>

				<Route path="/new" exact>
					<NewClassified />
					<Menu />
				</Route>
			</Switch>
		</React.Suspense>
	);
}

export default App;
