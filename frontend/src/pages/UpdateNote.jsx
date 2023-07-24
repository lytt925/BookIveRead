import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UpdateNote = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    cover: "",
    date: null,
    abstract: "",
  })

  const { id: bookId } = useParams()
  const navigate = useNavigate()


  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get('http://localhost:4001/books/' + bookId)
        console.log(res.data[0])
        setBook(res.data[0])
      } catch (err) {
        console.log(err)
      }
    }
    fetchBook()
  }, [bookId])


  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, abstract: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:4001/books/" + bookId + "/abstract", { abstract: book.abstract })
      navigate(`/books/${bookId}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='form'>
      <h1><span>{book.title}</span> 的摘要</h1>
      <textarea className="note" cols="50" rows="15" name='abstract' onChange={handleChange} value={book.abstract} />
      <button className="formButton" onClick={handleClick}>Update</button>
    </div>
  )
}

export default UpdateNote