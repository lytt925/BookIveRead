import { useEffect, useState } from 'react'

import axios from 'axios'
import { Link } from 'react-router-dom'

const Books = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get('http://localhost:4001/books')
        setBooks(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchAllBooks()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:4001/books/" + id)
      window.location.reload() // or use Redux
    } catch (err) {
      console.log(err)
    }
  }



  return (
    <div className="books">
      {
        books.map(book => {

          const originalDate = new Date(book.date);
          const formattedDate = originalDate.toISOString().split('T')[0].replace(/-/g, '/');

          return (
            <div className='book' key={book.id}>
              {book.cover && <Link to={`/books/${book.id}`}>
                <img src={book.cover} alt="cover" />
              </Link>}
              <Link style={{ textDecoration: 'none', color: 'black' }} to={`/books/${book.id}`}><h2>{book.title}</h2></Link>
              <p>{book.author}</p>
              <span>{formattedDate}</span>
              <div className='buttons'>
                <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
                <button className="update">
                  <Link to={`/update/${book.id}`} state={book}>
                    Update
                  </Link>
                </button>
              </div>
            </div>
          )

        })
      }
    </div >
  )
}

export default Books