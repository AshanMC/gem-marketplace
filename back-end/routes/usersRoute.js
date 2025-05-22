import exppress from 'express';
import { registerUserCtrl, loginUserCtrl, getUserProfile, getAllUsersCtrl, updateShippingAddressCtrl } from '../controllers/usersCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
const userRoutes = exppress.Router();

userRoutes.post('/register', registerUserCtrl);
userRoutes.post('/login', loginUserCtrl);
userRoutes.get('/profile', isLoggedIn, getUserProfile);
userRoutes.get("/", isLoggedIn, getAllUsersCtrl);
userRoutes.put('/update/shipping', isLoggedIn, updateShippingAddressCtrl);
export default userRoutes;