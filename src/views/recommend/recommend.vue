<template>
    <div class="recommend-container">
        <div class="recommend" v-if="!isLoading">
            <banner :banners="banners"></banner>
            <div class="recommend-module">
                <h2>推荐歌单<i class="icon-right"></i></h2>
                <div class="module-wrap clearfix">
                    <div class="module-item" v-for="item in recommendPlaylist.slice(0, 9)" 
                        :key="item.id"
                        @click="goPlaylist(item.id)">
                        <div class="item-img">
                            <img v-lazy="item.picUrl">
                            <div class="listened-count">
                                <i class="listened-icon"></i>
                                {{item.playCount | formatNumber}}
                            </div>
                        </div>
                        <div class="item-title">{{item.name}}</div>
                    </div>
                </div>
            </div>
            <div class="recommend-module">
                <h2>最新音乐<i class="icon-right"></i></h2>
                <div class="module-wrap clearfix">
                    <div class="module-item" v-for="(item, index) in recommendNewsong.slice(0, 9)"
                        :key="item.id"
                        @click="selectItem(index)">
                        <div class="item-img">
                            <img v-lazy="item.coverImage">
                        </div>
                        <div class="item-title">{{item.name}}</div>
                    </div>
                </div>
            </div>
            <div v-if="playerApparence === 'mini'" style="height: 55px;"></div>
        </div>
        <loading v-if="isLoading"></loading>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getBanner, getRecommendPlaylist, getRecommendNewsong } from '../../api/api'
import Banner from '../../components/banner/banner'
import Loading from '../../components/common/loading/loading'
import { formatSongs } from '../../assets/js/song'

export default {
    data() {
        return {
            isLoading: false,
            banners: [],
            recommendPlaylist: [],
            recommendNewsong: []
        }
    },
    computed: {
        ...mapGetters([
            'playerApparence'
        ])
    },
    created() {
        this.isLoading = true;
        const _getBanner = getBanner().then(res => {
            if (res.data.code === 200) {
                return res.data.banners
            }
        })
        const _getRecommendPlaylist = getRecommendPlaylist().then(res => {
            if (res.data.code === 200) {
                return res.data.result
            }
        })
        const _getRecommendNewsong = getRecommendNewsong().then(res => {
            if (res.data.code === 200) {
                return res.data.result
            }
        })
        Promise.all([_getBanner, _getRecommendPlaylist, _getRecommendNewsong])
        .then(([banners, playlist, songs]) => {
            this.banners = banners
            this.recommendPlaylist = playlist
            const newSongList = songs.map(item => item.song)
            this.recommendNewsong = formatSongs(newSongList)
            this.isLoading = false;
        })
    },
    methods: {
        ...mapActions([
            'selectPlay'
        ]),
        goPlaylist(id) {
            this.$router.push(`/playlist/${id}`)
        },
        selectItem(index) {
            this.selectPlay({
                list: this.recommendNewsong,
                index
            })
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
        Banner,
        Loading
    }
}
</script>

<style scoped lang="less">
@import '../../assets/style/variable.less';

.recommend {
    width: 97.3%;
    margin: 0 auto;
    .recommend-module {
        margin-top: 6px;
        h2 {
            display: flex;
            height: 44px;
            align-items: center;
            font-size: 16px;
            font-weight: 500;
            .icon-right {
                width: 12px;
                height: 12px;
                background: url(../../assets/images/icon_right.png) no-repeat;
                background-size: contain;
                margin-left: 4px;
            }
        }
        .module-wrap {
            .module-item {
                float: left;
                width: 32.75%;
                margin-right: 3px;
                margin-bottom: 16px;
                &:nth-child(3n) {
                    margin-right: 0;
                }
                .item-img {
                    position: relative;
                    height: 32.75%;
                    background: @color-background;
                    border-radius: 4px;
                    overflow: hidden;
                    img {
                        width: 100%;
                    }
                    .listened-count {
                        position: absolute;
                        bottom: 0;
                        right: 6px;
                        height: 16px;
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
                .item-title {
                    min-height: 32px;
                    padding: 4px 0;
                    font-size: 12px;
                    line-height: 16px;
                }
            }
        }
    }
}
</style>
