<template>
  <div class="CurrencyTrading">
    C2C
    <div style="width:100%;height:60px;"></div>
    <div class="footer">
      <div class="list" @click="index()">
        <div class="icon">
          <img src="../../assets/tab_index_normal.png"/>
        </div>
        <div class="text_a">首页</div>
      </div>
      <div class="list" @click="curr()">
        <div class="icon">
          <img src="../../assets/tab_coin_normal.png"/>
        </div>
        <div class="text_a">币币</div>
      </div>
      <div class="list" @click="ctwo()">
        <div class="icon">
          <img src="../../assets/tab_c2c_selected.png"/>
        </div>
        <div class="text_a taber_act">C2C</div>
      </div>
      <div class="list" @click="lock()">
        <div class="icon">
          <img src="../../assets/tab_lock_normal.png"/>
        </div>
        <div class="text_a">锁仓</div>
      </div>
      <div class="list" @click="my()">
        <div class="icon">
          <img src="../../assets/tab_user_normal.png"/>
        </div>
        <div class="text_a">个人中心</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CurrencyTrading',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    // 跳页
    index () {
      this.$router.push({
        path: `/`
      })
    },
    curr () {
      this.$router.push({
        path: `/CurrencyTrading`
      })
    },
    ctwo () {
      this.$router.push({
        path: `/crransaction`
      })
    },
    lock () {
      this.$router.push({
        path: `/lock`
      })
    },
    my () {
      this.$router.push({
        path: `/userinfo`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .CurrencyTrading{
    width: 100%;
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
        .taber_act{
          color: #008EBB;
        }
      }
    }
  }
</style>
