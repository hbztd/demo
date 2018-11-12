<template>
  <van-card :tag="item.state" :thumb="item.img_src" :title="item.title" class="myP">
      <div slot="desc">
          <p>导演：{{ item.director || '暂无' }}</p>
          <p>主演：{{ item.actor || '暂无'}}</p>
          <p>类型：{{ item.type || '暂无'}}</p>
      </div>
      <div slot="footer">
          <van-button size="small" @click="showTag">
              播放
          </van-button>
      </div>
  </van-card>
</template>

<script>
  import { Card,Button } from 'vant'
  import Vue from 'vue'
  Vue.use(Card).use(Button)
export default {
  name: 'movie',
  props: ['item'],
  methods:{
    showTag () {
      this.$router.push({
        name: 'play',
        params: {
          item: this.item,
        }
      })
    }
  }
}
</script>

<style scoped>
    .myP{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 8px;
        margin-bottom: 8px;
    }
    p{
        margin: 8px;
    }
</style>