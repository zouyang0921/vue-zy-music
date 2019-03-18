<template>
    <div class="v-header">
        <router-link class="search" to="/search">
            <i class="search-icon"></i>
            输入关键字搜索
        </router-link>
        <router-link class="mine" to="/mine">
            <i class="mine-icon"></i>
        </router-link>
    </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
@import '../../assets/style/variable.less';

.v-header {
    position: relative;
    display: flex;
    height: 50px;
    align-items: center;
    border-bottom: .5px solid rgba(0, 0, 0, .1);
    .search {
        flex: 1;
        height: 30px;
        margin: 0 12px;
        background: @color-background;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #bdbebe;
        .search-icon {
            width: 14px;
            height: 14px;
            background: url(../../assets/images/icon_search.png) no-repeat;
            background-size: contain;
            margin-right: 12px;
        }
    }
    .mine {
        -webkit-flex: 0 0 24px;
        flex: 0 0 24px;
        margin-left: 4px;
        margin-right: 12px;
        display: flex;
        .mine-icon {
            width: 24px;
            height: 24px;
            background: url(../../assets/images/icon_me.png) no-repeat;
            background-size: contain;
        }
    }
}
</style>
