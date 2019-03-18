<template>
    <div class="rank-container">
        <div class="rank" v-if="!isLoading">
            <div class="rank-module">
                <h2 class="rank-title">官方榜</h2>
                <div class="rank-item" v-for="rankItem in officialTopList" :key="rankItem.id" @click="goPlaylist(rankItem.id)">
                    <div class="rank-item-cover">
                        <img v-lazy="rankItem.coverImgUrl">
                        <span class="rank-item-desc">{{rankItem.updateFrequency}}</span>
                    </div>
                    <ul class="rank-item-list">
                        <li v-for="(listItem, listIndex) in rankItem.tracks" :key="listItem.first">{{listIndex + 1}}. {{listItem.first}} - {{listItem.second}}</li>
                    </ul>
                </div>
            </div>
            <div class="rank-module global-rank">
                <h2 class="rank-title">全球榜</h2>
                <div class="rank-list">
                    <div class="list-item" v-for="rankItem in globalTopList" :key="rankItem.id" @click="goPlaylist(rankItem.id)">
                        <div class="item-img">
                            <img v-lazy="rankItem.coverImgUrl">
                            <span class="rank-item-desc">{{rankItem.updateFrequency}}</span>
                        </div>
                        <div class="item-title">{{rankItem.name}}</div>
                    </div>
                </div>
            </div>
        </div>
        <loading v-if="isLoading"></loading>
    </div>
</template>

<script>
import { getTopList } from '../../api/api'
import Loading from '../../components/common/loading/loading'

export default {
    data() {
        return {
            isLoading: false,
            officialTopList: [],
            globalTopList: []
        }
    },
    created() {
        this.isLoading = true
        const _getTopList = getTopList().then(res => {
            if (res.data.code === 200) {
                return res.data.list
            }
        })
        _getTopList.then(list => {
            if (list && list.length > 0) {
                list.map(item => {
                    if (item.ToplistType) {
                        this.officialTopList.push(item)
                    } else {
                        this.globalTopList.push(item)
                    }
                })
            }
            this.isLoading = false
        })
    },
    methods: {
        goPlaylist(id) {
            this.$router.push(`/playlist/${id}`)
        }
    },
    components: {
        Loading
    }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/variable.less';

.rank {
    margin: 0 5px;
    padding-bottom: 20px;
    .rank-module {
        .rank-title {
            height: 44px;
            line-height: 44px;
            font-size: 16px;
            font-weight: 500;
        }
        .rank-item {
            display: flex;
            margin-bottom: 4px;
            &:last-child {
                margin-bottom: 0;
            }
            .rank-item-cover {
                position: relative;
                width: 34.25%;
                height: 34.25%;
                background: @color-background;
                border-radius: 4px;
                overflow: hidden;
                margin-right: 10px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .rank-item-list {
                width: 61.4%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                border-bottom: .5px solid rgba(0, 0, 0, .1);
                >li {
                    line-height: 32px;
                    color: #646566;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
        .rank-item-desc {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 0 6px;
            box-sizing: border-box;
            background: linear-gradient(rgba(0, 0, 0, 0) 1%, rgba(0, 0, 0, .1) 70%);
            line-height: 32px;
            font-size: 12px;
            color: #fff;
        }
        .rank-list {
            .list-item {
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
    .global-rank {
        margin-top: 20px;
    }
}
</style>