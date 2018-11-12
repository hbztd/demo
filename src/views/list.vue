<template>
  <div>
      <van-nav-bar title="测试v0.1" left-text="返回" left-arrow @click-left="onClickLeft"/>
      <div class="mark"></div>
      <!--<movie v-for="i in number" :item="items[i-1]"/>-->
      <movie :item="items[0]"/>
      <movie :item="items[1]"/>
      <movie :item="items[2]"/>
      <movie :item="items[3]"/>
      <movie :item="items[4]"/>
      <movie :item="items[5]"/>
      <movie :item="items[6]"/>
      <movie :item="items[7]"/>
      <movie :item="items[8]"/>
      <movie :item="items[9]"/>
      <movie :item="items[10]"/>
      <movie :item="items[11]"/>
      <movie :item="items[12]"/>
      <movie :item="items[13]"/>
      <movie :item="items[14]"/>
      <p style="margin-left:25px;font-size:12px;">当前：第{{page}}页，共{{end}}页</p>
      <div class="footer">
          <van-button size="small" @click="goFirst">首页</van-button>
          <van-button size="small" @click="goPre">上一页</van-button>
          <van-button size="small" @click="goNext">下一页</van-button>
          <van-button size="small" @click="jump">跳转</van-button>
          <van-button size="small" @click="goEnd">尾页</van-button>
      </div>
      <div class="info">
          免责声明：本网站所有内容都是靠程序在互联网上自动搜集而来，仅供测试和学习交流。
          若侵犯了您的权益，请即时发邮件(zhangxiaofan066@gmail.com)通知站长，万分感谢！
      </div>
      <van-popup v-model="show" position="bottom" :overlay="false">
          <van-field
                  v-model="temp"
                  label="页数"
                  placeholder="请输入要跳转的页数"
          />
          <van-button size="small" style="margin-left: 30%" @click="goOk">确认</van-button>
          <van-button size="small" style="margin-left: 5%" @click="goErr">取消</van-button>
      </van-popup>
  </div>
</template>

<script>
  import { Stepper, Field,Dialog } from 'vant'
    import {Button, Popup} from 'vant'
    import Vue from 'vue'
  import axios from 'axios'
  import movie from "../components/movie";
    Vue.use(Button).use(Field).use(Dialog)
  Vue.use(Stepper).use(Popup)
export default {
  name: 'list',
  components: {movie},
  data () {
    return {
      temp: 1,
      show: false,
      type: 1,
      page: 1,
      end: 1,
      items: []
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push('/');
    },
    goFirst () {
      this.page = 1;
      axios.get(`/api?type=${this.type}&page=1`).then(res => {
        const state = res.status;
        if(state === 200) {
          const jsonData = res.data;
          this.items = [];
          jsonData.items.forEach(item => {
            this.items.push(JSON.parse(item));
          })
        }
      })
    },
    goEnd () {
      this.page = this.end;
      axios.get(`/api?type=${this.type}&page=${this.end}`).then(res => {
        const state = res.status;
        if(state === 200) {
          const jsonData = res.data;
          this.items = [];
          jsonData.items.forEach(item => {
            this.items.push(JSON.parse(item));
          })
        }
      })
    },
    goPre () {
      if(this.page === 1){
        Dialog.alert({
          message: '当前处于首页！！！'
        }).then()
      } else {
        this.page -= 1;
        axios.get(`/api?type=${this.type}&page=${this.page}`).then(res => {
          const state = res.status;
          if(state === 200) {
            const jsonData = res.data;
            this.items = [];
            jsonData.items.forEach(item => {
              this.items.push(JSON.parse(item));
            })
          }
        })
      }

    },
    goNext () {
      if(this.page === this.end){
        Dialog.alert({
          message: '当前处于尾页！！！'
        }).then()
      } else {
        this.page += 1;
        axios.get(`/api?type=${this.type}&page=${this.page}`).then(res => {
          const state = res.status;
          if(state === 200) {
            const jsonData = res.data;
            this.items = [];
            jsonData.items.forEach(item => {
              this.items.push(JSON.parse(item));
            })
          }
        })
      }
    },
    jump () {
        this.show=true
    },
    goErr () {
      this.show = false;
    },
    goOk () {
      if(this.temp > this.end || this.temp < 1){
        Dialog.alert({
          message: '不存在该页！！！'
        }).then()
      } else {
        this.page = this.temp
        axios.get(`/api?type=${this.type}&page=${this.temp}`).then(res => {
          const state = res.status;
          if(state === 200) {
            const jsonData = res.data;
            this.items = [];
            jsonData.items.forEach(item => {
              this.items.push(JSON.parse(item));
            })
          }
        })
        this.show = false
      }
    }
  },
  created () {
    this.type = this.$route.params.type;
    this.end = this.$route.params.end[this.type-1]
    axios.get(`/api?type=${this.type}&page=1`).then(res => {
      const state = res.status;
      if(state === 200) {
        const jsonData = res.data;
        jsonData.items.forEach(item => {
          this.items.push(JSON.parse(item));
        })
      }
    })
  }
}
</script>

<style scoped>
    .footer{
        margin-left: 10%;
    }
    .info{
        margin: 10px;
        font-style: italic;
        font-size: 10px;
    }
</style>