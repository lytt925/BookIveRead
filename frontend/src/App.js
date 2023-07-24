import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Update, Books, Add, Navbar, Footer, BookInfo, UpdateNote } from './pages'
import "./style.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className='App'>
        <Routes>
          <Route path='/' element={<Books />} />
          <Route path='/add' element={<Add />} />
          <Route path='/update/:id' element={<Update />} />
          <Route path='/books/:id' element={<BookInfo />} />
          <Route path='/books/:id/abstract' element={<UpdateNote />} />
        </Routes>
      </div >
    </BrowserRouter>
  )
}

export default App