import express from "express";
import asyncHandler from 'express-async-handler';

import { brandInfo, brandProductList } from "../controllers/brand.controller.js";
import { createBrand, updateBrand } from '../controllers/brand.controller.js';
import { jwtMiddleware } from "../../config/userJwtMiddleWare.js";

export const brandRouter = express.Router();

brandRouter.post('/', createBrand);
brandRouter.patch('/:id', updateBrand); // login_required 추가

brandRouter.post('/', jwtMiddleware, createBrand);
brandRouter.patch('/:brandId', jwtMiddleware, updateBrand); // login_required 추가

brandRouter.get('/:brandId', asyncHandler(brandInfo));
brandRouter.get('/:brandId/products', asyncHandler(brandProductList));
