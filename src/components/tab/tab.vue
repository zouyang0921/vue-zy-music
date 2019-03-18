<template>
    <div class="tab">
        <router-link class="tab-item" tag="div" to="./recommend">
            <span class="tab-item-text">个性推荐</span>
            <i class="tab-item-line"></i>
        </router-link>
        <router-link class="tab-item" tag="div" to="./rank">
            <span class="tab-item-text">排行榜</span>
            <i class="tab-item-line"></i>
        </router-link>
        <!-- <router-link class="tab-item" tag="div" to="./playlist">
            <span class="tab-item-text">流行歌单</span>
            <i class="tab-item-line"></i>
        </router-link> -->
    </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
@import '../../assets/style/variable.less';

.tab {
    display: flex;
    height: 44px;
    line-height: 44px;
    margin-bottom: 6px;
    .tab-item {
        position: relative;
        flex: 1;
        text-align: center;
        .tab-item-text {
            font-size: 16px;
            color: @color-text;
        }
        .tab-item-line {
            display: none;
        }
        &.router-link-active {
            .tab-item-text {
                font-weight: 500;
                color: @color-theme;
            }
            .tab-item-line {
                display: block;
                position: absolute;
                bottom: 6px;
                left: 50%;
                margin-left: -15px;
                width: 30px;
                height: 3px;
                background: @color-theme;
                border-radius: 1.5px;
            }
        }
    }
}
</style>
