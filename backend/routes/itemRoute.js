import express from 'express'
import { createItemController } from '../controller/ItemsController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post(
    "/create-Item",
    requireSignIn,
    isAdmin,
    createItemController
  );

  export default router;