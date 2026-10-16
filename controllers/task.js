import { pool } from "../database/db.js";

// let tasks = [
//     {"id": 1, "title": "Learn Express"},
//     {"id": 2, "title": "Learn Typescript"}
// ]


export const get_task_by_id = async (req,res)=>{

    let id = Number(req.params.id)
        if (!Number.isInteger(id)) {
        return res.status(400).json({ message: 'id must be an integer' })
    }
    let s =await pool.query('SELECT * FROM tasks WHERE id=$1', [id])
    // let s = tasks.find(task => task.id === id);
    if (s.rows.length === 0){
        res.status(404).json({"message": "Task not Found"})
    }
    return res.json(s.rows[0])
}

export const welcome = async (req,res)=>{
    res.json({"Message":"Welcome to basic server"})
}

export const get_all_tasks = async (req,res)=>{
    let { rows } = await pool.query('SELECT * FROM tasks  ORDER by id')
    res.json(rows)
}

export const post_task = async (req,res)=>{
    // // let id = req.body.id;
    // console.log(req.body)
    // // res.json(`Id: ${id}`)

    const { title } = req.body
  
    let { rows } = await pool.query('INSERT INTO tasks (title) VALUES ($1) RETURNING *', [title])

    // res.json(`\nId: ${id}\n Email: ${email}\n Password: ${password} is added, Successfully!`)
    res.status(201).json(rows[0])

}

export const update_task = async (req, res)=>{

    let id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: 'id must be an integer' })
    }
    const { title } = req.body
    let { rows } = await pool.query('UPDATE tasks SET title = $1 WHERE id=$2 RETURNING *', [title, id])

    if (rows.length === 0){
        res.status(404).json({"message": "Task not Found"})
    }

    return res.json(rows[0])

}

export const delete_task = async (req,res)=>{

    let id = Number(req.params.id)

     if (!Number.isInteger(id)) {
        return res.status(400).json({ message: 'id must be an integer' })
    }

    let { rows } = await pool.query('DELETE FROM tasks WHERE id=$1 RETURNING *',[id])

    if (rows.length === 0 ){
        res.status(404).json({"message": "Task not Found"})
    }
    
    return res.json({deleted: rows[0]})


}

