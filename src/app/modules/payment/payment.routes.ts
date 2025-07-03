import express from 'express';
import{ cancel, checkout, complete } from './payment.controller';


const router = express.Router();

router.post('/checkout', checkout);
router.get('/complete',complete);
router.get('/cancel', cancel);

export default router;
