export default {
    playlist(state) {
        return state.playlist
    },
    currentIndex(state) {
        return state.currentIndex
    },
    currentMusic(state) {
        return state.playlist[state.currentIndex] || {}
    },
    isPlaying(state) {
        return state.isPlaying
    },
    playMode(state) {
        return state.playMode
    },
    playHistory(state) {
        return state.playHistory
    },
    playerApparence(state) {
        return state.playerApparence
    },
}
