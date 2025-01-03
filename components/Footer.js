import Link from "next/link";
import styled from "styled-components";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const StyledFooter = styled.footer`
   display: none;
   @media screen and (min-width: 768px) {
      display: block;
      background-color: #222;
      color: #fff;
      padding: 40px 20px;
      text-align: center;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
   }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterSection = styled.div`
  justify-items: top;
  // text-align: start;
  align-items : center;
  flex: 1;
`;

const FooterTitle = styled.h3`
  color: #fff;
  margin-bottom: 10px;
`;

const FooterText = styled.p`
  color: #aaa;
  margin: 0;
`;

const FooterLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  &:hover {
    color: #fff;
  }
  display: block;
  margin-bottom: 10px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  justify-content: start;
  height: 50px;
  width: 50px;
`;

const SocialIcon = styled.a`
  color: #aaa;
  font-size: 30px;
  text-decoration: none;
  &:hover {
    color: #fff;
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <FooterContent>
        {/* About Section */}
        <FooterSection>
          <FooterTitle>About Us</FooterTitle>
          <FooterText>
            We are a leading online store providing top quality products.
          </FooterText>
        </FooterSection>

        <FooterSection>
          <FooterTitle>ХОЛБОО БАРИХ</FooterTitle>
          <FooterText>Имэйл: emonh7066@gmail.com</FooterText>
          <FooterText>Утас: 95341613</FooterText>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Follow Us</FooterTitle>
          <SocialLinks>
            <SocialIcon href="https://facebook.com" target="_blank">
              <FaFacebookF />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="https://linkedin.com" target="_blank">
              <FaLinkedinIn />
            </SocialIcon>
          </SocialLinks>
        </FooterSection>
      </FooterContent>

      {/* Footer Copyright */}
      <FooterText>
        © 2024 MkL, MkL.mn” лого, таних тэмдэг нь Монгол улсын зохиогчийн эрхийн
        хуулиар хамгаалагдсан болно.
      </FooterText>
    </StyledFooter>
  );
}
