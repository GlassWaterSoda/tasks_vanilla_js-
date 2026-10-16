import { Router } from 'express'
import { delete_task, get_all_tasks, get_task_by_id, post_task, update_task, welcome } from '../controllers/task.js'
import { validate } from '../middleware/middleware.js'
import { taskSchema } from '../schema/schema.js'


const router = Router()



router.get("/home", welcome)
router.get("/", get_all_tasks )
router.get("/:id", get_task_by_id )
router.post("/", validate(taskSchema), post_task)
router.put("/:id", validate(taskSchema), update_task)
router.delete("/:id", delete_task)


export default router