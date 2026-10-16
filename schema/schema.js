import { z } from 'zod'


export const taskSchema = z.object({id: z.number() ,title: z.string().min(4)})
