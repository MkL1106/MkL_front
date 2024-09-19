import styled from "styled-components";
import ProductBox from "./ProductBox";
import Link from "next/link";
import Title from "./Title";

const StyledProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

const CategoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ProductsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

const ShowAllBox = styled.div`
  background-color: #d9d9d9; /* Gray background */
  padding: 20px;
  height: 160px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  font-size: 1rem;
  gap: 8px;
  color: #000; /* Text color black */
  text-decoration: none; /* Removes underline from the text */

  a {
    text-decoration: none; /* Removes underline from Link component */
    color: inherit; /* Inherits the black color */
  }
`;


const IconWrapper = styled.div`
  width: 24px; /* Adjust the size of the icon */
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function CategoriesGrid({ category, products }) {
    const id = category?._id?.toString(); // Optional chaining to safely access _id
    const url = id ? '/category/' + id : '#'; // Fallback to '#' if id is undefined

    return (
        <CategoryWrapper>
            <Title>{category.name}</Title>
            <ProductsWrapper>
                {products?.length > 0 &&
                    products.slice(0, 3).map((product) => (
                        <ProductBox key={product._id} {...product} />
                    ))}
                <Link href={url} passHref legacyBehavior>
                    <a style={{ textDecoration: 'none' }}>
                        <ShowAllBox>
                            Show all
                            <IconWrapper>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                </IconWrapper>
                        </ShowAllBox>
                    </a>
                </Link>
            </ProductsWrapper>
        </CategoryWrapper>
    );
}
