import React, { useState } from 'react';

function UrlForm({ addUrl }) {
  const [title, setTitle] = useState('');
  const [long_url, setUrlToShorten] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const newURL = {
      title,
      long_url
    }
    addUrl(newURL)
    clearInputs();
  }

  const clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  }

  return (
    <form>
      <input required
        type='text'
        placeholder='Title...'
        name='title'
        value={title}
        onChange={event => setTitle(event.target.value)}
      />

      <input required
        type='text'
        placeholder='URL to Shorten...'
        name='urlToShorten'
        value={long_url}
        onChange={event => setUrlToShorten(event.target.value)}
      />

      <button onClick={e => handleSubmit(e)}>
        Shorten Please!
      </button>
    </form>
  )
}

export default UrlForm;
