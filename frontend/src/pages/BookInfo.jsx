import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const BookInfo = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    cover: "",
    date: null,
    abstract: "",
  })

  const { id: bookId } = useParams()

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get('http://localhost:4001/books/' + bookId)
        setBook(res.data[0])
      } catch (err) {
        console.log(err)
      }
    }
    fetchBook()
  }, [bookId])


  return (
    <div className='bookInfo'>
      <img src={book.cover} alt="cover" />
      <div className='bookAbs'>
        <h1 className='bookTitle'>{book.title} <Link to={`/books/${bookId}/abstract`}><span>Edit</span></Link> </h1>
        <p>作者：{book.author}</p>
        <p>{book.abstract}</p>
      </div>
    </div>
  )
}

export default BookInfo