import { useEffect, useState } from 'react'
import AutocompleteInput from './AutocompleteInput';
import './App.css';
import axios from 'axios';

function App() {

  const [options, setOptions] = useState([])  

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(({ data }) => setOptions(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="App">
      <p className="title">
        React autocomplete example with hooks.
      </p>

      <AutocompleteInput options={options}/>

    </div>
  );
}

export default App;
