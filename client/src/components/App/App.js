import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../theme';
import { GlobalStyles } from '../global';
import { PageContainer } from '../CONSTANTS';
import DarkModeToggler from '../DarkModeToggler';
import styled from 'styled-components'
import RandomGenerator from '../RandomGenerator';
import Search from '../Search/Search';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import BrowseByGenre from '../BrowseByGenre'


function App() {
  const [bacon, setBacon] = useState(null);
  const [randomMovie, setRandomMovie] = useState(null);

  const [theme, setTheme] = useState('light');

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
          <PageContainer>

            <DarkModeToggler theme={theme} toggleTheme={toggleTheme} />
            <Search />




            <Route exact path='/'>
            </Route>

            <Route exact path="/genres/:genreName">
              <BrowseByGenre />
            </Route>

          </PageContainer>
        </ThemeProvider>
      </Switch>
    </Router>



  );
}

const CenteredContainer = styled.div`
  
  display: flex; 
  justify-content: center; 
  align-items: center; 
  flex-direction: column; 
  height: 100vh; 

  div {
    margin: 20px; 
  }

`

export default App;