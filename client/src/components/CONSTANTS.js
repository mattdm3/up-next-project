import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { lightTheme } from "./theme";

export const PageContainer = styled.div`
  /* padding: 0 8rem;  */
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

export const RecommendedContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  /* background: black; */
`;

export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: inherit;
  position: relative;
`;

export const MutedText = styled.p``;

export const StyledNavLink = styled(NavLink)``;

export const BackgroundContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => (theme === lightTheme ? "#1F209A" : "#1F209A")};
  z-index: -100;
`;

export const PageHeading = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-top: 2rem;
`;

export const SubHeading = styled.h3`
  margin: 4rem 0;
  font-weight: 700;
`;

export const GenreP = styled.p`
  margin-right: 0.5rem;

  &:hover {
    color: #f65f2d;
  }
`;
