import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import HeartButton from "./HeartButton";
import { WishListContext } from "./WishListContext";

const WhiteBox = styled.div`
  background-color: #fff;
  padding: 20px;
  height: 160px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  img {
    max-width: 100%;
    max-height: 100px;
  }
`;

const Title = styled(Link)`
    font-weight: normal;
    font-size: 1rem;
    color: inherit;
    text-decoration: none;
    margin: 0;
`;

const ProductWrapper = styled.div`
    position: relative;
    z-index: 1;
`;

const ProductInfoBox = styled.div`
    margin-top: 2px;
`;

const PriceRow = styled.div`
    display: block;
    @media screen and (min-width: 800px){
        display: flex;
        gap:5px;
    }
    align-items: center;
    justify-content: space-between;
    margin-top: 5px;
    flex-wrap: nowrap; // Ensures that children do not wrap to the next line
`;

const Price = styled.div`
    font-size: 1rem;
    font-weight: 600;
    text-align:right;
    white-space: nowrap; // Ensures that the price does not wrap to the next line
    @media screen and (min-width: 800px){
        font-size: 1.1rem;
        font-weight: 400;
        text-align:left;
    }
`;

export default function ProductBox({_id, title, description, price, images}) {
    const { addProduct } = useContext(CartContext);
    const { wishListProducts, addProductToWishList, removeProductFromWishList } = useContext(WishListContext);

    const isInWishlist = Array.isArray(wishListProducts) && wishListProducts.includes(_id);

    const handleHeartClick = () => {
        if (isInWishlist) {
            removeProductFromWishList(_id);
        } else {
            addProductToWishList(_id);
        }
    };

    const url = '/product/'+_id;

    return (
        <ProductWrapper>  
            <WhiteBox>
                <Link href={url}>
                    <img src={images?.[0]} />
                </Link>
                <HeartButton productId={_id} />

            </WhiteBox>
            <ProductInfoBox>
                <Title href={url}>{title}</Title>
                <PriceRow>
                    <Price>{price.toLocaleString()} ₮</Price>
                    <Button $block onClick={() => addProduct(_id)} $primary $outline>
                        Сагслах
                    </Button>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    );
}
