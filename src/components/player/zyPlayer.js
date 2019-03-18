import { playMode } from '../../assets/js/config'

const zyPlayer = {
    initAudio(that) {
        const audio = that.audio

        // 音频缓冲事件
        audio.onprogress = () => {
            try {
                if (audio.buffered.length > 0) {
                    const duration = that.currentMusic.duration
                    let buffered = 0
                    audio.buffered.end(0)
                    buffered = audio.buffered.end(0) > duration ? duration : audio.buffered.end(0)
                    that.bufferedProgress = buffered / duration
                }
            } catch (e) {
                console.log(e)
            }
        }

        // 开始播放音乐
        audio.onplay = () => {
            let timer
            clearTimeout(timer)
            timer = setTimeout(() => {
                that.musicReady = true
            }, 100)
        }

        // 获取当前播放时间
        audio.ontimeupdate = () => {
            that.currentTime = audio.currentTime
        }

        // 当前音乐播放完毕
        audio.onended = () => {
            if (that.playMode === playMode.singleLoop) {
                that.loop()
            } else {
                that.next()
            }
        }

        // 音乐播放出错
        audio.onerror = () => {
            alert('当前音乐不可播放，已自动播放下一首')
            that.next()
        }

        // 音乐进度拖动大于加载时 重载音乐
        audio.onstalled = () => {
            audio.load()
            that.setPlayingState(false)
            let timer
            clearTimeout(timer)
            timer = setTimeout(() => {
                that.setPlayingState(true)
            }, 10)
        }

        // 将能播放的音乐加入播放历史
        audio.oncanplay = () => {
            if (that.playHistory.length === 0 || that.currentMusic.id !== that.playHistory[0].id) {
                that.setPlayHistory(that.currentMusic)
            }
        }
    }
}

export default zyPlayer
