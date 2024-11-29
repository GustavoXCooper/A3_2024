import { Router } from 'express';
import registerEnergyReading from './services/registerEnergyReading.js';
import { db } from './firebase.js';

const router = Router();

router.post('/data', async (req, res) => {
    const reading = registerEnergyReading(req);
    res.json(reading);
});


export default router;
