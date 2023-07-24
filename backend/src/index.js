import express from "express"  // need to modify package.json to module
import mysql from "mysql"
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lytshamin925",
  database: "React-SQL-Tutorial",
  timezone: 'utc' //<-- here
})

// If there is a auth problem
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_current_password';

app.get("/", (req, res) => {
  res.json("hello, this is the backend")
})

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books"
  db.query(q, (err, data) => {
    if (err) return res.json(err)
    console.log(data)
    return res.json(data)
  })
})

app.get("/books/:id", (req, res) => {
  const q = "SELECT * FROM books WHERE id = ?"
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `author`, `cover`, `date`) VALUES (?)"
  const values = [
    req.body.title,
    req.body.author,
    req.body.cover,
    req.body.date
  ]
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    else {
      return res.json("book has been created succesfully")
    }
  })
})

app.post("/books/:id/abstract", (req, res) => {
  const q = "UPDATE books SET `abstract` = ? WHERE id = ?"
  const bookId = req.params.id
  console.log('hihih', bookId, req.body.abstract)
  const values = [
    req.body.abstract,
    bookId
  ]
  db.query(q, values, (err, data) => {
    if (err) return console.log(err)
    else {
      console.log(values)
      return res.json("book abstract has been created succesfully")
    }
  })
})


app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id
  const q = "DELETE FROM books WHERE id = ?"

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err)
    else {
      console.log('success')
      return res.json("book has been deleted succesfully")
    }
  })
})

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id
  const q = "UPDATE books SET `title` = ?, `author` = ?, `cover` = ?, `date` = ? WHERE id = ?"

  const values = [
    req.body.title,
    req.body.author,
    req.body.cover,
    req.body.date,
  ]

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err)
    else {
      console.log('success')
      return res.json("book has been updated succesfully")
    }
  })
})

const PORT = 4001
app.listen(PORT, () => {
  console.log(`connected to server on ${PORT}`)
})