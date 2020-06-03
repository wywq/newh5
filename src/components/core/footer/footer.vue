<template>
  <div class="footer">
    <div class="list">
      <div class="icon">
        <img src="../../../assets/tab_index_normal.png"/>
      </div>
      <div class="text_a">首页</div>
    </div>
    <div class="list">
      <div class="icon">
        <img src="../../../assets/tab_coin_normal.png"/>
      </div>
      <div class="text_a">币币</div>
    </div>
    <div class="list">
      <div class="icon">
        <img src="../../../assets/tab_c2c_normal.png"/>
      </div>
      <div class="text_a">C2C</div>
    </div>
    <div class="list">
      <div class="icon">
        <img src="../../../assets/tab_lock_normal.png"/>
      </div>
      <div class="text_a">锁仓</div>
    </div>
    <div class="list">
      <div class="icon">
        <img src="../../../assets/tab_user_normal.png"/>
      </div>
      <div class="text_a">个人中心</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  data () {
    return {
      err: 'err.response.data.detail'
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.footer{
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 49px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9999;
  .list{
    display: block;
    .icon{
      width: 25px;
      margin: auto;
      img{
        width: 100%;
        display: block;
      }
    }
    .text_a{
      margin-top: 4px;
      width:100%;
      font-size:8px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(0,0,0,0.25);
      line-height:11px;
    }
  }
}
</style>
