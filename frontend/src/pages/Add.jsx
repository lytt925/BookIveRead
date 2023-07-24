import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    date: "",
    cover: ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setBook(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:4001/books", book)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='form'>
      <h1>Add New Book</h1>
      <input type="text" placeholder='名稱' name='title' onChange={handleChange} />
      <input type="text" placeholder='作者' name='author' onChange={handleChange} />
      <input type="text" placeholder='封面' name="cover" onChange={handleChange} />
      <input type="date" placeholder='日期' name='date' onChange={handleChange} />
      <button className="formButton" onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add