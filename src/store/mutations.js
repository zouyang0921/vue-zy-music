import * as types from './mutation-types'

const mutations = {
    [types.SET_PLAYLIST](state, playlist) {
        state.playlist = playlist
    },
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index
    },
    [types.SET_PLAYING_STATE](state, status) {
        state.isPlaying = status
    },
    [types.SET_PLAY_HISTORY](state, historyList) {
        state.playHistory = historyList
    },
    [types.SET_PLAYER_APPARENCE](state, apparence) {
        state.playerApparence = apparence
    },
}

export default mutations
