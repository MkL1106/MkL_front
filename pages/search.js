import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import { useState } from "react";

const SearchInput = styled.input`
  width: 95%;
  height: 35px;
  padding: 10px;
  margin: 40px 0 50px;
  font-size: 20px;
  border: 2px solid #1d5ca3;
  border-radius: 10px;
  outline: none;
   @media screen and (min-width: 768px){
    }
`;

export default function ProductsPage({ products }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <Center>
        <SearchInput
          type="text"
          placeholder="Бүтээгдэхүүнээ хайгаарай"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ProductsGrid products={filteredProducts} />
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
