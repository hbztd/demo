<template>
  <div>
      <van-nav-bar title="测试v0.1" left-text="返回" left-arrow @click-left="onClickLeft"/>
      <movie v-for="i in end" :item="items[i-1]"/>
      <p v-if="show">正在加载中</p>
      <p style="margin-left:25px;font-size:12px;" v-else>共搜索到关于‘{{ key }}’{{end}}项</p>
  </div>
</template>

<script>
    import axios from 'axios'
    import movie from '../components/movie'
    import {Dialog} from 'vant'
    import Vue from 'vue'
    Vue.use(Dialog)
export default {
  name: 'search',
  data () {
    return {
      key: '',
      items: [],
      end: 0,
      show: true
    }
  },
  components:{
    movie
  },
  methods: {
    onClickLeft () {
      this.$router.push('/');
    }
  },
  created () {
    this.key = this.$route.params.searchKey;
    axios.get(`/api?type=5&page=${this.key}`).then(res => {
      const state = res.status;
      if(state === 200) {
        const jsonData = res.data;
        if(jsonData.items.length>15){
              new Dialog.alert({
                message: `共搜索到${jsonData.items.length},结果过多，系统搜索功能暂不支持分页，只显示前15条`
              })
        }
        for(let i=0; i<jsonData.items.length&&i<15; i++){
          this.items.push(JSON.parse(jsonData.items[i]));
        }

        // jsonData.items.forEach(item => {
        //   this.items.push(JSON.parse(item))
        //
        //   if(this.items.length>14){
        //     this.end = this.items.length;
        //     new Dialog({
        //       message: `搜索到的结果过多，系统搜索功能暂不支持分页，只显示前15条`
        //     })
        //     this.show = false;
        //     return
        //   }
        //
        // })
        this.end = this.items.length;
        this.show = false
      }

    })
    // axios是异步的，一些操作要写在then后面
  }
}
</script>

<style scoped>

</style>