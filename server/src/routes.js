import express from 'express'
import pool from './database.js'

const router = express.Router()

//Raiz
router.get('/', (req, res) => {
  res.send('"its safe to say that we might even be falling in love" - Victoria Monet')
})

//Rotas

//create
router.post('/todos', (req, res) => {
    const id = req.body["id"]
    const title = req.body["title"]

    console.log(id)
    console.log(title)

    pool.query('INSERT INTO todolist (id, title) VALUES ($1, $2)', [id, title])
    .then(res => console.log(res))
    .catch(err => console.log(err))

    res.status(201).send('Todo criado com sucesso')
})

//read
router.get(('/todos'), (req, res) => {
    pool.query('SELECT * FROM todolist')
    .then(result => res.json(result.rows))
    .catch(err => console.log(err))
})

//read pelo id
router.get(('/todos/:id'), (req, res) => {
    pool.query('SELECT * FROM todolist WHERE id = $1', [req.params.id])
    .then(result => res.json(result.rows))
    .catch(err => console.log(err))
})

//update
router.put('/todos/:id', (req, res) => {
    pool.query('UPDATE todolist SET title = $1 WHERE id = $2', [req.body.title, req.params.id])
    .then(response => res.status(200).send('Todo atualizado com sucesso'))
    .catch(err => console.log(err))
})

//delete
router.delete('/todos/:id', (req, res) => {
    pool.query('DELETE FROM todolist WHERE id = $1', [req.params.id])
    .then(response => res.status(200).send('Todo deletado com sucesso'))
    .catch(err => console.log(err))
})

export default router