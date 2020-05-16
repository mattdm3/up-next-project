import React, { useContext, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { NavLink, useHistory, Link } from 'react-router-dom';
import DarkModeToggler from './DarkModeToggler'
import { LoginContext } from './LoginContext';
import { lightTheme } from './theme';
import { FiUser } from 'react-icons/fi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FiX } from 'react-icons/fi'
import { FaCheckSquare } from 'react-icons/fa'

const Navbar = ({ theme, toggleTheme }) => {

    const { recommendAllowed, dataObject, selectedGenre, appUser, signInWithGoogle, handleSignOut } = useContext(LoginContext);




    const [navbar, setNavbar] = useState(false);


    const [triggerSearchBar, setTriggerSearchBar] = useState(false);


    let history = useHistory();
    const currentPath = history.location.pathname;

    function toggleNavbar() {

        if (navbar) {
            setNavbar(false)
        } else if (!navbar) {
            setNavbar(true)
        }

    }
    useEffect(() => {

        setTriggerSearchBar(false)

    }, [currentPath])

    const toggleSearchBar = () => {

        if (triggerSearchBar) {
            setTriggerSearchBar(false)
        } else if (!triggerSearchBar) {
            setTriggerSearchBar(true)
        }
    }

    const handleWindowResize = () => {
        if (window.innerWidth > 768) {
            setNavbar(false)
        }

    }







    // const handleKeypress = (e) => {
    //     console.log(e);
    //     if (e.keyCode === 27) {
    //         setTriggerSearchBar(false)
    //     }

    // }


    useEffect(() => {
        if (!navbar) {
            window.addEventListener("resize", handleWindowResize);
        } else {
            window.removeEventListener("resize", handleWindowResize);
        }

        return () => window.removeEventListener("resize", handleWindowResize);

    }, [])

    // useEffect(() => {

    //     window.addEventListener("keydown", handleKeypress)

    //     return () => window.removeEventListener("click", handleKeypress);

    // }, [])


    return (
        <>

            <StyledNav>

                <HiddenNavigation style={(navbar) ? { transform: "translateX(0%)" } : {
                    transform: "translateX(100%)"
                }}>
                    <ExitNavigation onClick={toggleNavbar}>
                        <FiX />
                    </ExitNavigation>

                    <OverlayMenu>
                        {appUser.displayName && <UserName>Hello, {appUser.displayName} </UserName>}
                        {/* <HiddenNavLink onClick={toggleNavbar} to="/"><li>Home 🍿</li></HiddenNavLink> */}
                        <HiddenNavLink onClick={toggleNavbar} to="/genres/action"><li>Browse 🔍</li></HiddenNavLink>
                        {/* <HiddenNavLink onClick={toggleNavbar} to={`/recommended/${appUser.uid}`}><li>Recommended Movies 🎥</li></HiddenNavLink> */}


                        {appUser && appUser.email ?
                            <>
                                <HiddenNavLink onClick={toggleNavbar} to={`/profile/${appUser.uid}`}>
                                    <StyledNavLink>My Movies 🍿</StyledNavLink>
                                </HiddenNavLink>
                                <HiddenNavLink to="/" onClick={toggleNavbar}>
                                    <StyledNavLink style={{ color: "grey" }} onClick={handleSignOut}>Logout 🚪</StyledNavLink>
                                </HiddenNavLink>


                            </>
                            :
                            <>
                                <StyledNavLink style={{ cursor: "pointer", display: 'flex', justifyContent: "flex-end", alignItems: "center" }} onClick={signInWithGoogle}> <p style={{ paddingRight: ".5rem" }}>Get Started</p> <UserIcon /></StyledNavLink>

                                <LearnMoreButton onClick={() => history.push("/")}>How it works</LearnMoreButton>
                            </>
                        }








                    </OverlayMenu>

                    {/* <SocialIcons>
                        <FaFacebookF />
                        <FaTwitter />
                        <FaPinterest />
                        <FaYoutube />
                    </SocialIcons> */}

                </HiddenNavigation>




                <NavigationLink exact to='/'>
                    <LogoLi> <Logo>🍿 Up <span>Next</span></Logo>  </LogoLi>
                </NavigationLink>

                <StyledUl>
                    <NavigationLink to={`/genres/${selectedGenre}`}>
                        <StyledNavLink>Browse</StyledNavLink>

                    </NavigationLink>

                    <NavigationLink exact to={`/recommended/${appUser.uid}`}>
                        <StyledNavLink>Recommended Movies</StyledNavLink>
                        {appUser.email && recommendAllowed && navbar === false &&
                            <RecContainer>
                                <FaCheckSquare />
                            </RecContainer>}
                    </NavigationLink>
                    {/* <NavigationLink exact to='/'>
                        <li>🍿</li>
                    </NavigationLink> */}


                    {appUser && appUser.email ?
                        <>
                            <NavigationLink exact to={`/profile/${appUser.uid}`}>
                                <StyledNavLink>My Movies 🍿</StyledNavLink>
                                {dataObject && dataObject.upNextList && dataObject.upNextList.length && navbar === false &&
                                    <UpNextAmount>
                                        {dataObject && dataObject.upNextList && (dataObject.upNextList[0] === "none" ? "0" : dataObject.upNextList.length)}
                                    </UpNextAmount>}
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
                        <GiHamburgerMenu onClick={toggleNavbar} />
                    </Hamburger>





                </StyledUl>

            </StyledNav>
        </>
    )
}


const scaleUp = keyframes`
    0 {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
`

const UpNextAmount = styled.p`
    position: absolute; 
    right: -2px;
    top: -2px; 
    font-weight: 400; 
    padding: 4px;
    font-size: .6rem; 
    border-radius: 50%; 
    width: 18px;
    height: 18px; 
    text-align: center; 
    background: #F65F2D; 
    border: none; 

    @media screen and (max-width: 768px) {
            display: none;
    }

`

const RecContainer = styled.p`
    position: absolute; 
    right: -2px;
    top: -2px; 
    font-weight: 400; 
    padding: 4px;
    font-size: .6rem; 
    border-radius: 50%; 
    width: 18px;
    text-align: center; 
    background: green; 
    animation: ${scaleUp} 900ms ease; 

    @media screen and (max-width: 768px) {
        display: none;
    }


`

const HiddenNavigation = styled.div`
    position: fixed; 
    right:0; 
    width:50%;
    height: 100vh; 
    transition-duration: .7s;
    top: 0; 
    z-index: 5000; 
    /* background: white; */
    /* background-color: #333333; */
    
    border-top-left-radius: 10px; 
    border-bottom-left-radius: 10px; 

    background: ${({ theme }) => theme === lightTheme ? "#050553" : "#F3F4FD"}

    

`

const HiddenNavLink = styled(Link)`
    text-decoration: none; 
`

const ExitNavigation = styled.div`
    /* color: white;  */
    color: ${({ theme }) => theme === lightTheme ? "#F3F4FD" : "#050553"};
    position: absolute; 
    right:  3rem;
    top: 4.5rem; 
    font-size: 1.7rem; 
    transition-duration: 400ms;
    cursor: pointer; 

    &:hover {
        /* color: #8E8E8E;  */
    }

`

const OverlayMenu = styled.ul`
    display: flex; 
    /* align-items: center; */
    flex-direction: column;
    align-items: flex-end; 
    /* position: fixed; */
    top: 0; 
    /* background-color: inherit; */
    /* color: white;  */

    margin: 0; 
    padding-right: 3rem;
    padding-bottom: 20px; 
    margin: 7rem 0;
    width: 100%;
    text-align: right;
    /* border-bottom: 1px solid #454545;  */
    /* height: 100vh;  */
    z-index: 100; 
    font-size: 1.1rem;
    /* opacity: .9; */

    
   


    li {
        list-style: none;
        font-weight: 500;
        font-size: 1.3rem;
        /* text-transform: uppercase;  */
        color: ${({ theme }) => theme === lightTheme ? "#8D89C8" : "#050553"};

        /* margin: 5px 0;  */
        padding: 1.5rem 0; 
        cursor: pointer;
        /* color: #FFFFFF;  */
        /* border-bottom: 2px solid #164C81; */
        width: 100%; 
        transition-duration: 300ms;

        &:hover {
        /* border-bottom: 3px solid #164C81; */
        /* background: #EEEEEE; */
        color: #8E8E8E; 
        }

        @media screen and (max-width: 500px) {
        font-size: 11px; 
    }

       
    }

`

const UserName = styled.p`
        list-style: none;
        font-weight: 600;
        font-size: 1.4rem;
        /* text-transform: uppercase;  */
        color: ${({ theme }) => theme === lightTheme ? "#8D89C8" : "#050553"};

        /* margin: 5px 0;  */
        padding: 1.8rem 0; 
        /* color: #FFFFFF;  */
        /* border-bottom: 2px solid #164C81; */
        width: 100%; 
        transition-duration: 300ms;

        @media screen and (max-width: 500px) {
        font-size: 13px; 
    }
`


const Hamburger = styled.div`
    /* position: absolute; 
    right: 0; */
    top: 2rem; 
    font-size: 1.7rem; 
    /* top: 50px;  */
    display: none; 
    margin-left: 1rem;
    cursor: pointer;

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
    position: relative;
    
`

const StyledUl = styled.ul`
    text-decoration: none;
    list-style: none; 
    display: flex; 
    width: fit-content;
    padding: 0; 
    align-items: center;
    margin: 0; 

        li{
            @media screen and (max-width: 768px) {
            display: none;
        }

    }

    

`

const StyledNavLink = styled.li`
    padding: .5rem;
    font-weight: 400; 

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
    position: relative;

`

const LearnMoreButton = styled.div`
    width: 10rem; 
    height: 2.3rem;
    margin-top: 1.5rem;
    border-radius: 10px; 
    background: #F65F2D; 
    color: white; 
    text-align: center; 
    display: flex; 
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    cursor: pointer;

    @media screen and (max-width: 400px) {
        width: 8rem; 
    }
`


export default Navbar; 