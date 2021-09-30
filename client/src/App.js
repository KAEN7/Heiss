import React, { useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { reviewDatas } from "./redux/modules/review";

import Mainpage from "./page/Mainpage";
import Makepage from "./page/Makepage";
import Mypage from "./page/Mypage";
import Review from "./page/Review";
import Chat from "./Chat";
import Pay from "./page/Pay";

const GlobalStyles = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		border: none;
		outline: none;
		list-style: none;
		text-decoration: none;
	}

	body {
		font-family: "Noto Sans KR", sans-serif !important;
		/* background-color: #343421; */
		background-color: #171717;
		height: 100%;
		width: 100%;
		overflow: hidden;
		-ms-overflow-style: none;
	} 
	input {
		background-color: rgba(0, 0, 0, 0);
		border: 3px solid #f47676;
		color: #f47676;
		padding: 13px;
		&::placeholder {
			color: #f5f5f3;
			font-weight: bold;
			font-size: 18px;
		}
	}
	button {
		background: none;
		cursor: pointer;
	}
`;

const App = () => {
	const user = useSelector((state) => state.user); // 로그인 상태

	let state = useSelector((state) => state);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(reviewDatas());
	}, []);

	const getAccessToken = async (authorizationCode, platform) => {
		const url = process.env.REACT_APP_API_URL + "user/oauth";
		await axios
			.post(
				url,
				{ authorizationCode: authorizationCode, platform: platform },
				{ "Content-Type": "application/json", withCredentials: true }
			)
			.then((response) => console.log(response));
		window.location.assign(process.env.REACT_APP_CLIENT_REDIRECT);
	};

	useEffect(() => {
		const url = new URL(window.location.href);
		const authorizationCode = url.searchParams.get("code"); //oauth redirection후에 code를 받아왔다면 실행
		if (authorizationCode) {
			const platform = url.searchParams.get("state");
			getAccessToken(authorizationCode, platform);
		}
	});

	return (
		<Router>
			<GlobalStyles />
			<Switch>
				<Route exact path="/">
					<Mainpage />
				</Route>
				<Route path="/review">
					<Review />
				</Route>
				<Route path="/make">
					<Makepage />
				</Route>
				<Route path="/mypage">
					{user.isLogin ? <Mypage /> : <Redirect to="/" />}
				</Route>
				<Route path="/chat">
					<Chat />
				</Route>
				<Route path="/pay">
					<Pay />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
