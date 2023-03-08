import {useQuery} from "@tanstack/react-query";
import {queryKey} from "../../utils/queryKey";
import {getBlogList, getBlogPost} from "./data";

export const useBlogList = (page) => {
    return useQuery([queryKey.BLOG, page], () => getBlogList(page), {
        select: data => data.data
    });
}

export const useBlogPost = (pageUrl) => {
    return useQuery([queryKey.BLOG_POST, pageUrl], () => getBlogPost(pageUrl), {
        select: data => data.data
    })
}