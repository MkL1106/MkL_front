import Button from "@/components/Button";
import { WishListContext } from "@/components/WishListContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ProductsGrid from "@/components/ProductsGrid";
import WishListProductsGrid from "@/components/WishListProductsGrid";

export const ColumnsWrapper = styled.div`
    padding-bottom:60px;
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 850px){
         display: grid;
    }
    gap: 40px;
    margin-top: 40px;
`;

export const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
`;

const ProductInfoCell = styled.td`
    padding: 10px 0;
`;

const ProductImageBox = styled.div`
    width: 70px;
    height: 100px;
    padding: 2px;
    border: 1px solid rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img {
        max-width: 60px;
        max-height: 60px;
    }
    @media screen and (min-width: 768px){
        padding: 10px;
        width: 100px;
        height: 100px;
        img {
        max-width: 80px;
        max-height: 80px;
        }
    }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display:block;
  @media screen and (min-width: 768px){
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`; 

export default function WishListPage() {
    const { wishListProducts, removeProductFromWishList } = useContext(WishListContext);
    const [products, setProducts] = useState([]);
    const [horoo, sethoroo] = useState('');
    const [duureg, setDuureg] = useState('');
    const [floor, setFloor] = useState('');
    const [toot, setToot] = useState('');
    const [bair, setBair] = useState('');
    const [code, setCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [hothon, setHothon] = useState('');
    const [orts, setOrts] = useState('');
    const [goToOrder, setGoToOrder] = useState(false);

    useEffect(() => {
        if (wishListProducts?.length > 0) {
            axios.post('/api/wishlist', { ids: wishListProducts })
                .then(response => {
                    setProducts(response.data);
                });
        } else {
            setProducts([]);
        }
    }, [wishListProducts]);

    return (
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                        <h2>Хадгалсан</h2>
                        {!wishListProducts?.length && (
                            <div>Таньд хадгалсан бүтээгдэхүүн байхгүй байна.</div>
                        )}
                        {products?.length > 0 && (
                            <WishListProductsGrid products={products}/>
                        )}
                </ColumnsWrapper>
            </Center>
        </>
    );
}
