<template>
  <div class="Father-List">
    <div class="MusicList" v-for="item of MusicListJson" :key="item.sound.id">
      <div class="MusicItem">
        <router-link :to="{ path: 'detail', query: { id: item.sound.id } }">
          <div class="MusicItemImg">
            <img class="MusicItemImgClass" :src="item.sound.pic_500" />
          </div>
          <div class="MusicItemName">{{ item.sound.name }}</div>
        </router-link>
        <div class="MusicItemChannel">
          <div class="MusicItemChannelValue">{{ item.sound.channel.name }}</div>
          <div class="MusicItemChannelLable">频道</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicList",
  props: {
    MusicListJson: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="stylus" scoped>
.MusicList
  float left
  width 50%
  height 240px
  overflow hidden
  margin-bottom 9px
  .MusicItem
    height 100%
    margin 0 10px
    .MusicItemImg
      height 80%
      .MusicItemImgClass
       width 100%
    .MusicItemName
      ellipsis()
      margin-top 9px
      font-size 16px
      color #555555
    .MusicItemChannel
      padding-top 2px
      display flex
      flex-wrap nowrap
      font-size 13px
      .MusicItemChannelValue
        ellipsis()
        width 70%
        color #7dd97f
      .MusicItemChannelLable
        display flex
        justify-content flex-end
        width 30%
        color #999999
</style>
