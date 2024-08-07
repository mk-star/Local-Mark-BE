import { response, errResponse } from '../../config/response.js';
import { status } from "../../config/response.status.js";

import { createBrandService, updateBrandService } from '../services/brand.service.js';
import { getBrandInformation, getBrandProducts } from "../proviers/brand.providers.js";

// 브랜드 정보 조회
export const brandInfo = async (req, res, next) => {
    console.log("브랜드 정보를 요청하였습니다!");
    console.log("params:", req.params); // 값이 잘 들어오나 찍어보기 위한 테스트 용

    return res.send(response(status.SUCCESS, await getBrandInformation(req.params.brandId)));
}

// 브랜드 프로필 - 제품 갤러리
export const brandProductList = async (req, res, next) => {
    console.log("브랜드 제품을 요청하였습니다!");
    console.log("params:", req.params); // 값이 잘 들어오나 찍어보기 위한 테스트 용
    console.log("query:", req.query); // 값이 잘 들어오나 찍어보기 위한 테스트 용

    return res.send(response(status.SUCCESS, await getBrandProducts(req.params.brandId, req.query.page, req.query.sort)));
}

export const createBrand = async(req, res, next) => {
    try {
        const brandData = req.body;
        // brandData.user_id = req.userId;
        brandData.user_id = 1; // Replace with actual user ID logic
        const newBrand = await createBrandService(brandData);
        return res.status(201).json(response({ isSuccess: true, code: 201, message: 'Brand created successfully' }, newBrand));
    } catch (error) {
        return res.status(400).json(errResponse({ isSuccess: false, code: 400, message: error.message }));
    }
}
export const updateBrand = async(req, res, next) => {
    try {
        const brandId = req.params.id;
        const brandData = req.body;
        // brandData.user_id = req.userId;
        brandData.user_id = 1; // Replace with actual user ID logic
        const updatedBrand = await updateBrandService(brandId, brandData);
        return res.status(200).json(response({ isSuccess: true, code: 200, message: 'Brand updated successfully' }, updatedBrand));
    } catch (error) {
        return res.status(400).json(errResponse({ isSuccess: false, code: 400, message: error.message }));
    }
}