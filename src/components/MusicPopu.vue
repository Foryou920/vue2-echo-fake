<template>
  <div class="Popu-Father" v-if="PopuShow">
    <transition name="fade" appear appear-active-class="animated fadeInUpBig">
      <div>
        <div class="Popu-ListHeader">
          <div class="ListHeaderLeft">清空</div>
          <div class="ListHeaderCenter">
            播放列表
            <div class="ListCount">({{ audio_playlist.length }}首)</div>
          </div>
          <div class="ListHeaderRight">更多</div>
        </div>
        <div
          class="Popu-ListBody"
          v-for="item of audio_playlist"
          :key="item.sound.id"
        >
          <div class="MusicChild">{{ item.sound.name }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MusicPopu",
  computed: {
    ...mapState({
      audio_playlist: state => state.playList
    })
  },
  props: {
    PopuShow: {
      default: false,
      type: Boolean
    }
  },
  mounted() {
    // console.log(this.audio_playlist);
  }
};
</script>

<style src="@/assets/css/animate.css"></style>
<style lang="stylus" scoped>
.Popu-Father
  z-index 1
  display block
  position fixed
  bottom 53px
  left 0
  right 0
  .Popu-ListHeader
    display flex
    justify-content center
    align-items center
    height 40px
    width 100%
    margin-top 9px
    color #6ed56c
    font-size 15.5px
    background-color #ffffff
    .ListHeaderLeft
      margin-left 20px
      margin-right auto
    .ListHeaderCenter
      display flex
      flex-wrap nowrap
      align-items center
      .ListCount
        font-size 13px
        color #6ed56c
        margin-left 6px
    .ListHeaderRight
      margin-left auto
      margin-right 20px
  .Popu-ListBody
    display flex
    align-items center
    height 34px
    width 100%
    padding 8px 9px
    background-color #ffffff
    .MusicChild
      font-size 14.5px
      color #333333
</style>
