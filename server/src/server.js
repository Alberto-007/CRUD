const express = require('express')
const cors = require('cors')
const router = require('./routes.js')

const app = express()
const PORT = 3001;

//indicar para o express ler body com json
app.use(express.json())
app.use(cors())

app.use(router)

//escutar
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

module.exports = app