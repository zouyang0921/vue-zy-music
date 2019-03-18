import axios from 'axios'
import { URL } from '../assets/js/config'

axios.defaults.baseURL = URL

// banner
export function getBanner() {
    return axios.get('/banner')
}

// 推荐歌单
export function getRecommendPlaylist() {
    return axios.get('/personalized')
}

// 推荐新音乐
export function getRecommendNewsong() {
    return axios.get('/personalized/newsong')
}

// 所有榜单
export function getTopList() {
    return axios.get('/toplist/detail')
}

// 热门搜索列表
export function getHotSearchList() {
    return axios.get('/search/hot')
}

// 搜索
export function searchAll(keywords) {
    return axios.get(`/search?keywords=${keywords}`)
}

// 获取歌单详情
export function getPlaylistDetail(id) {
    return axios.get(`/playlist/detail?id=${id}`)
}

// 获取歌曲详情
export function getMusicDetail(id) {
    return axios.get(`/song/detail?ids=${id}`)
}

// 获取歌曲 url
export function getSongUrl(id) {
    return axios.get(`/song/url?id=${id}`)
}

// 检查音乐是否可以播放
export function checkMusic(id) {
    return axios.get(`/check/music?id=${id}`)
}

// 获取歌词
export function getLyric(id) {
    return axios.get(`/lyric?id=${id}`)
}
