import React, { useContext } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../theme";
import { GlobalStyles } from "../global";
import { PageContainer } from "../CONSTANTS";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BrowseByGenre from "../BrowseByGenre";
import MoviesId from "../MoviesId";
import Navbar from "../Navbar";
import Footer from "../Footer";
import UserProfile from "../UserProfile/UserProfile";
import Recommended from "../Recommended";
import { LoginContext } from "../LoginContext";
import Landing from "../Landing";
import ClipLoader from "react-spinners/ClipLoader";


function App() {
  const { theme, setTheme, status } = useContext(LoginContext);
  //dark mode togger
  const toggleTheme = () => {
    // if the theme is not light, then set it to dark
    if (theme === "light") {
      setTheme("dark");
      // otherwise, it should be light
    } else {
      setTheme("light");
    }
  };

  return (
    <Router>
      <Switch>
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <GlobalStyles />

          {status === 'loading' ? 
          <div className="flex mt-44  justify-center w-full">
            <ClipLoader size={90} color="white" />
          </div> : 
            <>
              <Route exact path="/">
                <Landing />
              </Route>

              <Route exact path="/profile/:userId">
                <PageContainer>
                  <Navbar theme={theme} toggleTheme={toggleTheme} />
                  <UserProfile />
                </PageContainer>
                <Footer />
              </Route>

              <Route exact path="/genres/:genreName">
                <PageContainer>
                  <Navbar theme={theme} toggleTheme={toggleTheme} />
                  <BrowseByGenre toggleTheme={toggleTheme} theme={theme} />
                </PageContainer>
                <Footer />
              </Route>

              <Route exact path="/recommended/:userId">
                <PageContainer>
                  <Navbar theme={theme} toggleTheme={toggleTheme} />
                  <Recommended />
                </PageContainer>
              </Route>

              <Route exact path="/movies/:movieId">
                <PageContainer>
                  <Navbar theme={theme} toggleTheme={toggleTheme} />
                  <MoviesId theme={theme} />
                </PageContainer>
                <Footer />
              </Route>
            </>
          }
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

export default App;
