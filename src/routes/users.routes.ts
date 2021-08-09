import Routes from 'express';
import { UsersControllers } from '../controllers/UsersControllers';

const router = Routes();

const usersControllers = new UsersControllers();

router.get(
  '/',
  usersControllers.index,
  // #swagger.parameters['name']= { description: 'User name' }
  // #swagger.parameters['lastName']= { description: 'User lastName' }
);
router.get(
  '/:nickname',
  usersControllers.show,
  //  #swagger.parameters['nickname']= { description: 'User nickname' }
);
router.post(
  '/',
  usersControllers.create,
  /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Add a user',
                schema: { $ref: '#/definitions/AddUser' }
        } */
);
router.put(
  '/:id',
  usersControllers.update,
  /*  #swagger.parameters['id']= { description: 'User ID' }
    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Update a user lastName and/or address',
                schema: { $ref: '#/definitions/UpdateUser' }
        } */
);
router.patch(
  '/:id',
  usersControllers.patch,
  /*  #swagger.parameters['id']= { description: 'User ID' }
    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Update a user nickname',
                schema: { $ref: '#/definitions/UpdateNickname' }
        } */
);
router.delete(
  '/:id',
  usersControllers.destroy,
  // #swagger.parameters['id']= { description: 'User ID' }
);

export default router;
