<template>
  <div class="entrust">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_navi_back.png" alt="icon"/>
      </div>
      <div class="text_con">全部委托</div>
      <div class="icon_right" @click="screen1()">
        <img src="../../assets/navi_choose.png" alt="icon"/>
      </div>
    </div>
    <div class="list">
      <div class="details">
        <div class="de_left">买卖<span>卖出</span></div>
        <div class="de_right">已成交<span>0.223345 BTC</span></div>
      </div>
      <div class="details">
        <div class="de_left">价格<span>卖出</span></div>
        <div class="de_right">未成交<span>0.223345 BTC</span></div>
      </div>
      <div class="details">
        <div class="de_left">数量<span>卖出</span></div>
        <div class="de_right">状态<span>已发布</span></div>
      </div>
      <div class="details">
        <div class="de_left" style="flex:0.95;">时间<span>2019-07-02 14:33:21</span></div>
        <div class="btn">已完成</div>
      </div>
    </div>
    <div class="screen" v-if="screen" @click.self="close()">
      <div class="screen_data">
        <div class="xxt1">筛选</div>
        <div class="xxt2">筛选您想查看的数据</div>
        <div class="scr_tab">已发布</div>
        <div class="scr_tab">已完成</div>
        <div class="scr_tab">已下架</div>
        <div class="scr_tab" @click="close()">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'entrust',
  data () {
    return {
      unit: 'BTC',
      screen: false
    }
  },
  mounted () {
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    screen1 () {
      this.screen = true
    },
    close () {
      this.screen = false
    }
  }
}
</script>
<style scoped lang="scss">
.entrust{
  width: 100%;
  .header{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #353535;
    padding: 0 16px;
    box-sizing: border-box;
    .icon_left{
      width: 10px;
      height: 18px;
      img{
        width: 100%;
        display: block;
      }
    }
    .text_con{
      font-size:16px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
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
  .list{
    width: 100%;
    border-bottom: 1px solid #eeeeee;
    padding: 10px 9px;
    box-sizing: border-box;
    .details{
      width: 100%;
      height: 26px;
      display: flex;
      align-items: center;
      text-align: left;
      .de_left{
        width: 50%;
        font-size:14px;
        font-weight:400;
        color:rgba(0,0,0,0.5);
        span{
          display: inline-block;
          margin-left: 4px;
          font-size:14px;
          font-weight:400;
          color:rgba(0,0,0,0.85);
        }
      }
      .de_right{
        width: 50%;
        font-size:14px;
        font-weight:400;
        color:rgba(0,0,0,0.5);
        span{
          display: inline-block;
          margin-left: 4px;
          font-size:14px;
          font-weight:400;
          color:rgba(0,0,0,0.85);
        }
      }
      .btn{
        width:80px;
        height:25px;
        border-radius:4px;
        border:1px solid rgba(174,174,174,1);
        line-height: 25px;
        text-align: center;
        font-size:14px;
        color:rgba(0,0,0,0.5);
        }
    }
  }
  .screen{
    width:100%;
    height:100vh;
    background:rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    .screen_data{
      width: 85%;
      height: 240px;
      margin: auto;
      background:rgba(255,255,255,1);
      border-radius:10px;
      margin-top: calc(100vh - 250px);
      .xxt1{
        width:100%;
        height:40px;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(0,0,0,0.85);
        line-height:40px;
      }
      .xxt2{
        width:100%;
        height:20px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(0,0,0,0.5);
        line-height:20px;
        margin-bottom: 10px;
      }
      .scr_tab{
        width:100%;
        height:40px;
        font-size:16px;
        font-weight:400;
        color:rgba(0,142,187,1);
        line-height:40px;
      }
    }
  }
}
</style>
