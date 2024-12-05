import { Router } from 'express';
import registerEnergyReading from './services/registerEnergyReading.js';

const router = Router();

router.post('/data', async (req, res) => {
    const reading = registerEnergyReading(req);
    res.json(reading);
});


export default router;
