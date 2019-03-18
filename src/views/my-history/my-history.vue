<template>
    <div class="history-container">
        <div class="content" v-if="playHistory && playHistory.length > 0">
            <div class="header">
                <div class="play" @click="playAll(playHistory)">
                    <i class="play-icon"></i>
                    <span class="play-all">播放全部</span>
                    <span class="play-count">(共{{playHistory.length}}首)</span>
                </div>
                <div class="operate">
                    <i class="icon"></i>
                    <span class="text">多选</span>
                </div>
            </div>
            <div class="history-main">
                <music-list :songs="playHistory" :needIndex="false" @select="selectItem"></music-list>
            </div>
            <div class="delete-wrap">
                <div class="delete" @click="clear">
                    <i class="icon"></i>
                    <span class="text">清除播放记录</span>
                </div>
            </div>
            <div v-if="playerApparence === 'mini'" style="height: 55px;"></div>
        </div>
        <div class="no-content" v-else>还没有播放记录哦~</div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MusicList from '../../components/music-list/music-list'

export default {
    activated() {
        document.title = '最近播放'
    },
    computed: {
        ...mapGetters([
            'playHistory',
            'playerApparence'
        ])
    },
    methods: {
        ...mapActions([
            'selectPlay',
            'playAll',
            'clearPlayHistory'
        ]),
        selectItem(item, index) {
            this.selectPlay({
                list: this.playHistory,
                index
            })
        },
        clear() {
            const result = window.confirm('确定清除播放记录？')
            if (result) { // 确定
                this.clearPlayHistory()
            }
        },
        deleteItem() {}
    },
    components: {
        MusicList
    }
}
</script>

<style scoped lang="less">
@import '../../assets/style/mixin.less';

.history-container {
    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 50px;
        background: #fff;
        display: flex;
        align-items: center;
        .border-bottom();
        .play {
            flex: 0 0 78%;
            width: 78%;
            height: 100%;
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
            .play-count {
                color: #999;
                margin-left: 4px;
            }
        }
        .operate {
            flex: 0 0 22%;
            width: 22%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .icon {
                -webkit-flex: 0 0 16px;
                flex: 0 0 16px;
                width: 16px;
                height: 16px;
                background: url(../../assets/images/icon_operate.png) no-repeat;
                background-size: contain;
                margin-right: 6px;
            }
        }
    }
    .history-main {
        padding-top: 51px;
    }
    .delete-wrap {
        padding: 16px 0;
        .delete {
            width: 33%;
            height: 32px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #999;
            .icon {
                flex: 0 0 18px;
                width: 18px;
                height: 18px;
                background: url(../../assets/images/icon_delete.png) no-repeat;
                background-size: contain;
                margin-right: 6px;
            }
        }
    }
    .no-content {
        height: 300px;
        line-height: 300px;
        text-align: center;
    }
}
</style>
