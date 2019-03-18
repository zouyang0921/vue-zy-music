<template>
    <div class="player-container" v-show="playlist.length > 0">
        <!-- 全屏播放器 -->
        <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
            <div class="normal-player" v-show="playerApparence === 'normal'" ref="playerCoverWrap">
                <div class="player-bg" v-if="currentMusic.coverImage" :style="{'background-image': `url(${currentMusic.coverImage})`}"></div>
                <div class="player-bg" v-else :style="{'background-image': `url(../../assets/images/default_cover.jpg)`}"></div>
                <div class="header-mask"></div>
                <div class="header">
                    <i class="back" @click="goBack"></i>
                    <div class="title">
                        <h1>{{currentMusic.name}}</h1>
                        <div class="artist">{{currentMusic.artist}}</div>
                    </div>
                </div>
                <div class="player-main" @click="switchCurrentShow">
                    <div class="player-cover-container" v-show="!lyricVisible">
                        <img class="cover-rod" :class="[isPlaying ? 'active' : '']" src="../../assets/images/rod.png">
                        <div class="cover-wrap" :class="[isPlaying ? 'active' : '']">
                            <img class="cover-cd" src="../../assets/images/cd.png">
                            <div class="player-cover" v-if="currentMusic.coverImage" :style="{'background-image': `url(${currentMusic.coverImage})`}"></div>
                            <div class="player-cover" v-else :style="{'background-image': `url(../../assets/images/default_cover.jpg)`}"></div>
                        </div>
                    </div>
                    <div class="player-lyric" v-show="lyricVisible" ref="lyricList">
                        <div class="lyric-wrapper" v-if="lyric" :style="lyricPosTop">
                            <p v-if="!currentMusic.id">还没有播放音乐哦！</p>
                            <p v-else-if="noLyric">暂无歌词！</p>
                            <template v-else-if="lyric.length > 0">
                                <p class="text" :class="{'current': lyricIndex === index}" v-for="(item, index) in lyric" :key="index">{{item.text}}</p>
                            </template>
                            <p v-else>歌词加载失败！</p>
                        </div>
                    </div>
                </div>
                <div class="player-controller">
                    <div class="progress-wrap">
                        <div class="current-time">{{currentTime | formatTime}}</div>
                        <div class="progress-bar" ref="progressBar" @click="dragPlay">
                            <div class="progress-bar-played" :style="{width: playedScale}" ref="playedProgress"></div>
                            <div class="progress-bar-point"
                                :style="{left: playedScale}"
                                @touchstart.prevent="progressTouchStart"
                                @touchmove.prevent="progressTouchMove"
                                @touchend="progressTouchEnd"
                                ref="progressPoint">
                            </div>
                        </div>
                        <div class="total-time">{{currentMusic.duration | formatTime}}</div>
                    </div>
                    <div class="controller">
                        <div class="controller-btn prev" @click="prev"></div>
                        <div class="controller-btn" :class="[isPlaying ? 'play': 'pause']" @click="play"></div>
                        <div class="controller-btn next" @click="next"></div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 小播放器 -->
        <div class="mini-player" v-show="playerApparence === 'mini'" @click="openNormalPlayer">
            <div class="song-cover" :class="[isPlaying ? 'active' : '']">
                <img v-if="currentMusic.coverImage" :src="currentMusic.coverImage">
                <img v-else src="../../assets/images/default_cover.jpg">
            </div>
            <div class="song-text">
                <h4 class="song-name">{{currentMusic.name}}</h4>
                <div class="song-artist">{{currentMusic.artist}}</div>
            </div>
            <div class="operate-btn" :class="[isPlaying ? 'play' : 'pause']" @click.stop="play"></div>
            <div class="playlist"></div>
        </div>
        <audio :src="currentMusic.url" ref="audio"></audio>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import animations from 'create-keyframe-animation'
import zyPlayer from './zyPlayer.js'
import { getLyric } from '../../api/api'
import { parseLyric } from '../../assets/js/util'

export default {
    data() {
        return {
            bufferedProgress: 0, // 音乐缓冲进度
            musicReady: false, // 是否可以使用播放器
            currentTime: 0, // 播放器当前的时间
            lyricVisible: false,
            lyric: [], // 歌词
            noLyric: false,
            lyricIndex: 0,
            lyricTop: 0,
            audio: null,
        }
    },
    computed: {
        ...mapGetters([
            'playlist',
            'isPlaying',
            'currentIndex',
            'currentMusic',
            'playMode',
            'playerApparence',
            'playHistory'
        ]),
        playedScale() {
            if (this.currentMusic.duration !== undefined && this.currentTime !== undefined) {
                return `${parseInt(this.currentTime / this.currentMusic.duration * 100)}%`
            }
            return '0%'
        },
        lyricPosTop() {
            return `transform :translate3d(0, ${-32 * (this.lyricIndex - this.lyricTop - 1)}px, 0)`
        }
    },
    methods: {
        ...mapMutations({
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayingState: 'SET_PLAYING_STATE',
            setPlayerApparence: 'SET_PLAYER_APPARENCE'
        }),
        ...mapActions([
            'setPlayHistory'
        ]),
        enter(el, done) {
            const { x, y, scale } = this._getPosAndScale()
            let animation = {
                0: {
                    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
                },
                60: {
                    transform: 'translate3d(0, 0, 0) scale(1.1)'
                },
                100: {
                    transform: 'translate3d(0, 0, 0) scale(1)'
                }
            }
            animations.registerAnimation({
                name: 'move',
                animation,
                presets: {
                    duration: 400,
                    easing: 'linear'
                }
            })
            animations.runAnimation(this.$refs.playerCoverWrap, 'move', done)
        },
        afterEnter() {
            animations.unregisterAnimation('move')
            this.$refs.playerCoverWrap.style.animation = ''
        },
        leave(el, done) {
            this.$refs.playerCoverWrap.style.transition = 'all 0.4s'
            const { x, y, scale } = this._getPosAndScale()
            this.$refs.playerCoverWrap.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
            this.$refs.playerCoverWrap.addEventListener('transitionend', done)
        },
        afterLeave() {
            this.$refs.playerCoverWrap.style.transition = ''
            this.$refs.playerCoverWrap.style.transform = ''
        },
        _getPosAndScale() {
            const targetWidth = 40
            const paddingLeft = 40
            const paddingBottom = 30
            const paddingTop = 80
            const width = window.innerWidth * 0.8
            const scale = targetWidth / width
            const x = -(window.innerWidth / 2 - paddingLeft)
            const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
            return { x, y, scale }
        },
        goBack() {
            this.setPlayerApparence('mini')
        },
        openNormalPlayer() {
            this.setPlayerApparence('normal')
        },
        // 播放/暂停
        play() {
            if (!this.musicReady) {
                this.setPlayingState(false)
                return
            }
            this.setPlayingState(!this.isPlaying)
        },
        // 播放上一首
        prev() {
            if (!this.musicReady) {
                return
            }
            if (this.playlist.length === 1) {
                this.loop()
            } else {
                let index = this.currentIndex - 1
                if (index < 0) {
                    index = this.playlist.length - 1
                }
                this.setCurrentIndex(index)
                if (!this.isPlaying && this.musicReady) {
                    this.setPlayingState(true)
                }
                this.musicReady = false
            }
        },
        // 播放下一首(默认列表循环)
        next() {
            if (!this.musicReady) {
                return
            }
            if (this.playlist.length === 1) {
                this.loop()
            } else {
                let index = this.currentIndex + 1
                if (index === this.playlist.length) {
                    index = 0
                }
                if (!this.isPlaying && this.musicReady) {
                    this.setPlayingState(true)
                }
                this.setCurrentIndex(index)
                this.musicReady = false
            }
        },
        loop() {
            this.audio.currentTime = 0
            this.audio.play()
            this.setPlayingState(true)
            if (this.lyric.length > 0) {
                this.lyricIndex = 0
            }
        },
        progressTouchStart(e) {
            this.touch.initiated = true
            this.touch.startX = e.touches[0].pageX
            this.touch.left = this.$refs.playedProgress.clientWidth
        },
        progressTouchMove(e) {
            if (!this.touch.initiated) {
                return
            }
            const deltaX = e.touches[0].pageX - this.touch.startX
            const offsetWidth = Math.min(this.$refs.progressBar.clientWidth, Math.max(0, this.touch.left + deltaX))
            const percentage = (offsetWidth / this.$refs.progressBar.clientWidth * 100).toFixed(2) + '%'
            this.$refs.playedProgress.style.width = percentage
            this.$refs.progressPoint.style.left = percentage
        },
        progressTouchEnd() {
            this.touch.initiated = false
            const percent = this.$refs.playedProgress.clientWidth / this.$refs.progressBar.clientWidth
            this.audio.currentTime = this.currentMusic.duration * percent
            if (!this.isPlaying) {
                this.togglePlaying()
            }
        },
        dragPlay(e) {
            const left = this.$refs.progressBar.offsetLeft
            const percent = ((e.pageX - left) / this.$refs.progressBar.clientWidth).toFixed(4)
            this.$refs.playedProgress.style.width = percent * 100 + '%'
            this.$refs.progressPoint.style.left = percent * 100 + '%'
            this.audio.currentTime = this.currentMusic.duration * percent
            if (!this.isPlaying) {
                this.togglePlaying()
            }
        },
        togglePlaying() {
            if (!this.musicReady) {
                return
            }
            this.setPlayingState(!this.isPlaying)
        },
        switchCurrentShow() {
            this.lyricVisible = !this.lyricVisible
        },
        _getLyric(id) {
            getLyric(id).then(res => {
                if (res.data.code === 200) {
                    if (res.data.nolyric) {
                        this.noLyric = true
                    } else {
                        this.noLyric = false
                        this.lyric = parseLyric(res.data.lrc.lyric)
                    }
                    this.audio.play()
                }
            }).catch(() => {
                this.lyric = null
                this.lyricIndex = 0
            })
        }
    },
    filters: {
        formatTime(time) {
            if (time) {
                let minutes = `${parseInt(time / 60)}`
                minutes = minutes.length > 1 ? minutes : `0${minutes}`
                let seconds = `${parseInt(time % 60)}`
                seconds = seconds.length > 1 ? seconds : `0${seconds}`
                return `${minutes}:${seconds}`
            }
            return '00:00'
        }
    },
    created() {
        this.touch = {}
    },
    mounted() {
        this.$nextTick(() => {
            this.audio = this.$refs.audio
            zyPlayer.initAudio(this)
        })
    },
    watch: {
        currentMusic(newMusic, oldMusic) {
            if (!newMusic.id) {
                this.lyric = []
                return
            }
            if (newMusic.id === oldMusic.id) {
                return
            }
            this.audio.src = newMusic.url
            this.lyricIndex = this.currentTime = this.bufferedProgress = 0
            try {
                this.audio.play()
            } catch(err) {
                console.log(err)
            }
            this.$nextTick(() => {
                this._getLyric(newMusic.id)
            })
        },
        isPlaying(newPlaying) {
            this.$nextTick(() => {
                newPlaying ? this.audio.play() : this.audio.pause()
                this.musicReady = true
            })
        },
        currentTime(newTime) {
            if (this.nolyric) {
                return
            }
            let lyricIndex = 0
            for (let i = 0; i < this.lyric.length; i++) {
                if (newTime > this.lyric[i].time) {
                    lyricIndex = i
                }
            }
            this.lyricIndex = lyricIndex
        }
    }
}
</script>

<style scoped lang="less">
@import '../../assets/style/variable.less';
@import '../../assets/style/mixin.less';
@import '../../assets/style/animation.less';

.slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
}
.slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
}
.normal-player {
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
    .player-bg {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/images/default_cover.jpg);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        filter: blur(20px);
        opacity: 0.8;
    }
    .header-mask {
        position: absolute;
        z-index: 100;
        left: 0;
        top: 0;
        width: 100%;
        height: 50px;
        background: rgba(0, 0, 0, .1);
        filter: blur(20px);
    }
    .header {
        position: absolute;
        z-index: 102;
        width: 100%;
        height: 50px;
        .back {
            position: absolute;
            left: 0;
            top: 3px;
            width: 24px;
            height: 24px;
            padding: 10px;
            background: url(../../assets/images/icon_down.png) no-repeat center;
            background-size: 24px 24px;
        }
        .title {
            position: absolute;
            top: 0;
            left: 12%;
            width: 76%;
            height: 50px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            color: #fff;
            h1 {
                .single-line-overflow();
                font-size: 18px;
                margin-bottom: 4px;
            }
            .artist {
                .single-line-overflow();
            }
        }
    }
    .player-main {
        position: fixed;
        z-index: 102;
        top: 50px;
        bottom: 170px;
        left: 0;
        right: 0;
        width: 100%;
    }
    .player-cover-container {
        position: relative;
        padding: 80px 0 40px 0;
        overflow: hidden;
        .cover-rod {
            position: absolute;
            z-index: 2;
            top: -2.5%;
            left: 50%;
            width: 30%;
            margin-left: -5%;
            transform-origin: 4% 4%;
            transform: rotate(-30deg);
            transition: transform .5s ease;
            &.active {
                transform: rotate(-2deg);
            }
        }
        .cover-wrap {
            position: relative;
            width: 79%;
            margin: 0 auto;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, .2);
            animation: coverRotate 10s linear infinite paused;
            .cover-cd {
                width: 100%;
            }
            .player-cover {
                position: absolute;
                z-index: -1;
                left: 50%;
                top: 50%;
                width: 64%;
                height: 64%;
                margin-left: -32%;
                margin-top: -32%;
                border-radius: 50%;
                background-image: url(../../assets/images/default_cover.jpg);
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
            }
            &.active {
                animation-play-state: running;
            }
        }
    }
    .player-lyric {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .lyric-wrapper {
            width: 80%;
            margin: 0 auto;
            overflow: auto;
            text-align: center;
            .text {
                line-height: 32px;
                color: rgba(255, 255, 255, .7);
                font-weight: 300;
                &.current {
                    color: #fff;
                    font-weight: 500;
                }
            }
        }
    }
    .player-controller {
        position: fixed;
        z-index: 103;
        bottom: 0;
        left: 0;
        width: 100%;
        .progress-wrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;
            color: #fff;
            .current-time, .total-time {
                width: 15%;
                text-align: center;
                font-size: 12px;
            }
            .progress-bar {
                position: relative;
                flex: 0 0 66%;
                width: 66%;
                height: 2px;
                border-radius: 1px;
                background: #f6f6f6;
                .progress-bar-played {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: @color-theme;
                }
                .progress-bar-point {
                    position: absolute;
                    left: 0;
                    top: -7px;
                    width: 5px;
                    height: 5px;
                    background: @color-theme;
                    border: 5px solid #f6f6f6;
                    border-radius: 50%;
                }
            }
        }
        .controller {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 8% 10%;
            .controller-btn {
                flex: 0 0 60px;
                width: 60px;
                height: 60px;
            }
            .prev {
                background: url(../../assets/images/icon_prev.png) no-repeat center;
                background-size: 60% 60%;
            }
            .play {
                background: url(../../assets/images/icon_play.png) no-repeat center;
                background-size: 90%;
            }
            .pause {
                background: url(../../assets/images/icon_pause.png) no-repeat center;
                background-size: 90%;
            }
            .next {
                background: url(../../assets/images/icon_next.png) no-repeat center;
                background-size: 60% 60%;
            }
        }
    }
}
.mini-player {
    position: fixed;
    z-index: 103;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    box-sizing: border-box;
    padding: 0 12px;
    display: flex;
    align-items: center;
    background: #fff;
    box-shadow: 0 -1px 4px 0px rgba(0, 0, 0, .08);
    .song-cover {
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        background: @color-background;
        margin-right: 12px;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            animation: coverRotate 5s linear infinite paused;
        }
        &.active {
            img {
                animation-play-state: running;
            }
        }
    }
    .song-text {
        flex: 1;
        max-width: 55%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .song-name {
            .single-line-overflow();
        }
        .song-artist {
            font-size: 12px;
            color: #999;
            margin-top: 6px;
            .single-line-overflow();
        }
    }
    .operate-btn {
        flex: 0 0 34px;
        width: 34px;
        height: 34px;
        margin-left: 10px;
    }
    .play {
        background: url(../../assets/images/icon_mini_play.png) no-repeat center;
        background-size: contain;
    }
    .pause {
        background: url(../../assets/images/icon_mini_pause.png) no-repeat center;
        background-size: contain;
    }
    .playlist {
        flex: 0 0 32px;
        width: 32px;
        height: 32px;
        background: url(../../assets/images/icon_mini_playlist.png) no-repeat center;
        background-size: contain;
        margin-left: 20px;
    }
}
</style>
