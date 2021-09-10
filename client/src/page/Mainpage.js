import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import video from "../video/mainpage.mp4";
import logo from "../img/heiss.svg";

const MainpageSection = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const MainpageBoxFirst = styled.ul`
	li {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
		background: #343421;
		&:nth-child(1) {
			display: flex;
			justify-content: center;
			align-items: center;
			background: none;
		}
		&:nth-child(2n) {
			background: #ffffe7;
		}
		h1,
		h2,
		h3 {
			margin: 13px;
		}

		.subTitle {
			margin: 15px;
			letter-spacing: 3px;
			line-height: 27px;
		}

		@media ${(props) => props.theme.mobileL} {
			flex-direction: column;

			&:last-child {
				flex-direction: column-reverse;
			}
		}
	}

	.mainLogo {
		height: 20rem;

		@media ${(props) => props.theme.mobileL} {
			height: 6rem;
		}
	}

	video {
		position: fixed;
		min-width: 100vw;
		min-height: 100vh;
		top: 0;
		left: 0;
		width: auto;
		height: auto;
		z-index: -1;
	}

	.columnSection {
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.startBtn {
		display: flex;
		justify-content: center;
		color: #f47676;
		background: none;
		border: 3px solid #f47676;
		width: 14rem;

		transition: all 0.3s;
		position: relative;
		&:hover {
			background: #ffffe7;
		}
		&:before {
			transition: all 0.3s;
		}

		@media ${(props) => props.theme.mobileL} {
			margin-top: 2rem;
		}
	}

	iframe {
		margin: 3rem;
	}

	.animationText {
		display: flex;
	}

	.slide__box {
		position: relative;
		padding: 0;
		margin: 0;
		overflow: hidden; /* 슬라이더가 하나씩만 보이도록 나머지는 숨겨줌 */
		width: 13rem;
		height: 60px;
		&:hover {
			color: #f47676;
		}
	}

	.slide__text {
		width: 100%;
		text-align: center;
		font-size: 40px;
		line-height: 52px;
	}

	/* 첫번째부터 시작되도록함 이걸 안하면 슬라이더들이 제각각 움직임 */
	.slide__text:first-child {
		animation: slide 12s infinite;
	}

	/* 진행률마다 적용되는 CSS 값을 넣어줌 */
	@keyframes slide {
		0% {
			margin-top: 0;
		}
		16% {
			margin-top: -60px;
		}
		33% {
			margin-top: -120px;
		}
		50% {
			margin-top: -180px;
		}
		66% {
			margin-top: -120px;
		}
		82% {
			margin-top: -60px;
		}
		100% {
			margin-top: 0;
		}
	}
`;

const Mainpage = () => {
	const [navBarState, setNavBarState] = useState("hidden");
	useEffect(() => {
		window.addEventListener("scroll", getCurrentScroll);
		return () => window.removeEventListener("scroll", getCurrentScroll);
	});

	const getCurrentScroll = () => {
		if ((window.scrollY / document.body.clientHeight) * 100 < 33) {
			setNavBarState("hidden");
		} else if ((window.scrollY / document.body.clientHeight) * 100 > 33) {
			setNavBarState("");
		}
	};

	console.log(window.scrollY);
	return (
		<MainpageSection>
			<Nav />
			<MainpageBoxFirst>
				<li className="columnSection">
					<video autoPlay muted loop>
						<source src={video} type="video/mp4"></source>
					</video>
					<img className="mainLogo" src={logo} alt="logo" />
					<Link to="/make" className="startBtn">
						<h1>시작하기</h1>
					</Link>
				</li>
				<li>
					<div className="columnSection">
						<h1>
							내가 마음에 드는 케이스를 친구가 사용해서 구매하지 못한적이
							있으셨나요?
						</h1>
						<div className="subTitle">
							나만의 개성, 특별함이 좋아서 시중에 판매하지 않는다 생각하고
							구매했다가 길거리에서 같은 케이스를 보면 기분이 안 좋은적이
							있으셨나요? <br />
							이쁘고 개성있는 케이스들이 많다고 생각하시나요? <br />
						</div>
					</div>
					<iframe
						src="https://giphy.com/embed/Zd5EQ6iemgnwkgaAhm"
						width="480"
						height="270"
						frameBorder="0"
						class="giphy-embed"
						allowFullScreen
					></iframe>
				</li>
				<li>
					<iframe
						src="https://giphy.com/embed/3o6gEfdyoCJixUpHA4"
						width="480"
						height="480"
						frameBorder="0"
						class="giphy-embed"
						allowFullScreen
					></iframe>
					<div className="columnSection">
						<div className="animationText">
							<h2>저희 Heiss는 </h2>
							<div class="slide__box">
								<h2 class="slide__text">쉽게</h2>
								<h2 class="slide__text">재밌게</h2>
								<h2 class="slide__text">간편하게</h2>
								<h2 class="slide__text">아름답게</h2>
							</div>
							<h2>당신의 케이스를 만들어드립니다</h2>
						</div>
						<div className="subTitle">
							여러분이 생각한 멋진 케이스중에서도 더 개성있는 케이스를 만들 수
							있습니다. <br />
							반려동물사진, 커플사진, 이모지, 텍스트, 색상부터 도형까지 내
							핸드폰 케이스안에서 작은 디자이너가 되어보세요! <br />
							하나뿐인 나만의 케이스 Heiss에서는 다 가능합니다!
						</div>
					</div>
				</li>
				<li className="columnSection">
					<h2>이렇게 많은 사용자분들이 리뷰를 남겨주셨습니다!</h2>
					<iframe
						src="https://giphy.com/embed/fdiWBMyTEAhjy"
						width="480"
						height="199"
						frameBorder="0"
						class="giphy-embed"
						allowFullScreen
					></iframe>
				</li>
				<li>
					<Link to="/make" className="startBtn">
						<h1>시작하기</h1>
					</Link>
					<iframe
						src="https://giphy.com/embed/MCFswP59sGKkkcTjX5"
						width="480"
						height="360"
						frameBorder="0"
						class="giphy-embed"
						allowFullScreen
					></iframe>
				</li>
			</MainpageBoxFirst>
		</MainpageSection>
	);
};

export default Mainpage;