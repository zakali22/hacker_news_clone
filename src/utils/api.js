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

export const fetchNewStories = async () => {
    const res = await axios.get("https://hacker-news.firebaseio.com/v0/newstories.json")
    const storiesArrIds = res.data.slice(0, 35)
    const storiesArr = await loopOverIds(storiesArrIds);
    return storiesArr
}


export const fetchUserData = async (userId) => {
    const res = await axios.get(`https://hacker-news.firebaseio.com/v0/user/${userId}.json`)
    return res.data
}

export const fetchUserPosts = async (userData) => {
    const postIds = userData.submitted.slice(0,30);
    let posts = await loopOverIds(postIds)
    posts = posts.filter(post => (
        post.type === 'story'
    ))
    return posts;
}

export const fetchPostComments = async (post) => {
    if(!post.kids) return null
    const comments = await loopOverIds(post.kids.slice(0, 10))
    console.log(comments)
}