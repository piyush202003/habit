import express from 'express'
import { protect } from '../middleware/auth.js'
import { archiveHabit, createHabit, deleteHabit, getHabits, reorderHabits, updateHabit } from '../controllers/habitController.js'

const router = express.Router()

// this makes every rout need protection
router.use(protect)

router.get('/', getHabits)
router.post('/', createHabit)
router.put('/reorder', reorderHabits)
router.put('/:id', updateHabit)
router.delete('/:id', deleteHabit)
router.put('/:id/archive', archiveHabit)

const habitRoutes = router
export default habitRoutes
