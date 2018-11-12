<template>
  <div>
      <van-nav-bar title="测试v0.1" left-text="返回" left-arrow @click-left="onClickLeft"/>
      <p v-show="show">请点击按键</p>
      <hr v-show="show">
      <div id="player1"></div>
      <!--<iframe src="http://app.baiyug.cn:2019/vip/index.php?url=http://v.youku.com/v_show/id_XMjg5NzgyNjA5Mg==.html" id="player2" width="100%" height="100%" allowtransparency="true" frameborder="0" scrolling="no"></iframe>-->
      <van-button v-for="i in number" :key="index" :text="video_name[i-1]"
                  :disabled="video_name[i-1] === '|'" @click="play(video_url[i-1])"/>
      <!--<li v-for="i in 10">{{ i }}</li>-->

      <!--<button @click="play">{{ video_name[0] }}</button>-->
      <!--<p>如果您点击我，我会消失。</p>-->
      <!--<p>点击我，我会消失。</p>-->
      <!--<p>也要点击我哦。</p>-->
      <!--<p>{{video_name}}</p>-->
      <!--<p @click="play">{{video_url}}</p>-->
      <!--<p id="PP"></p>-->
  </div>
</template>

<script>
    import $ from 'jquery'
    import {Dialog} from 'vant'
    import Vue from 'vue'
    Vue.use(Dialog)

    $(document).ready(function(){
      // alert(this.$router.params.item.video_url);
      // var dp = new DPlayer({
      //   element: document.getElementById('player1'),
      //   video: {
      //     url: this.$route.params.item.video_url
      //   }
      // });
      // dp.play();
    });
export default {
  name: 'play',
  data () {
    return {
      video_name: [],
      video_url: [],
      number: 1,
      item: null,
      show: true
    }
  },
  methods: {
    play(url) {
      this.show = false;
      if(url.indexOf('m3u8')>0) {
        var dp = new DPlayer({
          element: document.getElementById('player1'),
          video: {
            url
          }
        });
        dp.play();
      } else {
        Dialog.alert({
          message: '警告：本站暂不支持播放该资源，是否打开外部接口，播放该资源？',
          showCancelButton: true
        }).then(() => {
          let a = $(`<a href='http://app.baiyug.cn:2019/vip/index.php?url=${url}' target='_blank'></a>`).get(0);
          let e = document.createEvent('MouseEvents');
          e.initEvent( 'click', true, true );
          a.dispatchEvent(e);
        }).catch(() => {
          // on cancel
        });

      }
    },
    onClickLeft () {
      this.$router.push({
        name: 'home'
      });
    },
  },
  computed: {
    getItems () {
      // const items = [];
      // for(let i=0;i<this.video_name.length;i++){
      //   const item = {name: this.video_name[i], url: this.video_url};
      //   items.push(item);
      // }
      // console.log(items)
      // return items;
      const size = this.video_url.length;
      let a = []
      for(let i=0; i<size; i++){
        a.push({i})
      }
      return a;
    }
  },
  mounted () {
    this.item = this.$route.params.item;
    const raw = unescape(this.item.video_url);
    const b = raw.split("#");
    const c = [];
    const d = [];
    b.forEach((i) => {
      let temp = i.split("$");
      if(temp.length>2){
        c.push(temp[0],'|',temp[4])
        d.push(temp[1],'|',temp[5])
      } else {
        c.push(temp[0])
        d.push(temp[1]);
      }
    });
    this.video_name = c;
    this.video_url = d;
    $('#p2').html = 'asdf'
    this.number = this.video_name.length;
  }
}
</script>
<style scoped>
</style>