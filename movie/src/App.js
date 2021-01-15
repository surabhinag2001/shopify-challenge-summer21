import logo from './logo.svg';
import './App.css';
import axios from "axios";
import 'semantic-ui-css/semantic.min.css';
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
function App() {

  const fetchData = async (searchQuery) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=1a54ad07&s=${searchQuery}`
    );
    console.log(response.data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Search
          open={false}
          onSearchChange={(e, data) => {
            console.log(data);
            fetchData(data.value)
          }}
        />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <button className="fetch-button" onClick={fetchData}>
            Fetch Data
        </button>
          <br />
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
    </div>
  );
}

export default App;
//toggle button https://react.semantic-ui.com/elements/button/
// use search box and icon 
// for listing https://react.semantic-ui.com/elements/list/