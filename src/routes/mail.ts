import express from 'express';
import mail from '@/controllers/mail';
const router = express.Router();

router.get('/:userId', mail.getMail);
router.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

export default router;
