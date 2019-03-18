<template>
    <div class="search-container">
        <div class="search-header">
            <div class="search">
                <i class="search-icon"></i>
                <input class="search-input" type="text"
                    v-model="keyword"
                    placeholder="输入关键字搜索"
                    @keyup="handleKeyup($event)"
                    ref="input"
                    v-focus>
                <div class="search-clear" v-if="keyword" @click="clearInput()">
                    <div>×</div>
                </div>
            </div>
            <a class="cancel" @click="goBack()">取消</a>
        </div>
        <div class="hot-search" v-show="!keyword">
            <h3 class="title">热门搜索</h3>
            <div class="content clearfix">
                <span class="item" v-for="item in hots" :key="item.first" @click="searchByHotItem(item.first)">{{item.first}}</span>
            </div>
        </div>
        <div class="result-container">
            <loading v-if="isLoading"></loading>
            <div v-else>
                <music-list v-if="searchResult && searchResult.length > 0"
                    :songs="searchResult"
                    :need-mark-word="true"
                    :keyword="keyword"
                    :need-index="false"
                    @select="selectItem">
                </music-list>
                <div class="no-result" v-if="noResult">没有匹配到搜索结果</div>
            </div>            
        </div>
    </div>
</template>

<script>
import { getHotSearchList, searchAll, getMusicDetail } from '../../api/api'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import MusicList from '../../components/music-list/music-list'
import Loading from '../../components/common/loading/loading'
import { formatSongs } from '../../assets/js/song'

export default {
    data() {
        return {
            isLoading: false,
            keyword: '',
            hots: [],
            searchResult: [],
            noResult: false
        }
    },
    activated() {
        this.$refs.input.focus()
        this._getHotSearchList()
    },
    computed: {
        ...mapGetters([
            'currentMusic',
            'isPlaying',
        ])
    },
    methods: {
        ...mapMutations({
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayingState: 'SET_PLAYING_STATE',
            setPlayerApparence: 'SET_PLAYER_APPARENCE'
        }),
        ...mapActions([
            'insertPlay'
        ]),
        _getHotSearchList() {
            getHotSearchList().then(res => {
                if (res.data.code === 200) {
                    this.hots = res.data.result.hots
                }
            })
        },
        _searchAll(keyword) {
            if (!this.keyword) return
            this.isLoading = true
            this.$refs.input.blur()
            searchAll(keyword).then(res => {
                this.isLoading = false
                if (res.data.code === 200) {
                    const songs = res.data.result.songs
                    if (songs && songs.length > 0) {
                        this.noResult = false
                        this.searchResult = formatSongs(songs)
                    } else {
                        this.noResult = true
                    }
                }
            })
        },
        getMusicImage(id) {
            return getMusicDetail(id).then(res => {
                if (res.data.code === 200) {
                    return res.data.songs[0].al.picUrl
                }
            })
        },
        handleKeyup(event) {
            if (event.keyCode === 13) {
                this._searchAll(this.keyword)
            }
        },
        // 点击热门搜索 item
        searchByHotItem(keyword) {
            this.keyword = keyword
            this._searchAll(this.keyword)
        },
        clearInput() {
            this.clearData()
            this.$refs.input.focus()
        },
        clearData() {
            this.keyword = ''
            this.searchResult = []
        },
        goBack() {
            this.$router.go(-1)
            this.clearData()
        },
        async selectItem(music) {
            if (music.id !== this.currentMusic.id) {
                let image = await this.getMusicImage(music.id)
                music.coverImage = image
                this.insertPlay(music)
            } else {
                this.setPlayingState(true)
                this.setPlayerApparence('normal')
            }
        }
    },
    directives: {
        focus: {
            inserted(el) {
                el.focus()
            }
        }
    },
    components: {
        MusicList,
        Loading
    }
}
</script>

<style scoped lang="less">
@import '../../assets/style/variable.less';
@import '../../assets/style/mixin.less';

.search-container {
    .search-header {
        display: flex;
        height: 50px;
        align-items: center;
        .border-bottom();
        .search {
            flex: 1;
            height: 30px;
            margin: 0 12px;
            background: @color-background;
            border-radius: 15px;
            display: flex;
            align-items: center;
            .search-icon {
                flex: 0 0 14px;
                width: 14px;
                height: 14px;
                margin-left: 10px;
                background: url(../../assets/images/icon_search.png) no-repeat;
                background-size: contain;
            }
            .search-input {
                flex: 1;
                margin-left: 6px;
                height: 30px;
                box-sizing: border-box;
                padding: 5px 0;
                line-height: 20px;
                background: transparent;
                font-size: 14px;
                color: #666;
                &::placeholder {
                    color: #bdbebe;
                }
            }
            .search-clear {
                flex: 0 0 14px;
                width: 14px;
                height: 14px;
                margin-left: 5px;
                padding: 3px 10px;
                div {
                    background: rgba(0, 0, 0, .2);
                    border-radius: 50%;
                    width: 14px;
                    height: 14px;
                    line-height: 13px;
                    text-align: center;
                    font-size: 13px;
                    color: #fff;
                }
            }
        }
        .cancel {
            margin: 0 12px 0 4px;
            font-size: 16px;
        }
    }
    .hot-search {
        padding: 20px 0;
        .title {
            padding-left: 10px;
            font-size: 16px;
            font-weight: 500;
        }
        .content {
            margin-top: 15px;
            padding-left: 6px;
            padding-right: 10px;
            .item {
                float: left;
                height: 30px;
                line-height: 30px;
                padding: 0 15px;
                margin: 4px;
                background: #eeeff0;
                border-radius: 15px;
                font-size: 13px;
                &:active {
                    background: #bcbdbe;
                    color: #fff;
                }
            }
        }
    }
    .search-result {
        .result-item {
            margin: 0 6px;
            padding: 12px 0 10px 0;
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
            .mark {
                color: @color-keyword !important;
            }
        }
    }
    .no-result {
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
}
</style>
