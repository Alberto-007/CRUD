import express from 'express';
import cors from 'cors';
import router from './routes.js';

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

export default app