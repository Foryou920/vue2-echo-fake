<template>
  <div class="TheFather">
    <Header :BannerJson="BannerJson"></Header>
    <recommen-title></recommen-title>
    <music-list :MusicListJson="MusicListJson"></music-list>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import RecommenTitle from "@/components/Recommen-title.vue";
import MusicList from "@/components/MusicList.vue";

import { getBannerSwiper, getMusicList } from "@/api";

export default {
  name: "Home",
  components: {
    Header,
    RecommenTitle,
    MusicList
  },
  data: function() {
    return {
      BannerJson: [],
      MusicListJson: [],
      MusicListPage: 1
    };
  },
  methods: {
    getBannerSwiperData: function() {
      getBannerSwiper().then(res => {
        this.BannerJson = res.data;
      });
    },
    getMusicListData: function() {
      getMusicList(this.MusicListPage)
        .then(res => {
          if (res.data && res.data.length > 0) {
            this.MusicListJson.push(...res.data);
          }
        })
        .catch(() => {
          console.log("WTF??");
        });
      this.MusicListPage++;
      if (this.MusicListPage > 6) {
        this.MusicListPage = 6;
      }
    }
  },
  mounted: function() {
    this.getBannerSwiperData();
    this.getMusicListData();
    window.addEventListener("scroll", () => {
      if (
        window.pageYOffset + window.innerHeight >=
        document.body.scrollHeight
      ) {
        this.getMusicListData(this.MusicListPage);
      }
    });
  }
};
</script>

<style lang="stylus"></style>
