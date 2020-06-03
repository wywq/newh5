<template>
  <div class="myassets">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">我的资产</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="accsed">
        <div class="vonbu">
          <div class="rou">USDT</div>
          <div class="cou">{{ assets.usdt }}</div>
        </div>
        <div class="pouie">
          <div @click="char()">充值</div>
          <div @click="mention()">提现</div>
          <div @click="usdt_zz()">转账</div>
          <div style="border:none;" @click="exchange()">CWF认购</div>
        </div>
      </div>
      <div class="accsed1">
        <div class="vonbu1">
          <div class="rou1">CWF</div>
          <div class="cou1">
            <div class="huji">{{ assets.cwf }}</div>
            <div class="cbvn">( 已理财 {{ buji.freeze + buji.extract }} )</div></div>
        </div>
        <div class="pouie1">
          <div @click="transfer()">转账</div>
          <div style="border:none;" @click="earnings()">基金理财</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myassets',
  data () {
    return {
      ID: '',
      assets: {},
      buji: {},
      manual_on_off: '',
      key3: 'manual_on_off',
      sxf3: ''
    }
  },
  mounted () {
    this.ID = JSON.parse(sessionStorage.ID)
    this.init()
  },
  methods: {
    init () {
      // 个人资产
      this.$post('/api/asset/' + this.ID)
        .then(res => {
          this.assets = res.data.page.records[0]
        })
        .catch(err => {
          console.log(err)
        })
      // 获取是否自动充币
      this.$post('/api/param/valByKeys', {keys: [this.key3]})
        .then(res => {
          this.sxf3 = res.data.page.records[0].avalue
        })
        .catch(err => {
          console.log(err)
        })
      // 已理财
      this.$post('/api/cwfFund/home', {userId: this.ID})
        .then(res => {
          this.buji = res.data.page.records[0]
        })
        .catch(err => {
          console.log(err)
        })
    },
    back () {
      this.$router.push({
        path: `/`
      })
    },
    char () {
      if (this.sxf3 === 0) {
        this.$router.push({
          path: `/chargeManual`
        })
      } else {
        this.$router.push({
          path: `/charge`
        })
      }
    },
    mention () {
      // this.$message({
      //   message: '系统维护中',
      //   type: 'success'
      // })
      if (this.sxf3 === 0) {
        this.$router.push({
          path: `/mentionManual`
        })
      } else {
        this.$router.push({
          path: `/mention`
        })
      }
      // this.$router.push({
      //   path: `/mention`
      // })
    },
    exchange () {
      this.$router.push({
        path: `/exchange`
      })
    },
    earnings () {
      this.$router.push({
        path: `/earnings`
      })
    },
    transfer () {
      this.$router.push({
        path: '/transfer'
      })
    },
    usdt_zz () {
      this.$router.push({
        path: '/transferUsdt'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.myassets{
  width: 100%;
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
  .content{
    padding: 0 10px;
    width: 100%;
    box-sizing: border-box;
    .accsed{
      width: 100%;
      height: 124px;
      background-image: url('../../assets/tupian/rect_usdt.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-top: 20px;
      .vonbu{
        padding: 20px 26px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        .rou{
          height:50px;
          font-size:36px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:50px;
        }
        .cou{
          height:33px;
          font-size:24px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:50px;
        }
      }
      .pouie{
        width: 100%;
        height: 33px;
        display: flex;
        align-items: center;
        div{
          width: calc(100% / 3);
          height:18px;
          line-height: 18px;
          border-right: 1px solid rgba(255, 255, 255, 1);
          font-size:16px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
      }
    }
    .accsed1{
      width: 100%;
      height: 124px;
      background-image: url('../../assets/tupian/rect_fb.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-top: 20px;
      .vonbu1{
        padding: 20px 26px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .rou1{
          height:50px;
          font-size:36px;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:50px;
        }
        .cou1{
          text-align: right;
          .huji{
            font-size:24px;
            font-weight:400;
            color:rgba(255,255,255,1);
            height: 24px;
          }
          .cbvn{
            width:100%;
            display: inline-block;
            height:14px;
            font-size:16px;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:14px;
            text-align: right;
          }
        }
      }
      .pouie1{
        width: 100%;
        height: 33px;
        display: flex;
        align-items: center;
        div{
          width: calc(100% / 2);
          height:18px;
          line-height: 18px;
          border-right: 1px solid rgba(255, 255, 255, 1);
          font-size:16px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
      }
    }
  }
}
</style>
