import { useState, useContext } from "react";
import styled from "styled-components";
import { WishListContext } from "./WishListContext"; // Make sure the path is correct

const HeartButtonStyled = styled.button`
  background: none;
  border: 2px solid ${({ $isLiked }) => ($isLiked ? "red" : "black")};
  color: ${({ $isLiked }) => ($isLiked ? "red" : "black")};
  padding: 5px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: absolute; /* Absolute position */
  top: 7px; /* Adjust this value to position it vertically */
  right: 7px; /* Adjust this value to position it horizontally */
  z-index: 2;
  svg {
    width: 20px;
    height: 20px;
    fill: ${({ $isLiked }) => ($isLiked ? "red" : "none")};
  }
`;

export default function HeartButton({ productId }) {
  const { wishListProducts, addProductToWishList, removeProductFromWishList } = useContext(WishListContext);
  const isLiked = wishListProducts.includes(productId);

  const toggleLike = () => {
    if (isLiked) {
      removeProductFromWishList(productId);
    } else {
      addProductToWishList(productId);
    }
  };

  return (
    <HeartButtonStyled onClick={toggleLike} $isLiked={isLiked}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    </HeartButtonStyled>
  );
}
