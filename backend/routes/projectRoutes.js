import { Router } from 'express';
import { acceptProject, createProject, getProjectsForUser, updateProjectTasks } from '../controllers/projectController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';
const router = Router();

router.post('/', authenticateToken, authorizeRole('admin'), createProject);
router.get('/', authenticateToken, getProjectsForUser);
router.put('/:id', authenticateToken, updateProjectTasks);
router.put("/:id/accept",acceptProject)
export default router;
