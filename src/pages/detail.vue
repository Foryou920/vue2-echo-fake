<template>
  <div class="DetailFather">
    <div class="loading" v-if="!CoolVal">
      <div class="iconfont">&#xe614;</div>
    </div>
    <div v-if="CoolVal">
      <div class="detailuser">
        <img class="userimg" :src="audio.data.sound.user.avatar_50" />
        <div class="username">{{ audio.data.sound.user.name }}</div>
        <div class="userfans">
          <div class="userfanslabel">粉丝</div>
          <div class="userfansvalue">
            {{ audio.data.sound.user.followed_count }}
          </div>
        </div>
      </div>
      <div class="detailcover">
        <img class="detailcoverimg" :src="audio.data.sound.pic_500" />
        <div class="progressbar" @click="handleSeek">
          <div class="progressbar_time">
            {{ audio.currentTime | sec2his }}/{{ audio.duration | sec2his }}
          </div>
          <div class="progressbar_block" :style="`width:${audio_progress}`">
            <div class="block_bar"></div>
          </div>
        </div>
        <div class="control">
          <div
            class="control-playBtn"
            :class="audio.play ? 'Play' : 'Pause'"
            @click="handleBtnPlay"
          ></div>
          <div class="control-info">
            <div class="info-name">{{ audio.data.sound.name }}</div>
            <div class="info-source">
              <a class="info-source-author">{{ audio.data.sound.user.name }}</a>
              <div class="info-source-lable">发布在</div>
              <a class="info-source-channel">{{
                audio.data.sound.channel.name
              }}</a>
              <div class="info-source-lable">频道</div>
            </div>
          </div>
        </div>
      </div>
      <div class="detailinfo">
        <div class="infoitem">
          <div class="iconfont">&#xe8bf;</div>
          <div class="itemvalue">{{ audio.data.sound.view_count }} 播放</div>
        </div>
        <div class="infoitem">
          <div class="iconfont">&#xe8ab;</div>
          <div class="itemvalue">{{ audio.data.sound.like_count }} 喜欢</div>
        </div>
        <div class="infobell">
          <div class="iconfont">&#xe8c6;</div>
          <div class="infolable">设为手机铃声</div>
        </div>
      </div>
      <div class="detaillyric">
        <div v-if="audio.data.sound.song_info">
          <p v-if="audio.data.sound.song_info.album_name">
            {{ audio.data.sound.song_info.album_name.type }} :
            {{ audio.data.sound.song_info.album_name.name }}
          </p>
          <p v-if="audio.data.sound.song_info.author">
            {{ audio.data.sound.song_info.author.type }} :
            {{ audio.data.sound.song_info.author.name }}
          </p>
          <p v-if="audio.data.sound.song_info.name">
            {{ audio.data.sound.song_info.name.type }} :
            {{ audio.data.sound.song_info.name.name }}
          </p>
        </div>
        <div
          v-if="audio.data.sound.lyrics"
          v-html="audio.data.sound.lyrics"
        ></div>
        <div
          v-if="!audio.data.sound.song_info && !audio.data.sound.lyrics"
          class="noLyric"
        >
          没有相关的歌词T T~
        </div>
      </div>
      <div class="detailother">
        <div class="OtherText">相关推荐</div>
        <div class="other-recommend">
          <music-list :MusicListJson="MusicList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import { getDetail, getOther } from "@/api";
import MusicList from "@/components/MusicList.vue";
export default {
  name: "detail",
  components: { MusicList },
  data() {
    return {
      CoolVal: false,
      MusicList: []
    };
  },
  computed: {
    ...mapState(["audio"]),
    ...mapGetters(["audio_progress"])
  },
  watch: {
    $route(to, from) {
      if (this.$route.path.includes("detail")) {
        this.getMusicData();
        this.getOtherData();
        this.CoolVal = false;
        this.TimeToShow();
      }
    }
  },
  methods: {
    ...mapMutations(["SET_AUDIO_DATA", "SET_AUDIO_STATUS"]),
    getMusicData: function() {
      let id = this.$route.query.id;
      getDetail(id)
        .then(res => {
          if (res && res.data) {
            this.SET_AUDIO_DATA(res.data);
          }
        })
        .catch(() => {
          console.log("WTF");
        });
    },
    getOtherData: function() {
      getOther()
        .then(res => {
          if (res && res.data) {
            this.MusicList = res.data;
          }
        })
        .catch(() => {
          console.log("WTF??");
        });
    },
    handleBtnPlay: function() {
      let playStatus = !this.audio.play;
      this.SET_AUDIO_STATUS(playStatus);
    },
    handleSeek: function(e) {
      // let playStatus = true;
      // this.SET_AUDIO_STATUS(playStatus);
      e = e || window.event;
      let percent = Math.floor((e.pageX / window.innerWidth) * 100) / 100;
      this.audio.ele.currentTime = this.audio.ele.duration * percent;
    },
    TimeToShow: function() {
      setTimeout(() => {
        this.CoolVal = true;
      }, 200);
    }
  },
  mounted: function() {
    this.getMusicData();
    this.TimeToShow();
    this.getOtherData();
  }
};
</script>

<style lang="stylus" scoped>
.loading
  position fixed
  top 0
  width 100%
  height 100%
  display flex
  align-items center
  justify-content center
  .iconfont
    font-size 66px
.detailuser
  display flex
  align-items center
  height 60px
  padding 0 16px 0 16px
  .userimg
    width 40px
    height 40px
    border-radius 100%
    background-color #0000ff
  .username
    margin-left 11px
    font-size 14.5px
    color #555555
  .userfans
    display flex
    align-items center
    margin-left auto
    max-width 30%
    background-color #FBFBFB
    color #555555
    .userfanslabel
      font-size 14px
      white-space nowrap
    .userfansvalue
      line-height 10px
      overflow hidden
      white-space nowrap
      font-size 12px
      margin-left 7px
      color #00Ae05
.detailcover
  position relative
  background-color #000000
  height 415px
  .detailcoverimg
    width 100%
    height 100%
    object-fit cover
  .progressbar
    position absolute
    bottom 66px
    left 0
    right 0
    height 17px
    background-color rgba(0,0,0,.2)
    .progressbar_time
      position absolute
      left 8px
      right 0
      bottom 2px
      color #ffffff
      font-size 13px
      line-height 100%
    .progressbar_block
      background-color rgba(110,213,108,.3)
      height 100%
    .block_bar
      background-color #6ed56c
      width 7px
      height 100%
      margin-left auto
  .control
    position absolute
    left 0
    right 0
    bottom 0
    display flex
    align-items center
    height 66px
    width auto
    padding 0 10px
    background-color rgba(0,0,0,.5)
    .control-playBtn
      width 42px
      height 42px
      margin-right 13px
      &.Play
        background url("~@/assets/img/play.png") no-repeat
        background-size: cover
      &.Pause
        background url("~@/assets/img/pause.png") no-repeat
        background-size: cover
    .control-info
      .info-name
        color #ffffff
        font-size 15.5px
        margin 0 0 7px
      .info-source
        display flex
        font-size 13.5px
        .info-source-author
        .info-source-channel
          color #7dd97f
        .info-source-lable
          margin 0 4.5px
          color #ffffff
.detailinfo
  display flex
  align-items center
  padding 0 17.8px
  color #808080
  height 55.5px
  border-bottom 1px solid #f4f4f4
  .infoitem
    display flex
    font-size 13px
    line-height 18.4px
    padding-right 13px
    .iconfont
      margin-right 5.8px
  .infobell
    display flex
    line-height 21px
    margin-left auto
    font-size 14px
    color #7dd97f
    .iconfont
      font-size 20px
      margin-right 6px
.detaillyric
  padding 16.5px 17.8px 33px
  color #333333
  font-size 15px
  white-space pre-wrap
  line-height 23px
  .noLyric
    display flex
    justify-content center
    color #999999
.detailother
  width 100%
  display flex
  flex-wrap wrap
  justify-content center
  .OtherText
    color #6ee56c
    padding 7px 11px
    margin 13px 0px 22px
    border-bottom 1px solid #6ee56c
  .other-recommend
    margin-bottom 53px
</style>
