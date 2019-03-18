import * as types from './mutation-types'
import { updateHistoryList, clearHistoryList } from '../assets/js/storage'

export default {
    // 选择播放（更新整个播放列表）
    selectPlay({commit}, {list, index}) {
        commit(types.SET_PLAYLIST, list)
        commit(types.SET_CURRENT_INDEX, index)
        commit(types.SET_PLAYING_STATE, true)
        commit(types.SET_PLAYER_APPARENCE, 'normal')
    },
    // 选择播放（插入一条到播放列表）
    insertPlay({commit, state}, music) {
        let list = [...state.playlist]
        let index = list.findIndex(item => {
            return item.id === music.id
        })
        // 当前播放列表有待插入的音乐时，直接改变当前播放音乐的索引值
        if (index > -1) {
            commit(types.SET_CURRENT_INDEX, index)
        } else {
            list.unshift(music)
            commit(types.SET_PLAYLIST, list)
            commit(types.SET_CURRENT_INDEX, 0)
        }
        commit(types.SET_PLAYING_STATE, true)
        commit(types.SET_PLAYER_APPARENCE, 'normal')
    },
    // 播放全部
    playAll({commit}, list) {
        commit(types.SET_PLAYLIST, list)
        commit(types.SET_CURRENT_INDEX, 0)
        commit(types.SET_PLAYING_STATE, true)
        commit(types.SET_PLAYER_APPARENCE, 'normal')
    },
    // 设置播放历史
    setPlayHistory({commit}, music) {
        commit(types.SET_PLAY_HISTORY, updateHistoryList(music))
    },
    // 删除一条播放历史
    removeItemFromPlayHistory() {
        // TODO
    },
    // 清空播放历史
    clearPlayHistory({commit}) {
        commit(types.SET_PLAY_HISTORY, clearHistoryList())
    }
}
