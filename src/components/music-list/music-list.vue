<template>
    <div class="music-list" v-if="songs && songs.length > 0">
        <div class="list-item" v-for="(item, index) in songs" :key="item.id" @click="selectItem(item, index)">
            <div class="item-index" v-if="needIndex">
                <span>{{index + 1}}</span>
            </div>
            <div class="item-content" v-if="needMarkWord">
                <h4 class="item-title" v-html="markKeyword(item.name, keyword)"></h4>
                <div class="item-artist">
                    <i class="item-sq" v-if="item.album && item.album.status === 0"></i>
                    <span v-html="markKeyword(item.artist, keyword)"></span>
                    <span class="space">-</span>
                    <span v-html="markKeyword(item.album && item.album.name, keyword)"></span>
                </div>
                <div class="item-alias" v-for="desc in item.alias" :key="desc"
                    v-html="markKeyword(desc, keyword)"></div>
            </div>
            <div class="item-content" v-else>
                <h4 class="item-title">{{item.name}}</h4>
                <div class="item-artist">
                    <i class="item-sq" v-if="item.album && item.album.status === 0"></i>
                    <span>{{item.artist}}</span>
                    <span class="space">-</span>
                    <span v-if="item.album">{{item.album.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { checkMusic } from '../../api/api'

export default {
    props: {
        songs: {
            required: true,
            type: Array
        },
        needIndex: {
            default: true,
            type: Boolean
        },
        needMarkWord: {
            default: false,
            type: Boolean
        },
        keyword: {
            default: '',
            type: String
        }
    },
    computed: {
        ...mapGetters([
            'currentMusic'
        ])
    },
    methods: {
        markKeyword(str, keyword) {
            if (str && typeof str === 'string') {
                const reg = new RegExp(keyword, 'g')
                return str.replace(reg, () => `<b style="color: #0868b5;">${keyword}</b>`)
            }
            return ''
        },
        selectItem(item, index) {
            checkMusic(item.id).then(res => {
                if (res.data.message !== 'ok') {
                    alert('当前音乐无法播放，请播放其他音乐')
                } else {
                    this.$emit('select', item, index)
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style scoped lang="less">
@import '../../assets/style/variable.less';
@import '../../assets/style/mixin.less';

.music-list {
    .list-item {
        display: flex;
        margin: 0 6px;
        line-height: 20px;
        .border-bottom();
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
            .item-title {
                font-size: 16px;
                .single-line-overflow();
            }
            .item-artist, .item-alias {
                .single-line-overflow();
                color: #7d7e7f;
                margin-top: 4px;
            }
            .item-artist {
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
}
</style>
