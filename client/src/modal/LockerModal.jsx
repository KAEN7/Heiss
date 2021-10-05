import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { LeftCircleFilled } from "@ant-design/icons";
import { RightCircleFilled } from "@ant-design/icons";
import { lockerDatas } from "../redux/modules/review";
import Modal from "react-modal";
import { StarTwoTone } from "@ant-design/icons";
axios.defaults.withCredentials = true;

const LockerModalSection = styled.div`
	/* background-color: #ccc; */
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}

	@media ${(props) => props.theme.tablet} {
		flex-direction: column;
	}

	.picDiv {
		width: 50%;
		white-space: nowrap;
		overflow: hidden;
		position: relative;

		@media ${(props) => props.theme.tablet} {
			height: 50%;
			width: 100%;
		}
		.reviewImg {
			transition: transform 0.5s;
		}
		.carousel {
			position: absolute;
			top: 50%;
			transform: translate(0%, -50%);
			/* color: rgba(255, 255, 255, 0.8); */
			color: red;
			font-size: 2rem;
			cursor: pointer;
		}
		.right {
			right: 3%;
		}
		.left {
			left: 3%;
		}
		.hide {
			display: none;
		}
		img {
			width: 100%;
			height: 100%;
		}
	}

	@media ${(props) => props.theme.tablet} {
		align-items: center;

		img {
			width: 60%;
			height: 70%;
		}
	}

	@media ${(props) => props.theme.mobileL} {
		flex-direction: column;
		justify-content: center;
		align-items: center;

		img {
			width: 100%;
			margin-bottom: 1rem;
		}
	}
`;

const LockerModalWrite = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 50%;
	margin-left: 1rem;
	color: #ffffe7;

	@media ${(props) => props.theme.tablet} {
		height: 20%;
		width: 100%;
	}

	@media ${(props) => props.theme.tablet} {
		height: 20%;
		width: 100%;
	}

	.userDiv {
		display: flex;
		width: 100%;
		border-bottom: 1px solid #ffffe7;
		padding-bottom: 1.5rem;
		.imgDiv {
			width: 4rem;
			height: 4rem;
			border-radius: 50%;
			overflow: hidden;
			margin: 0rem 1rem;
			.profileImg {
				width: 100%;
				height: 100%;
			}
		}
	}
	.score {
		font-size: 1.7rem;
		font-weight: bold;
		margin-left: 0.5rem;
		color: yellow;
	}

	.name {
		font-size: 1.4rem;
		margin: 0.2rem 0rem 0rem 0.2rem;
	}

	.createdAt {
		position: relative;
		margin-left: 1rem;
		font-size: 1.2rem;
	}
	.createdAt:before {
		position: absolute;
		top: 2px;
		left: -7px;
		display: inline-block;
		content: "";
		width: 1px;
		height: 16px;
		background: #ffffe7;
	}

	.title {
		font-size: 2.2rem;
		font-weight: bold;
		margin-left: 1.5rem;
		text-align: center;
		color: #ffffe7;

		@media ${(props) => props.theme.tablet} {
			font-size: 1.4rem;
		}
	}
	.desc {
		height: 24rem;
		font-size: 1.3em;
		margin-left: 1.5rem;
		white-space: pre-wrap;
	}
	.phone {
		position: absolute;
		left: 3%;
		top: 16%;
		color: #a4a4a4;
		font-weight: bold;
	}
`;

const BtnBox = styled.div`
	display: flex;
	justify-content: center;

	@media ${(props) => props.theme.tablet} {
		margin-top: 15rem;
		align-items: center;
	}

	@media ${(props) => props.theme.mobileL} {
		margin-top: 10rem;
	}

	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #f47676;
		background: none;
		border: 3px solid #f47676;
		font-size: 1.5rem;
		width: 11rem;
		height: 3rem;
		margin: 0rem 1rem;
		margin-bottom: 1rem;
		border-radius: 2vh;

		transition: all 0.3s;
		position: relative;
		&:hover {
			background: #f47676;
			color: #ffffe7;
		}
		&:before {
			transition: all 0.3s;
		}

		@media ${(props) => props.theme.mobileL} {
			width: 8rem;
			height: 2.5rem;
			font-size: 1rem;
		}
	}

	.putBtn {
		border: 3px solid #ffffe7;
		color: #ffffe7;
		&:hover {
			background: #ffffe7;
			color: #f47676;
		}
	}
`;

const NullBox = styled.div`
	height: 5rem;
`;

const lockerModal = {
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(255, 255, 255, 0.45)",
		zIndex: 4,
	},
	content: {
		display: "flex",
		justifyContent: "center",
		background: "#0f0d00",
		margin: "0 auto",
		overflow: "auto",
		top: "10vh",
		left: "10vw",
		right: "10vw",
		bottom: "10vh",
		WebkitOverflowScrolling: "touch",
		borderRadius: "4px",
		outline: "none",
		padding: "0.1rem",
		zIndex: 4,
	},
};

const LockerModal = ({ data, modalHandler, getMycase }) => {
	const user = useSelector((state) => state.user);
	const locker = useSelector((state) => state.locker);
	const dispatch = useDispatch();
	const [modal, setModal] = useState();
	// const [color, setColor] = useState([]);
	// const [imgNumber, setImgNumber] = useState(1);
	// const [imglength, setImgLength] = useState(1);

	// useEffect(() => {
	// 	axios.get(`${process.env.REACT_APP_API_URL}locker`).then((el) => {
	// 		setData(el.data.data);
	// 		setColor(colorChange(el.data.data.score - 1));
	// 		setImgLength(el.data.data.sources.length);
	// 	});
	// }, []);

	// const colorChange = (index) => {
	// 	let arr = ["white", "white", "white", "white", "white"];
	// 	for (let i = 0; i <= index; i++) {
	// 		arr[i] = "yellow";
	// 	}
	// 	return arr;
	// };

	// const leftImg = (imgNumber) => {
	// 	if (imgNumber > 1) {
	// 		setImgNumber(imgNumber - 1);
	// 		const imgs = document.querySelectorAll(".reviewImg");
	// 		imgs.forEach((img) => {
	// 			img.style.transform = `translate(-${imgNumber - 2}00%)`;
	// 		});
	// 	}
	// };

	// const rightImg = (imgNumber) => {
	// 	if (imgNumber < imglength) {
	// 		setImgNumber(imgNumber + 1);
	// 		const imgs = document.querySelectorAll(".reviewImg");
	// 		imgs.forEach((img) => {
	// 			img.style.transform = `translate(-${imgNumber}00%)`;
	// 		});
	// 	}
	// };

	if (!data) {
		return null;
	}

	return (
		<LockerModalSection>
			<Modal
				isOpen={data}
				style={lockerModal}
				onRequestClose={() => {
					modalHandler();
				}}
				ariaHideApp={false}
			/>
			{/* <div className="picDiv">
				{data.sources.map((el, index) => {
					return (
						<img className="reviewImg" key={index} src={el.imgUrl} alt="img" />
					);
				})}
				<LeftCircleFilled
					onClick={() => leftImg(imgNumber)}
					className={`carousel left ${imglength === 1 ? "hide" : ""}`}
				/>
				<RightCircleFilled
					onClick={() => rightImg(imgNumber)}
					className={`carousel right ${imglength === 1 ? "hide" : ""}`}
				/>
			</div>
			<div className="userDiv">
				<div className="imgDiv">
					<img className="profileImg" src={data.user.profileImg} />
				</div>
				<div className="etc">
					<div className="lockerScore">
						{color.map((el, index) => (
							<StarTwoTone
								key={index}
								twoToneColor={el}
								style={{ fontSize: "30px", padding: "0rem 0.2rem" }}
							/>
						))}
						<span className="score">{data.score}</span>
					</div>
					<div className="name">
						{data.user.username}
						<span className="createdAt">
							{data.createdAt.slice(2, 10).replaceAll("-", ".")}
						</span>
					</div>
				</div>
			</div>
			<div className="phone">기종: {data.customCase.phone.type}</div>
			<div className="title">{data.title}</div>
			<div className="desc">{data.desc}</div> */}
		</LockerModalSection>
	);
};

export default LockerModal;