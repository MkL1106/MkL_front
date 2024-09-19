const { default: styled } = require("styled-components");

const Title = styled.h1`
    font-size: 1.5em;
    text-transform: capitalize; /* Capitalizes the first letter of each word */
    
    /* Capitalize only the first letter of the first word */
    &::first-letter {
        font-size: 1.5rem; /* Adjust the size as needed */
        font-weight: bold; /* Adjust weight if needed */
    }
`;

export default Title;