import { CartContextProvider } from "@/components/CartContext";
import { WishListContextProvider } from "@/components/WishListContext";
import Head from "next/head";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body{
    background-color: #f0f0f0;
    padding:0;
    margin:0;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
        <GlobalStyles/>
        <CartContextProvider>
        <WishListContextProvider>
          <Component {...pageProps} />
        </WishListContextProvider>
      </CartContextProvider>
    </>
  )
}
