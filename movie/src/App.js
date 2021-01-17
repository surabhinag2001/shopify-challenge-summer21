import logo from './logo.svg';
import './App.css';
import axios from "axios";
import 'semantic-ui-css/semantic.min.css';
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import { useState } from 'react';
function App() {
  const [searchResult, setSearchResult] = useState(null);
  const fetchData = async (searchQuery) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=1a54ad07&s=${searchQuery}`
    );
    console.log(response.data);
    if (response.data.Response === "True") {
      setSearchResult(response.data);
      console.log(response.data.Search);
      console.log(searchResult);
    }


  };

  return (
    <div className="App">
      <header className="App-header">
        <Search
          open={false}
          onSearchChange={(e, data) => {
            //console.log(data);
            fetchData(data.value)
          }}
        />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <div>
          <button className="fetch-button" onClick={fetchData}>
            Fetch Data
        </button>
          <br />
        </div> */}


        <div className="movies">
          {searchResult &&
            searchResult.Search.map((movie, index) => {
              const title = movie.Title;
              const year = movie.Year;

              return (
                <div className="movie" key={index}>
                  <h3>Movie: {title} </h3>
                  <h3>Year: {year}</h3>
                </div>
              );
            })}

        </div>


        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div >
  );
}

export default App;
//toggle button https://react.semantic-ui.com/elements/button/
// use search box and icon 
// for listing https://react.semantic-ui.com/elements/list/