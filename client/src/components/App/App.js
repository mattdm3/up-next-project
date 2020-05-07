import React, { useState, useEffect, useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../theme';
import { GlobalStyles } from '../global';
import { PageContainer, BackgroundContainer, RecommendedContainer } from '../CONSTANTS';
import DarkModeToggler from '../DarkModeToggler';
import styled from 'styled-components'
import RandomGenerator from '../RandomGenerator';
import Search from '../Search/Search';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import BrowseByGenre from '../BrowseByGenre'
import MoviesId from '../MoviesId'
import Navbar from '../Navbar';
import UserProfile from '../UserProfile/UserProfile';
import Recommended from '../Recommended';
import { LoginContext } from '../LoginContext';
import Landing from '../Landing';

function App() {

  const [bacon, setBacon] = useState(null);
  const [randomMovie, setRandomMovie] = useState(null);

  // const [theme, setTheme] = useState('light')

  const { theme, setTheme } = useContext(LoginContext);

  //dark mode togger
  const toggleTheme = () => {
    // if the theme is not light, then set it to dark
    if (theme === 'light') {
      setTheme('dark');
      // otherwise, it should be light
    } else {
      setTheme('light');
    }
  }



  // RANDOM MOVIE TEST
  const handleRandomMovie = () => {
    fetch('/randomMovie')
      .then(res => res.json())
      .then(data => setRandomMovie(data))
  }

  return (
    <Router>
      <Switch>

        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <GlobalStyles />

          <Route exact path="/">
            <Landing />
          </Route>



          <PageContainer>
            <Route exact path='/profile/:userId'>
              <Navbar theme={theme} toggleTheme={toggleTheme} />
              <UserProfile />
            </Route>

            <Route exact path="/genres/:genreName">
              <Navbar theme={theme} toggleTheme={toggleTheme} />
              <BrowseByGenre toggleTheme={toggleTheme} theme={theme} />
            </Route>

            <Route exact path="/recommended/:userId">
              <Navbar theme={theme} toggleTheme={toggleTheme} />
              <Recommended />
            </Route>

            <Route exact path="/movies/:movieId">
              <Navbar theme={theme} toggleTheme={toggleTheme} />
              <MoviesId theme={theme} />
            </Route>

          </PageContainer>





        </ThemeProvider>

      </Switch>
    </Router>



  );
}


export default App;