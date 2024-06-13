const Router = require('express');
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/signUp',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    body('username').isLength({ min: 3, max: 16 }),
    userController.signUp
);

router.post('/signIn', userController.signIn);

// Google OAuth routes
router.get('/auth/google', userController.googleAuth);
router.get('/auth/google/callback', userController.googleAuthCallback);

// Защищенные маршруты
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/getUsers', checkRoleMiddleware, userController.getUsers);

// Не защищенные маршруты
router.get('/activate/:link', userController.activate);

module.exports = router;