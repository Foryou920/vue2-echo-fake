<template>
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="showSwiper">
      <swiper-slide v-for="(item, index) of BannerJson" :key="index">
        <img class="swiperPic" :src="item.sound.pic_640" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      swiperOption: {
        pagination: ".swiper-pagination",
        loop: true
      }
    };
  },
  computed: {
    showSwiper: function() {
      return this.BannerJson.length;
    }
  },
  props: {
    BannerJson: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="stylus" scoped>
.swiper-container
  --swiper-pagination-color: #ffffff;
.wrapper
  padding 10px
  background-color #e8e8e8
  .swiperPic
    width 100%
</style>
