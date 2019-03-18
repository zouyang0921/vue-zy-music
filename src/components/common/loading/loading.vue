<template>
    <div class="loading">
        <img src="../../../assets/images/loading.gif">
        <p class="desc">{{desc}}</p>
    </div>
</template>

<script>
export default {
    props: {
        desc: {
            type: String,
            default: '加载中...'
        }
    }
}
</script>

<style scoped lang="less">
.loading {
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: -27px;
    width: 100%;
    img {
        width: 24px;
        height: 24px;
        margin: 0 auto;
    }
    .desc {
        line-height: 30px;
        text-align: center;
    }
}
</style>
