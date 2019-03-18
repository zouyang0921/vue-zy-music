<template>
    <transition name="slide">
        <div class="playlist-container">
            <div class="playlist" v-show="!isLoading">
                <div class="list-detail-wrapper">
                    <div class="bg" :style="{'background-image': `url(${musicList ? musicList.coverImgUrl : ''})`}"></div>
                    <div class="list-detail">
                        <div class="list-cover">
                            <img :src="musicList.coverImgUrl">
                            <div class="listened-count">
                                <i class="listened-icon"></i>
                                {{musicList.playCount | formatNumber}}
                            </div>
                        </div>
                        <div class="list-title">
                            <h2>{{musicList.name}}</h2>
                            <div class="list-creator">
                                <img :src="musicList.creator && musicList.creator.avatarUrl">
                                <span class="name">{{musicList.creator && musicList.creator.nickname}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list-wrapper">
                    <div class="list-operation">
                        <div class="play">
                            <div class="play-inner" @click="playAll(songs)">
                                <i class="play-icon"></i>
                                <span class="play-all">播放全部</span>
                            </div>
                            <span class="play-count">(共{{musicList.trackCount}}首)</span>
                        </div>
                        <div class="favorite" v-if="musicList.subscribedCount > 0">{{musicList.subscribedCount}}人收藏</div>
                    </div>
                    <music-list :songs="songs" @select="selectItem"></music-list>
                    <div v-if="playerApparence === 'mini'" style="height: 55px;"></div>
                </div>
            </div>
            <loading v-show="isLoading"></loading>
        </div>
    </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { getPlaylistDetail } from '../../api/api'
import Loading from '../../components/common/loading/loading'
import MusicList from '../../components/music-list/music-list'
import { formatTopSongs } from '../../assets/js/song'

export default {
    data() {
        return {
            isLoading: false,
            musicList: {}, // 歌单
            songs: [],
        }
    },
    computed: {
        ...mapGetters([
            'currentMusic',
            'isPlaying',
            'playerApparence'
        ])
    },
    activated() {
        this.isLoading = true
        this._getPlaylistDetail(this.$route.params.id)
    },
    methods: {
        ...mapMutations({
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayingState: 'SET_PLAYING_STATE',
            setPlayerApparence: 'SET_PLAYER_APPARENCE'
        }),
        ...mapActions([
            'selectPlay',
            'playAll'
        ]),
        _getPlaylistDetail(id) {
            getPlaylistDetail(id).then(res => {
                if (res.data.code === 200) {
                    this.musicList = res.data.playlist
                    this.songs = formatTopSongs(res.data.playlist.tracks)
                    document.title = this.musicList.name
                    this.isLoading = false
                }
            })
        },
        goBack() {
            this.$router.go(-1)
        },
        selectItem(item, index) {
            if (item.id === this.currentMusic.id && !this.isPlaying) {
                this.setPlayingState(true)
                this.setPlayerApparence('normal')
            } else {
                this.selectPlay({
                    list: this.songs,
                    index
                })
            }
        }
    },
    filters: {
        formatNumber(num) {
            if (!num) return
            if (num > 10000) {
                num = Math.floor(num / 10000) + '万'
            }
            return num;
        }
    },
    components: {
        Loading,
        MusicList
    }
}
</script>

<style scoped lang="less">
@import '../../assets/style/variable.less';
@import '../../assets/style/mixin.less';

.slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
}
.slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
}
.playlist {
    .header {
        position: fixed;
        z-index: 30;
        width: 100%;
        height: 50px;
        background: rgba(0, 0, 0, .1);
        .back {
            position: absolute;
            left: 0;
            top: 4px;
            width: 20px;
            height: 22px;
            padding: 10px 12px;
            background: url(../../assets/images/icon_back.png) no-repeat center;
            background-size: 20px 22px;
        }
        .title {
            position: absolute;
            z-index: 30;
            top: 0;
            left: 12%;
            width: 76%;
            height: 50px;
            .single-line-overflow();
            text-align: center;
            line-height: 50px;
            font-size: 18px;
            color: #fff;
        }
    }
    .list-detail-wrapper {
        padding: 40px 0;
        .bg {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 226px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            filter: blur(20px);
        }
        .list-detail {
            display: flex;
            padding: 0 15px;
            .list-cover {
                position: relative;
                flex: 0 0 140px;
                width: 140px;
                height: 140px;
                border-radius: 4px;
                overflow: hidden;
                img {
                    width: 100%;
                }
                .listened-count {
                    position: absolute;
                    top: 0;
                    right: 6px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    font-size: 12px;
                    color: #fff;
                    .listened-icon {
                        width: 12px;
                        height: 12px;
                        margin-right: 2px;
                        background: url(../../assets/images/icon_listened.png) no-repeat;
                        background-size: contain;
                    }
                }
            }
            .list-title {
                flex: 1;
                margin-left: 14px;
                h2 {
                    line-height: 24px;
                    font-size: 18px;
                    font-weight: 500;
                    color: #fff;
                    margin-top: 14px;
                    margin-bottom: 18px;
                }
                .list-creator {
                    display: flex;
                    align-items: center;
                    img {
                        flex: 0 0 30px;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                    }
                    .name {
                        margin-left: 4px;
                        color: #c7c4c2;
                    }
                }
            }
        }
    }
    .list-wrapper {
        background: #fbfcfd;
        border-radius: 8px 8px 0 0;
        .list-operation {
            display: flex;
            height: 50px;
            line-height: 50px;
            .border-bottom();
            .play {
                flex: 0 0 68%;
                width: 68%;
                display: flex;
                align-items: center;
                .play-inner {
                    display: flex;
                    align-items: center;
                    .play-icon {
                        width: 24px;
                        height: 24px;
                        background: url(../../assets/images/icon_play_all.png) no-repeat;
                        background-size: contain;
                        margin: 0 8px 0 10px;
                    }
                    .play-all {
                        font-size: 16px;
                    }
                }
                .play-count {
                    color: #999;
                    margin-left: 4px;
                }
            }
            .favorite {
                flex: 0 0 32%;
                width: 32%;
                text-align: center;
                color: #999;
            }
        }
    }
    .song-list {
        .list-item {
            display: flex;
            margin: 0 6px;
            .item-index {
                flex: 0 0 30px;
                width: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                color: #999;
                margin-right: 8px;
            }
            .item-content {
                width: 88%;
                padding: 12px 10px 10px 0;
                .border-bottom();
                .item-title {
                    font-size: 16px;
                    .single-line-overflow();
                }
                .item-author, .item-alias {
                    .single-line-overflow();
                    color: #7d7e7f;
                    margin-top: 8px;
                }
                .item-author {
                    .inner-vertical-center();
                    .item-sq {
                        flex: 0 0 16px;
                        width: 16px;
                        height: 10px;
                        background: url(../../assets/images/icon_sq.png) no-repeat;
                        background-size: contain;
                        margin-right: 3px;
                    }
                    .space {
                        margin: 0 3px;
                    }
                }
            }
            &.active {
                .item-index {
                    color: @color-theme;
                }
                .item-content .item-title {
                    color: @color-theme;
                }
            }
        }
    }
}
</style>
