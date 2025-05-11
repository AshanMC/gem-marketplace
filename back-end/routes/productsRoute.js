import exppress from 'express';
import { createProductCtrl, getProductsCtrl, getProductCtrl,updateProductCtrl,deleteProductCtrl } from '../controllers/productsCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import upload from '../config/fileUpload.js';

const productRouter = exppress.Router();

productRouter.post('/', isLoggedIn, createProductCtrl);
productRouter.get('/', getProductsCtrl);
productRouter.get('/:id', getProductCtrl);
productRouter.put('/:id', isLoggedIn, updateProductCtrl);
productRouter.delete('/:id/delete', isLoggedIn, deleteProductCtrl);

export default productRouter;