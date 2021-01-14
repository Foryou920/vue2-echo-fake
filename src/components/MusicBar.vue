<template>
  <div class="MusicBarFather" v-if="audio_data">
    <audio
      id="audio"
      autoplay="autoplay"
      :src="audio_data.sound.source"
    ></audio>
    <router-link :to="{ path: 'detail', query: { id: audio_data.sound.id } }">
      <div class="music-cover">
        <img :src="audio_data.sound.pic_500" />
      </div>
    </router-link>
    <div class="music-info">
      <div class="info-name">{{ audio_data.sound.name }}</div>
      <div class="info-author">{{ audio_data.sound.user.name }}</div>
    </div>
    <div class="music-control">
      <div class="iconfont">
        <div class="music-list" @click="MusicListShow">&#xe600;</div>
      </div>
      <div class="iconfont">
        <div class="music-play" @click="SET_AUDIO_STATUS(!audio_play)">
          {{ audio_play ? "&#xe713;" : "&#xe80f;" }}
        </div>
      </div>
      <div class="iconfont"><div class="music-next">&#xe602;</div></div>
    </div>
    <music-popu :PopuShow="PopuShow" />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import MusicPopu from "@/components/MusicPopu.vue";

export default {
  name: "MusicBar",
  data() {
    return {
      PopuShow: false
    };
  },
  computed: {
    ...mapState({
      audio_ele: state => state.audio.ele,
      audio_data: state => state.audio.data,
      audio_play: state => state.audio.play
    })
  },
  components: { MusicPopu },
  watch: {
    audio_data(val) {
      if (val) {
        this.$nextTick(() => {
          this.audioInit();
        });
      }
    },
    audio_play(val) {
      val ? this.audio_ele.play() : this.audio_ele.pause();
    }
  },
  methods: {
    ...mapMutations([
      "SET_AUDIO_STATUS",
      "SET_AUDIO_ELE",
      "SET_AUDIO_DURATION",
      "SET_AUDIO_CURRENT_TIME"
    ]),
    audioInit: function() {
      let _audio = this.$el.querySelector("#audio");
      this.SET_AUDIO_ELE(_audio);
      _audio.oncanplay = () => {
        _audio.play();
        this.SET_AUDIO_DURATION(_audio.duration);
      };
      _audio.ontimeupdate = () => {
        this.SET_AUDIO_CURRENT_TIME(Math.floor(_audio.currentTime));
      };
      _audio.onplay = () => {
        this.SET_AUDIO_STATUS(true);
      };
      _audio.onpause = () => {
        this.SET_AUDIO_STATUS(false);
      };
    },
    MusicListShow() {
      this.PopuShow = !this.PopuShow;
    }
  },
  mounted() {
    // console.log(this.audio_play);
    // console.log(this.audio_ele);
    // console.log(this.audio_data);
  }
};
</script>

<style lang="stylus" scoped>
.MusicBarFather
  display flex
  align-items center
  flex-wrap wrap
  position fixed
  left 0
  right 0
  bottom 0
  z-index 9999
  padding 0 6px
  height 53px
  background-color rgb(255, 255, 255)
  // opacity 0.9
  .music-cover
    overflow hidden
    width 38px
    height 38px
    img
      object-fit cover
      width 100%
      height 100%
  .music-info
    width 169px
    font-size 13px
    padding 0 9px
    .info-name
      ellipsis()
    .info-author
      margin 5.8px 0 0
  .music-control
    display flex
    justify-content space-around
    align-items center
    margin-left auto
    .music-list
    .music-play
    .music-next
      display flex
      align-items center
      justify-content center
      border 1px solid #555555
      border-radius 100%
      height 37.7px
      width 37.7px
      font-size 22px
      margin 0 9px
    .music-play
      font-size 32px
      height 42px
      width 42px
</style>
