import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/menu', (req, res) => {
  res.render('Menu');
});

export default router;
