import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({})
  const [author, setAuthor] = useState('')

  const url = `http://openlibrary.org/search/authors.json?q=~${author}`
  const searchAuthor = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setAuthor('')
    }
  }

  return (<div>
    {data.docs ?
    (<div className="app">
      <div className="title-text">
        <h1>Which author would you like to find out about?</h1>
      </div>
      <div className="search">
        <input
        value={author}
        onChange={event => setAuthor(event.target.value)}
        onKeyPress={searchAuthor}
        placeholder='Search by Name'
        type="text"
        />
      </div>

      {data.docs ? data.docs.map((doc, index) => (
      <div className="container">
        <div className="top">
          <div className="name">
            {doc ? <h1>{doc.name}</h1> : null}
          </div>
          <div className="description">
            {doc.birth_date ? <p><strong>Born: </strong>{doc.birth_date}</p> : null}
            {doc.death_date ? <p><strong>Died: </strong>{doc.death_date}</p> : null}
            {doc.date ? <p><strong>Life: </strong>{doc.date}</p> : null}
            {doc.top_work ? <p><strong>Greatest work: </strong>{doc.top_work}</p> : null}
            {doc.work_count ? <p><strong>Number of books published: </strong>{doc.work_count}</p> : null}
          </div>
        </div>
      </div>
      )) : null}

    </div>) :
      <div className="search-container">
        <div className="title-text">
          <h1>Find That author</h1>
        </div>
        <div className="search">
          <input
          value={author}
          onChange={event => setAuthor(event.target.value)}
          onKeyPress={searchAuthor}
          placeholder='Search by Name'
          type="text"
          />
        </div>
      </div>
    }
    </div>
  );
}

export default App;
