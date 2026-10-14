import express from 'express'
import { protect } from '../middleware/auth.js'
import { getAllStatus, getHabitStats, getHeatmap, getRange, getToday, markComplete, unmarkComplete } from '../controllers/logController.js'

const router = express.Router()

router.use(protect)

router.post('/', markComplete)
router.delete('/', unmarkComplete)
router.get('/today', getToday)
router.get('/range', getRange)
router.get('/heatmap', getHeatmap)
router.get('/stats', getAllStatus)
router.get('/stats/:habitId', getHabitStats)

const logRoutes = router
export default logRoutes