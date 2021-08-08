import Routes from 'express';
import { UsersControllers } from '../controllers/UsersControllers';

const router = Routes();

const usersControllers = new UsersControllers();

router.get('/', usersControllers.index);
router.get('/:nickname', usersControllers.show);
router.post('/', usersControllers.create);
router.put('/:id', usersControllers.update);
router.patch('/:id', usersControllers.patch);
router.delete('/:id', usersControllers.destroy);

export default router;
