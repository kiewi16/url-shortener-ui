import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls, postUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    getUrls()
    .then(data => setUrls([...urls, ...data.urls]))
    .catch(error => console.log(error))
  }, [])

  function addUrl(newURL) {
    postUrl(newURL)
    .then(data => setUrls([...urls, data]))
    // .catch(error => console.log(error))
  }

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm addUrl={addUrl}/>
      </header>
      <UrlContainer urls={urls}/>
    </main>
  );
}

export default App;
