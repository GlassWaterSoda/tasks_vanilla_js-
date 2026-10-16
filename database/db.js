import { Pool } from 'pg'
import 'dotenv/config'



if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set. Check your .env file.')
}

let connectionString = process.env.DATABASE_URL;


export const pool = new Pool({
    connectionString
})

pool.on('error', (err)=>{
    console.error('Unexpected database error', err)
})



