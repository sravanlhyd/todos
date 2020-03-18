const routes = require('express').Router();
const auth = require('../middleware/auth');

const {addData, getAllData, updateData, deleteData} = require('../controller/dataController');
const {loging, signup} = require('../controller/userController');

routes.post('/user/login', loging);
routes.post('/user/signup', signup);

routes
    .route('/list')
        .get(getAllData)
        .post(auth, addData)
        .put(auth, updateData)
        .delete(auth, deleteData)

module.exports = routes