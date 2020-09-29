import axios from "axios"

const loopOverIds = async (arr) => {
    let newsArr = [];
    for(const id of arr){
        let newsItem = await fetchPostItem(id)
        newsArr.push(newsItem)
    }
    return newsArr
}

const fetchPostItem = async (id) => {
    const res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    return res.data
}


/** Exported functions */

export const fetchTopNews = async () => {
    const res = await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json")
    const newsArrIds = res.data.slice(0, 35)
    const newsArr = await loopOverIds(newsArrIds);
    return newsArr
}

export const fetchUserData = async (userId) => {
    const res = await axios.get(`https://hacker-news.firebaseio.com/v0/user/${userId}.json`)
    return res.data
}

export const fetchUserPosts = async (userData) => {
    const postIds = userData.submitted.slice(0,15);
    const posts = await loopOverIds(postIds)
    return posts;
}

export const fetchPostComments = async (post) => {
    if(!post.kids) return null
    const comments = await loopOverIds(post.kids.slice(0, 10))
    console.log(comments)
}