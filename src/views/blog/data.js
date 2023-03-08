import axios from "axios";

export const getBlogList = (page) => {
    return axios.get('https://vmadminapi.megaverse.today/page/blog-list', {
        params: {
            page
        }
    }).then(res => res.data)
}

export const getBlogPost = (postUrl) => {
    return axios.get('https://vmadminapi.megaverse.today/page/read-blog/' + postUrl)
        .then(res => res.data)
}