import express from 'express';
import TaskController from '../../controllers/task.controller';
import {validate} from "../../middleware/validation";
import {CreateTaskSchema, UpdateTaskSchema} from "../../schemas/tasks.schema";
import {authenticate, AuthenticatedRequest} from "../../middleware/auth";
const router = express.Router();

router.use(authenticate);

router.post('/', validate(CreateTaskSchema), TaskController.createTask);
router.get('/', TaskController.getTasks);
router.put('/:taskId', validate(UpdateTaskSchema), TaskController.updateTask);
router.delete('/:taskId', TaskController.deleteTask);

export default router;