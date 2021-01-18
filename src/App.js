import './App.css';
import axios from "axios";
import 'semantic-ui-css/semantic.min.css';
import { Message, Search, Button, Grid, Header, Segment, List, Icon, Container } from 'semantic-ui-react'
import { useState } from 'react';
function App() {
  const [searchResult, setSearchResult] = useState(null);
  const [nominatedMovies, setNominatedMovies] = useState([]);
  const fetchData = async (searchQuery) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=1a54ad07&s=${searchQuery}`
    );

    if (response.data.Response === "True") {
      setSearchResult(response.data);

    }


  };
  const nominateMovie = (movie) => {
    const newNominations = [...nominatedMovies]
    if (newNominations.length < 5) {
      newNominations.push(movie);
      setNominatedMovies(newNominations);
    }

  }
  const deleteNomination = (movie) => {

    const newNominations = [...nominatedMovies]
    for (var i = 0; i < newNominations.length; i++) {
      if (newNominations[i].imdbID === movie.imdbID) {

        newNominations.splice(i, 1)
      }
    }
    setNominatedMovies(newNominations);

  }
  var searchStyle = {
    padding: 10,
    margin: 10
  }
  return (
    <div className="App">
      <header className="App-header">
        <div style={searchStyle}>
          <Search
            open={false}
            onSearchChange={(e, data) => {
              fetchData(data.value)
            }}
          />
        </div>


        <Container>
          <Segment placeholder>
            <Grid columns={2} stackable textAlign='left'>
              {/* <Divider vertical></Divider> */}

              <Grid.Row verticalAlign='middle'>
                <Grid.Column>
                  <p>Search Results:</p>
                  <List divided verticalAlign='middle'>
                    {searchResult &&
                      searchResult.Search.map((movie) => {
                        const title = movie.Title;
                        const year = movie.Year;
                        var a = nominatedMovies.indexOf(movie);
                        var f = false;
                        if (a >= 0) { f = true };


                        return (
                          <List.Item>
                            <List.Content floated='right'>
                              <Button
                                disabled={f}
                                onClick={() => { nominateMovie(movie) }}
                              >Nominate</Button>
                            </List.Content>
                            <List.Content>
                              <List.Header>{title}
                              </List.Header>
                              {year}
                            </List.Content>
                          </List.Item>
                        )
                      })}
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <p>Nominated movies:</p>
                  <List divided verticalAlign='top'>
                    {nominatedMovies &&
                      nominatedMovies.map((movie) => {
                        const title = movie.Title;
                        const year = movie.Year;

                        return (
                          <List.Item>
                            <List.Content floated='right'>
                              <Button basic
                                icon
                                onClick={() => { deleteNomination(movie) }}>
                                <Icon
                                  color='red'
                                  name='close' />
                              </Button>
                            </List.Content>
                            <List.Content>
                              <List.Header>{title}
                              </List.Header>
                              {year}
                            </List.Content>
                          </List.Item>
                        )
                      })}
                  </List>

                  <Message hidden={nominatedMovies.length != 5}
                    success
                    header='You have successfully nominated 5 movies'
                    content='You are allowed to nominate upto 5 movies'
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>

      </header>
    </div >
  );
}

export default App;
