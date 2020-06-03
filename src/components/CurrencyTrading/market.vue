<template>
  <div class="market">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">行情</div>
      <div class="icon_right">
        <!-- <img src="../../assets/navi_market.png" alt="icon"/> -->
      </div>
    </div>
    <div class="grap">
      <iframe class="warp" :src="bu + KlineUrl"></iframe>
    </div>
    <!-- <div class="setting">
      <div class="setting_head">
        <div class="head_now">最近成交</div>
        <div class="head_all">我的成交 ></div>
      </div>
      <div class="setting_list">
        <div class="list_head">
          <div class="two">时间</div>
          <div class="two">价格(USDT)</div>
          <div class="two">数量(BTC)</div>
        </div>
        <div class="list_content">
          <div class="two">08-07 19:33:22</div>
          <div class="two">10523.12</div>
          <div class="two">1.122345</div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'market',
  data () {
    return {
      unit: 'BTC',
      middle_unit: 'USDT',
      KlineUrl: '/api/chart/kChart'
    }
  },
  mounted () {
    // 路由跳转
    // this.$get('/api/chart/kChart')
    //   .then(res => {
    //     // this.KlineUrl = res
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    // this.KlineUrl = `http://192.168.1.53:8081/test/k`
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="scss">
.market{
  width: 100%;
  min-height: 100vh;
  background-color: #eeeeee;
  .header{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    padding: 0 16px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .icon_left{
      width: 11px;
      height: 22px;
      img{
        width: 100%;
        display: block;
      }
    }
    .text_con{
      font-size:16px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(0,0,0,0.85);
     }
    .icon_right{
      width: 22px;
      height: 22px;
      img{
        width: 100%;
        display: block;
      }
    }
  }
  .grap{
    width: 100%;
    height: 90vh;
    .warp{
      width: 100%;
      height: 90vh;
      border: none;
    }
  }
  .setting{
    width: 100%;
    height: 5px;
    margin:10px 0;
    background: #eeeeee;
    padding: 0 9px;
    box-sizing: border-box;
    .setting_head{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      // text-align: left;
      .head_now{
        font-size:16px;
        font-weight:500;
        color:rgba(0,0,0,0.85);
      }
      .head_all{
        font-size:12px;
        font-weight:400;
        color:rgba(0,142,187,1);
      }
    }
    .setting_list{
      width: 100%;
      // text-align: left;
      .list_head{
        width: 100%;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eeeeee;
        .one{
          width: 10%;
          font-size:12px;
          font-weight:400;
          color:rgba(0,0,0,0.5);
        }
        .two{
          width: 33%;
          font-size:12px;
          font-weight:400;
          color:rgba(0,0,0,0.5);
        }
      }
      .list_content{
        width: 100%;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eeeeee;
        .one{
          width: 10%;
          font-size:12px;
          font-weight:400;
          color:rgba(0,0,0,0.85);
        }
        .two{
          width: 33%;
          font-size:12px;
          font-weight:400;
          color:rgba(0,0,0,0.85);
        }
      }
    }
  }
}
</style>
