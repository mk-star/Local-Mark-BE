import { postDetailResponseDTO, postsResponseDTO } from "../dtos/post.dto.js";
import { 
    getPreviewPostDetail, 
    getPreviewPosts } from "../models/post.dao.js";
import {getCommentNum} from "../models/comment.dao.js";
import {getLikeNum} from "../models/Like.dao.js";
import {getBrandInfoByUserId, getBrandInfos} from "../models/brand.dao.js";

export const getPosts = async(category, page) => {

    const result = await getPreviewPosts(category, page)

    return postsResponseDTO(result.posts, result.totalPage);

}

export const getPostDetail = async(postId) => {

    console.log(postId);

    const { post , images } = await getPreviewPostDetail(postId);
    console.log("post detail:", post);
    console.log("images:", images);
    const userId = post[0]?.user_id;
    console.log("user:",userId)
    // 비동기 함수들을 병렬로 실행
    const [commentNum, likeNum, brandInfo] = await Promise.all([
        getCommentNum(postId),
        getLikeNum(postId),
        getBrandInfoByUserId(userId)
    ]);

    return postDetailResponseDTO(post, images, commentNum, likeNum, brandInfo);
}

