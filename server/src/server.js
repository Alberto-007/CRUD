const express = require('express')
const cors = require('cors')
const router = require('./routes.js')
const app = express()
const PORT = 3001;

app.use(cors())
//indicar para o express ler body com json
app.use(express.json())


app.use(router)

//escutar
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))