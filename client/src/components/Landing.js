import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import landingImage from './landing-movie.svg';
import { FaGoogle } from 'react-icons/fa'
import { LoginContext } from './LoginContext'
import { Link, useHistory } from 'react-router-dom'
import BeatLoader from 'react-spinners/BeatLoader';
import { StyledLink } from './CONSTANTS'
import { lightTheme } from './theme';

const Landing = () => {

    const { user, signInWithGoogle, loading, appUser, handleSignOut } = useContext(LoginContext);
    let history = useHistory();

    user && history.push("/genres/action")



    useEffect(() => {

        user && history.push("/browser/action")

    }, [])

    return (
        <PageContainer>
            <HeadingContainer>
                <h1>Discover your next flick.</h1>
                <img src={landingImage} alt="" />
            </HeadingContainer>
            <MainInstructionsContainer>
                <h2>How it works</h2>
                <StepsContainer>
                    <Step>
                        <Number>
                            1
                         </Number>
                        <Instruction>
                            Browse movies
                         </Instruction>

                    </Step>
                    <Step>
                        <Number>
                            2
                         </Number>
                        <Instruction>
                            Rate 👍🏼 or 👎🏼
                         </Instruction>

                    </Step>
                    <Step>
                        <Number>
                            3
                         </Number>
                        <Instruction>
                            Get recommendations
                         </Instruction>

                    </Step>
                    <Step>
                        <Number>
                            4
                         </Number>
                        <Instruction>
                            Add movies to 🍿 Up Next
                         </Instruction>

                    </Step>
                </StepsContainer>



                {
                    appUser.email ?
                        <>
                            <StyledLink to="/genres/action">
                                <GoogleButton style={{ fontSize: "1rem", marginBottom: "1rem" }}>Let's find movies!</GoogleButton>
                            </StyledLink>
                            <p onClick={handleSignOut} style={{ fontSize: ".8rem", cursor: "pointer", color: "#1F209A" }}>logout</p>

                        </>
                        :
                        <>
                            <LoginContainer>
                                <Line>
                                    <hr />
                                    <p>sign up or login with</p>
                                    <hr />
                                </Line>

                            </LoginContainer>
                            <GoogleButton onClick={signInWithGoogle}>

                                {
                                    loading ?
                                        <BeatLoader />
                                        :
                                        <FaGoogle />
                                }


                            </GoogleButton>

                            <BrowseOption>
                                <p>Not sure yet? You can browse and search for movies <Link to="/genres/action">here.</Link></p>
                            </BrowseOption>
                        </>

                }


            </MainInstructionsContainer>



        </PageContainer>
    )
}

const BrowseOption = styled.div`
    margin-top: 2rem;
    color: #8D89C8; 
    font-size: .9rem;
`

const GoogleButton = styled.div`
    width: 14rem; 
    height: 2.7rem;
    margin-top: 1.5rem;
    border-radius: 10px; 
    background: #F65F2D; 
    color: white; 
    text-align: center; 
    display: flex; 
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    cursor: pointer;

`

const LoginContainer = styled.div`
    display: flex; 
    flex-direction: column; 
`

const Line = styled.div`
    display: flex; 
    justify-content: center; 
    align-items: center; 
    color: #8D89C8; 
    p {
        margin: 0;
        padding: 0; 
    }
    hr {
        color: #8D89C8; 
        width: 7rem; 
        margin: 0 .5rem; 
        padding: 0;
        height: 1px;  
        border-style: solid;
        border-width: 1px; 
    }
`

const PageContainer = styled.div`
    display: flex; 
    height: 100vh; 
    align-items: stretch;
    background: white; 

    @media screen and (max-width: 1000px) {
        flex-direction: column;
        align-items: center;
    }
`

const HeadingContainer = styled.div`
    display: flex; 
    background: white;
    flex-direction: column;
    padding-top: 6.8rem;
    margin-left: 4.5rem;
    margin-right: 4.5rem;
    flex-shrink: 1; 
    margin-bottom: 2rem;
    /* width: 55%;     */

    h1 {
        font-weight: 800;
        font-size: 3.3rem;
        font-family: "Raleway";
        margin-bottom: 3.4rem;
        width: 26.5rem;
        color: #2F2E41; 
    }
    img {
        min-width: 22rem;
        max-width: 33rem;
    }
`

const MainInstructionsContainer = styled.div`
    display: flex; 
    flex-direction: column; 
    background: #FAFAFA; 
    /* width: 45%; */
    width: 100%; 
    padding-top: 8.5rem; 
    /* margin: 0 auto;  */
    flex-shrink: 1; 
    align-items: center;
    padding-bottom: 2rem;


    
    
    

    h2 {
        font-family: "Raleway";
        font-size: 2.35rem;
        color: #2F2E41; 
        
        text-align: center;
    }
`

const StepsContainer = styled.div`
    display: flex; 
    flex-direction: column;
    /* padding-left: 4.5rem; */
  
    /* padding-left: 20%; */
    margin: 3rem auto; 
    padding: 0 1rem;
    
`

const Step = styled.div`
    display: flex; 
    align-items: center; 
    font-size: 1.5rem;
    font-weight: 600; 
    margin-bottom: 1.8rem;
    color: #1F209A;
`

const Number = styled.p`
    font-size: 1.5rem;
    background: #FFD93B;
    padding: .8rem; 
    border-radius: 50%; 
    width: 40px; 
    height: 40px; 
    display: flex; 
    justify-content: center;
    align-items: center;
    text-align: center; 

`

const Instruction = styled.div`
    font-size: 1.5rem;
    margin-left: 1.5rem;
`

export default Landing; 