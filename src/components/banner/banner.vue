<template>
    <swiper :options="swiperOption">
        <swiper-slide v-for="(banner, index) in banners" :key="index">
            <img :src="banner.imageUrl">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
    props: {
        banners: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            swiperOption: {
                loop: true,
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false
                },
                speed: 800,
                pagination: {
                    el: '.swiper-pagination',
                    bulletActiveClass: 'bullet-active',
                    clickable: true
                }
            }
        }
    },
    components: {
        swiper,
        swiperSlide
    }
}
</script>

<style lang="less">
@import '../../assets/style/variable.less';

.swiper-container {
    width: 100%;
    height: 18.7%;
    border-radius: 8px;
    .swiper-wrapper {
        .swiper-slide {
            width: 100%;
            overflow: hidden;
            background: @color-background;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .bullet-active {
        background: @color-theme;
        opacity: 1;
    }
}
</style>
