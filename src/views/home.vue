<template>
    <div id="app">
        <van-nav-bar title="测试v0.1" @click-left="onClickLeft" @click-right="onClickRight">
            <van-icon name="search" slot="right"/>
            <van-icon name="wap-nav" slot="left"/>
            <!--wap-nav-->
        </van-nav-bar>
        <form action="/" v-show="isSearch">
            <van-search
                    v-model="value"
                    placeholder="请输入搜索关键词"
                    show-action
                    @search="onSearch"
            > <div slot="action" @click="onSearch">搜索</div></van-search>
        </form>
        <van-tabs v-model="active" v-show="isNav" @click="goList">
            <van-tab title="电影"/>
            <van-tab title="电视剧"/>
            <van-tab title="综艺"/>
            <van-tab title="动漫"/>
        </van-tabs>
        <van-swipe :autoplay="5000">
            <van-swipe-item v-for="(swipe, index) in swipes" :key="index">
                <img :src="swipe" class="my_swipe"/>
            </van-swipe-item>
        </van-swipe>
        <div>
            <van-panel title="电影" status="今日更新" :desc="movieNumber(1)">
                <movie :item="items[0]"/>
                <movie :item="items[1]"/>
                <movie :item="items[2]"/>
                <movie :item="items[3]"/>
                <movie :item="items[4]"/>
                <!--<movie v-for="{item, index} in items.slice(0,5)" :key="index" :item="item"/>-->
            </van-panel>
            <van-panel title="电视剧" status="今日更新" :desc="movieNumber(2)">
                <movie :item="items[5]"/>
                <movie :item="items[6]"/>
                <movie :item="items[7]"/>
                <movie :item="items[8]"/>
                <movie :item="items[9]"/>
                <!--<movie v-for="{item, index} in items.slice(5,10)" :key="index" :item="item"/>-->
            </van-panel>
            <van-panel title="综艺" status="今日更新" :desc="movieNumber(3)">
                <movie :item="items[10]"/>
                <movie :item="items[11]"/>
                <movie :item="items[12]"/>
                <movie :item="items[13]"/>
                <movie :item="items[14]"/>
                <!--<movie v-for="{item, index} in items.slice(10,15)" :key="index" :item="item"/>-->
            </van-panel>
            <van-panel title="动漫" status="今日更新" :desc="movieNumber(4)">
                <movie :item="items[15]"/>
                <movie :item="items[16]"/>
                <movie :item="items[17]"/>
                <movie :item="items[18]"/>
                <movie :item="items[19]"/>
                <!--{{ getItems }}-->
                <!--<p v-for="{item, index} in getItems" :key="index"> 1234{{ index}} {{item}}</p>-->
                <!--<p v-for="{number,index} in numbers.slice(1,5)" :key="index">132456</p>-->
                <!--<movie v-for="{item, index} in items.slice(15,20)" :key="index" :item="item"/>-->
                <!-- items仍然为0 -->
                <!--<p v-for="{item, index} in items.slice(15,20)" :key="index"> 234 {{item.state}}</p>-->
            </van-panel>

        </div>

    </div>
</template>

<script>
  import { NavBar, Toast, Search, Icon, Tab, Tabs, Panel, Swipe, SwipeItem, Button} from 'vant';
  import axios from 'axios'
  import Vue from 'vue'
  Vue.use(NavBar).use(Button);
  Vue.use(Search).use(Swipe).use(SwipeItem);
  Vue.use(Icon).use(Tab).use(Tabs).use(Panel);
  import movie from '../components/movie'
  export default ({
    data () {
      return {
        value: '',
        isSearch: false,
        isNav: false,
        type: 1,
        swipes: ['http://r1.ykimg.com/0516000059CF63C7ADBA1FC5750B00B9',
          'http://r1.ykimg.com/05160000529FF6956758394DBD0D6C47',
          'http://pic.ddoox8.com/upload/vod/2017-09-29/150667567310.jpg'],
        total1: 0,
        total2: 0,
        total3: 0,
        total4: 0,
        items: [],
        active: 1
      }
    },
    methods:{
      onClickLeft () {
        if(this.isSearch ===  true)
          this.isSearch = false
        this.isNav = !this.isNav
      },
      onClickRight () {
        if(this.isNav ===  true)
          this.isNav = false
        this.isSearch = !this.isSearch
      },
      onSearch () {
        // Toast(this.value)
        this.$router.push({
          name: 'search',
          params: {
            searchKey: this.value,
          }
        })

      },
      onCancel () {
        Toast('取消')
      },
      movieNumber (type) {
        if(type === 1)
          return `共${this.total1}部影片`
        else if(type === 2)
          return `共${this.total2}部影片`
        else if(type === 3)
          return `共${this.total3}部影片`
        else if(type === 4)
          return `共${this.total4}部影片`
      },
      goList () {
        this.$router.push({
          name: 'list',
          params: {
            type: this.active+1,
            end: [1067, 478, 110, 197]
          }
        })
      }
    },
    components: {
      movie
    },
    mounted () {
      axios.get('/api?type=0').then(
        (res) => {
          const state = res.status;
          if(state === 200){
            const jsonData = res.data;
            this.total1 = jsonData.total[0]
            this.total2 = jsonData.total[1]
            this.total3 = jsonData.total[2]
            this.total4 = jsonData.total[3]
            jsonData.items.forEach(item => {
              this.items.push(JSON.parse(item));
            })
            // 这里是字符串items数组要转换成json，要注意数据类型，！！！！！！！
            // console.log(this.total1);
            // this.items.forEach(item => console.log(item))
            // const item = this.items[0];
            // console.log(typeof item);
            // console.log(item.state);
          } else {
            alert("服务器错误");
          }
        }
      ).catch()
    }
  })
</script>

<style scoped>
    .my_swipe{
        width: 100%;
        height: 200px;
        margin-bottom: 5px;
        margin-top: 2px;
    }
</style>
