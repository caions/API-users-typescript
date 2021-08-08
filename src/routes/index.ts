import Routes from 'express';

import usersRouter from './users.routes';

const router = Routes();

router.use('/users', usersRouter);

export default router;
