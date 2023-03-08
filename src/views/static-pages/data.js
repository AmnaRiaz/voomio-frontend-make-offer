import axios from "axios";

export const getPageData = (url) => {
    return axios.get('https://vmadminapi.megaverse.today/page/url/' + url).then(res => res.data)
}