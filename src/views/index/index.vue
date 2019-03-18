<template>
    <div class="index-container">
        <v-header></v-header>
        <tab></tab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import VHeader from '../../components/v-header/v-header'
import Tab from '../../components/tab/tab'

export default {
    components: {
        VHeader,
        Tab
    },
    computed: {},
    methods: {},
    activated() {
        document.title = 'ZY Music'
    }
}
</script>

<style scoped lang="less">
</style>
