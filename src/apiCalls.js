export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const postUrl = (newURL) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST', 
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(newURL)
  })
  .then(response => {
    if(!response.ok) {
      throw new Error ("We couldn't post this URL")
    }
    return response.json()
  })
}
