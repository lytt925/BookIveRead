import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import axios from 'axios'

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    date: "",
    cover: ""
  })

  const navigate = useNavigate()
  const { state: { title, author, date, cover } } = useLocation()

  useEffect(() => {
    const formattedDate = date.substring(0, 10);
    setBook({ title, author, date: formattedDate, cover })
  }, [title, author, date, cover])


  const { id: bookId } = useParams()

  const handleChange = (e) => {
    console.log(e.target.value)

    setBook(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await axios.put("http://localhost:4001/books/" + bookId, book)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='form'>
      <h1>Update Book</h1>
      <input type="text" placeholder='名稱' name='title' onChange={handleChange} value={book.title} />
      <input type="text" placeholder='作者' name='author' onChange={handleChange} value={book.author} />
      <input type="text" placeholder='封面' name="cover" onChange={handleChange} value={book.cover} />
      <input type="date" placeholder='日期' name='date' onChange={handleChange} value={book.date} />
      <button className="formButton" onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update