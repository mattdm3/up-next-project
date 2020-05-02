import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import DarkModeToggler from './DarkModeToggler'
import { LoginContext } from './LoginContext';
import { app } from 'firebase';
import { lightTheme } from './theme';
import { FiUser } from 'react-icons/fi'
import { GiHamburgerMenu } from 'react-icons/gi'


const Navbar = ({ theme, toggleTheme }) => {

    const { updateUserData, selectedGenre, appUser, signInWithGoogle, handleSignOut, message } = useContext(LoginContext);



    return (
        <>



            <StyledNav>
                <NavigationLink exact to='/'>
                    <LogoLi> <Logo>🍿 Up <span>Next</span></Logo>  </LogoLi>

                </NavigationLink>

                <StyledUl>
                    <NavigationLink to={`/genres/${selectedGenre}`}>
                        <StyledNavLink>Browse</StyledNavLink>
                    </NavigationLink>

                    <NavigationLink exact to={appUser.uid ? `/recommended/${appUser.uid}` : `/recommended/create-an-account`}>
                        <StyledNavLink>Recommended Movies</StyledNavLink>
                    </NavigationLink>
                    {/* <NavigationLink exact to='/'>
                        <li>🍿</li>
                    </NavigationLink> */}


                    {appUser && appUser.email ?
                        <>
                            <NavigationLink exact to={`/profile/${appUser.uid}`}>
                                <StyledNavLink>{appUser.displayName}</StyledNavLink>
                            </NavigationLink>
                            <NavigationLink exact to="/">
                                <StyledNavLink style={{ color: "grey" }} onClick={handleSignOut}>Logout</StyledNavLink>
                            </NavigationLink>


                        </>
                        :
                        <StyledNavLink style={{ cursor: "pointer" }} onClick={signInWithGoogle}><UserIcon /></StyledNavLink>
                    }
                    <DarkModeToggler theme={theme} toggleTheme={toggleTheme} />
                    <Hamburger>
                        <GiHamburgerMenu />
                    </Hamburger>





                </StyledUl>

            </StyledNav>
        </>
    )
}

const Hamburger = styled.div`
    /* position: absolute; 
    right: 0; */
    top: 2rem; 
    font-size: 1.7rem; 
    /* top: 50px;  */
    display: none; 
    margin-left: 1rem;

    @media screen and (max-width: 768px) {
        display: block;
    }

`

const StyledNav = styled.nav`
    /* width: 90%; */
    margin-left: auto;
    margin-right: auto; 
    display: flex; 
    justify-content: space-between; 
    align-items: center;
    height:8rem;
    /* border: 1px solid red;   */
`

const StyledUl = styled.ul`
    text-decoration: none;
    list-style: none; 
    display: flex; 
    width: fit-content;
    padding: 0; 
    align-items: center;

        li{
            @media screen and (max-width: 768px) {
            display: none;
        }

    }

    

`

const StyledNavLink = styled.li`
    padding: 20px;
    font-weight: 500; 
    /* text-transform:uppercase; */
`

const LogoLi = styled.li`

    padding-left: 0 !important; 
    text-decoration: none;
    list-style: none; 

`

const UserIcon = styled(FiUser)`
    padding: 0; 
    margin: 0; 
`

const Logo = styled.p`

    padding:0; 
    margin: 0; 
    font-size: 1.8rem; 
    font-weight: 400; 
    font-family: "Raleway";
    color: #999BFB;
    color:  ${({ theme }) => theme === lightTheme ? "#999BFB" : "#7879B7"};

    span {
        font-weight: 700; 
        color:  ${({ theme }) => theme === lightTheme ? "#1E209A" : "white"};
    }

`

const NavigationLink = styled(NavLink)`
    text-decoration: none;
    color: inherit;
    font-weight: 600; 
    transition-duration: 400ms; 

`

export default Navbar; 