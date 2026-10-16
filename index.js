import express from 'express'
import router from './routes/task.js'
import { pool } from './database/db.js';
import cors from 'cors'


const app = express();
const PORT = 3000;

 const { rows } = await pool.query('SELECT NOW()')
 console.log("DB CONNECTED: ", rows[0])

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({origin: 'http://localhost:5173'}))

app.use((req,res, next)=>{
    console.log(req.method, req.url)
    next()
})

app.use('/tasks', router)

app.get("/boom", () => {throw new Error('boom')})
app.use((req,res) =>{
    res.status(404).json({"message": "Route not Found"})
})

app.use((err, req, res, next) =>{
    console.error(err)
    res.status(err.status || 500).json({message: err.message || "Something went wrong"})
})

app.listen(PORT, ()=>{
    console.log(`Server runing on port ${PORT}`)
})

// Chromium Cluade