import { playMode } from '../assets/js/config'
import { getHistoryList } from '../assets/js/storage'

const state = {
    playlist: [], // 播放列表
    currentIndex: -1, // 当前音乐的索引
    isPlaying: false, // 播放状态
    playMode: playMode.listLoop, // 播放模式，默认列表循环
    playHistory: getHistoryList() || [], // 播放历史
    playerApparence: '', // 播放器样式
    song: {
        id: -1,
        info: {
            name: '',
            artist: '',
            coverUrl: ''
        },
        url: '',
        duration: 0,
        currentTime: 0
    },
}

export default state
