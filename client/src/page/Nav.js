import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { Link } from "react-router-dom";

import logo from "../img/heiss.svg";
import Sign from "../modal/Sign";


const NavSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	top: 0;
	height: 4vh;
	/* background: #c3c4ad; */
	background: none;
	padding: 1rem;
	#heissLogo {
		height: 30px;
		margin-left: 10px;
	}
	button {
		color: #f6f7df;
		font-size: 1rem;
	}

	.navBarState {
		color: black;
	}
`;

const signModal = {
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(255, 255, 255, 0.45)",
		zIndex: 2,
	},
	content: {
		position: "absolute",
		top: "80px",
		left: "3rem",
		right: "3rem",
		bottom: "3rem",
		border: "1px solid #0f0d00",
		background: "#0f0d00",
		overflow: "auto",
		WebkitOverflowScrolling: "touch",
		borderRadius: "4px",
		outline: "none",
		padding: "0.1rem",
		zIndex: 2,
	},
};

const Nav = () => {
	const [boo, setBoo] = useState(false);

	const reverseBoo = () => {
		setBoo(!boo);
	};

	return (
		<NavSection>
			<Modal
				isOpen={boo}
				style={signModal}
				onRequestClose={() => reverseBoo()}
				ariaHideApp={false}
			>
				<Sign reverseBoo={reverseBoo} />
			</Modal>
			<Link to="/">
				<img id="heissLogo" src={logo} alt="heiss" />
			</Link>
			<button onClick={reverseBoo}>LOGIN</button>
		</NavSection>
	);
};

export default Nav;