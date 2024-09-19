/* eslint-disable @next/next/no-typos */
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import CartIcon from "@/components/icons/CartIcon";
import ProductImages from "@/components/ProductImages";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { useContext } from "react";
import styled from "styled-components";

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 768px){
        grid-template-columns: 1fr 1fr;
    }
    gap: 40px;
    margin: 40px 0;
`;

const PriceRow = styled.div`
    display:flex;
    gap: 20px;
    align-items:center;
`;

const Price = styled.span`
    font-size: 1.4rem;
`;

export default function CategoryPage({category,products}){
    return (
        <>
            <Header/>
            <Center>
                <Title>{category?.name}</Title>
                <ProductsGrid products={products}/>
            </Center>
        </>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const { id } = context.query;

    // Fetch the category based on the ID
    const category = await Category.findById(id);

    // Fetch products that belong to this category
    const products = await Product.find({ category: id });

    return {
        props: {
            category: JSON.parse(JSON.stringify(category)),
            products: JSON.parse(JSON.stringify(products))
        }
    };
}