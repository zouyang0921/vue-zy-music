export function formatTime(time) {
    if (time) {
        let minutes = `${parseInt(time / 60)}`
        minutes = minutes.length > 1 ? minutes : `0${minutes}`
        let seconds = `${time % 60}`
        seconds = seconds.length > 1 ? seconds : `0${seconds}`
        return `${minutes}:${seconds}`
    }
    return '00:00'
}

// 解析歌词
export function parseLyric(lrc) {
    let lyrics = lrc.split('\n')
    let lrcObj = []
    for (let i = 0; i < lyrics.length; i++) {
        let lyric = decodeURIComponent(lyrics[i])
        let timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
        let timeRegExpArr = lyric.match(timeReg)
        if (!timeRegExpArr) continue
        let clause = lyric.replace(timeReg, '')
        for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
            let t = timeRegExpArr[k]
            let min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/:\d*/i)).slice(1))
            let time = min * 60 + sec
            if (clause !== '') {
                lrcObj.push({time: time, text: clause})
            }
        }
    }
    return lrcObj
}
