import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { onDes } from "../redux/modules/review";

import { ThumbnailSections, HoverThumbs, BgnHovers } from "./utils/theme";

// 이미지
import cartIcon from "../img/cart.svg";
import deleteIcon from "../img/delete.svg";
import axios from "axios";

const LockerAllBox = styled.div`
	display: flex;
	flex-direction: column;
`;

const ThumbnailSection = styled.div`
	${ThumbnailSections}
`;

const HoverThumb = styled.div`
	${HoverThumbs}

	.delete {
		height: 3rem;
		margin-left: 5.1rem;
		z-index: 1;
		&:hover {
			transform: scale(1.06);
		}
	}

	.cart {
		height: 2rem;
		margin-left: 4.9rem;
		z-index: 1;
		&:hover {
			transform: scale(1.06);
		}
	}
`;

const BgnHover = styled.div`
	${BgnHovers}
`;

const Locker = ({ data }) => {
	const history = useHistory();
	const dispatch = useDispatch();	

	// locker 삭제 핸들러
	const onDelHandler = () => {
		axios
			.delete(`${process.env.REACT_APP_API_URL}locker/${data.id}`)
			.then(() => alert("삭제되었습니다!"));
	};

	// 장바구니 추가 핸들러
	const onShopHandler = () => {
		axios.delete(`${process.env.REACT_APP_API_URL}cart`, data.id);
	};

	// 역직렬화 핸들러
	const onDeserialization = () => {
    axios.get(`${process.env.REACT_APP_API_URL}case/${data.id}`).then(() => {
      console.log(data)
      dispatch(onDes(data.setting, data.id));
			// canvas.loadFromJSON(serial);

		});

		// history.push("/make");
	};

	return (
		<LockerAllBox>
			<ThumbnailSection>
				<img src={data.img} alt="img" />
				<HoverThumb className="hover-thumb">
					<BgnHover onClick={onDeserialization}></BgnHover>
					<img
						src={deleteIcon}
						alt="deleteIcon"
						className="delete"
						onClick={onDelHandler}
					/>
					<img
						src={cartIcon}
						alt="cartIcon"
						className="cart"
						onClick={onShopHandler}
					/>
				</HoverThumb>
			</ThumbnailSection>
		</LockerAllBox>
	);
};

export default Locker;