<template>
  <div class="trading">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">C2C交易</div>
      <div class="icon_right" @click="modify7()">
        <img src="../../assets/tupian/navi_banding.png" alt="icon"/>
      </div>
    </div>
    <div class="content">
      <div class="houicn">
        <div class="ducio" @click="release_buy()">
          <div class="du_tbm">
            <img src="../../assets/tupian/c2c_buy.png" alt="icon"/>
          </div>
          <div class="du_text">发布买入</div>
        </div>
        <div class="ducio" @click="release_sell()">
          <div class="du_tbm">
            <img src="../../assets/tupian/c2c_sell.png" alt="icon"/>
          </div>
          <div class="du_text">发布卖出</div>
        </div>
        <div class="ducio" @click="myOrder(1)">
          <div class="du_tbm">
            <img src="../../assets/tupian/c2c_order.png" alt="icon"/>
          </div>
          <div class="du_text">我的订单</div>
        </div>
        <div class="ducio" @click="releaseManagement(1)">
          <div class="du_tbm">
            <img src="../../assets/tupian/c2c_manage.png" alt="icon"/>
          </div>
          <div class="du_text">我的广告</div>
        </div>
      </div>
      <div class="hutyu">
        <div :class="active == 1 ? 'bbo' : 'cio'" @click="tou(1)">我要买</div>
        <div :class="active == 2 ? 'bbo' : 'cio'" @click="tou(2)">我要卖</div>
      </div>
      <div class="rouvu" v-if="active == 1">
        <div class="list" v-for="(item,index) in list" :key="index">
          <div class="tnhdv">
            <div class="assers">
              <div class="name" v-if="item.user">{{ item.user ? item.user.nickname : '未实名' }}</div>
              <div style="display: flex;" v-for="(jkui,iu) in item.payments" :key="iu">
                <div class="tubm" v-if="jkui.payType == 1">
                  <img src="../../assets/tupian/c2c_wechat.png" alt="微信">
                </div>
                <div class="tubm" v-if="jkui.payType == 2">
                  <img src="../../assets/tupian/c2c_alipay.png" alt="支付宝">
                </div>
                <div class="tubm1" v-if="jkui.payType == 3">
                  <img src="../../assets/tupian/c2c_bank.png" alt="银行卡">
                </div>
              </div>
            </div>
            <div class="ctra">
              <span>数量</span>
              <span>{{ item.coinNum }} USDT</span>
              <span>单价</span>
              <span>{{ item.price }} CNY</span>
            </div>
          </div>
          <div class="buy" @click="buy(item.id)">买入</div>
        </div>
        <div v-if="list.length == 0" class="nower" style="margin-top:20px;">
          <img src="../../assets/tupian/public_no_data.png" alt="暂无数据">
        </div>
      </div>
      <div class="rouvu" v-if="active == 2">
        <div class="list" v-for="(item,index) in list1" :key="index">
          <div class="tnhdv">
            <div class="assers">
              <div class="name" v-if="item.user">{{ item.user ? item.user.nickname : '未实名' }}</div>
              <!-- <div class="tubm">
                <img src="../../assets/tupian/c2c_wechat.png" alt="微信">
              </div>
              <div class="tubm">
                <img src="../../assets/tupian/c2c_alipay.png" alt="微信">
              </div>
              <div class="tubm1">
                <img src="../../assets/tupian/c2c_bank.png" alt="微信">
              </div> -->
            </div>
            <div class="ctra">
              <span>数量</span>
              <span>{{ item.coinNum }} USDT</span>
              <span>单价</span>
              <span style="color:rgba(234, 111, 90, 1)">{{ item.price }} CNY</span>
            </div>
          </div>
          <div class="sell" @click="sell(item.id)">卖出</div>
        </div>
        <div v-if="list1.length == 0" class="nower" style="margin-top:20px;">
          <img src="../../assets/tupian/public_no_data.png" alt="暂无数据">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'trading',
  data () {
    return {
      active: '1',
      ID: '',
      page: {
        size: 100
      },
      statue: '1',
      list: [],
      list1: []
    }
  },
  mounted () {
    this.ID = JSON.parse(sessionStorage.ID)
    this.active = this.$route.params.id
    this.init()
  },
  methods: {
    init () {
      this.$post('/api/dealNo/list', { dealType: 2, page: this.page, status: [1] })
        .then(res => {
          this.list = res.data.page.records
        })
      this.$post('/api/dealNo/list', { dealType: 1, page: this.page, status: [1] })
        .then(res => {
          this.list1 = res.data.page.records
        })
    },
    back () {
      this.$router.push({
        path: `/`
      })
    },
    modify7 () {
      this.$router.push({
        path: `/modify7`
      })
    },
    myOrder (e) {
      this.$router.push({
        path: `/myOrder/${e}`
      })
    },
    releaseManagement (e) {
      this.$router.push({
        path: `/releaseManagement/${e}`
      })
    },
    buy (e) {
      this.$router.push({
        path: `/buy/${e}`
      })
    },
    sell (e) {
      this.$router.push({
        path: `/sell/${e}`
      })
    },
    tou (e) {
      this.active = e
      this.$router.push({
        path: `/trading/${e}`
      })
      if (e === 2) {
        this.$post('/api/dealNo/list', { dealType: 1, page: this.page, status: [1] })
          .then(res => {
            this.list1 = res.data.page.records
          })
      }
    },
    release_buy () {
      this.$router.push({
        path: `/releaseBuy`
      })
    },
    release_sell () {
      this.$router.push({
        path: `/releaseSell`
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.trading{
  width: 100%;
  min-height: 100vh;
  background-color: rgba(240,240,240,1);
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
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    margin-top: 6px;
    .houicn{
      width: 100%;
      height:80px;
      background:rgba(255,255,255,1);
      border-radius:6px;
      display: flex;
      align-items: center;
      .ducio{
        width: 25%;
        .du_tbm{
          width: 30px;
          margin: auto;
          img{
            width: 100%;
            display: block;
          }
        }
        .du_text{
          width:100%;
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(0,0,0,0.85);
          line-height:17px;
        }
      }
    }
    .hutyu{
      width: 100%;
      height:30px;
      background:rgba(255,255,255,1);
      border-radius:6px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 6px 0;
      .cio{
        width:50%;
        height:17px;
        font-size:12px;
        font-weight:400;
        color:rgba(0,0,0,0.85);
        line-height:17px;
      }
      .bbo{
        width:50%;
        height:17px;
        font-size:12px;
        font-weight:400;
        color:rgba(234,111,90,1);
        line-height:17px;
        // border-bottom: 2px solid rgba(234,111,90,1);
        position: relative;
        // border-bottom-width:20px;
        &:after {
          content: " ";
          width: 20px;
          height: 2px;
          border-radius:2px;
          background: rgba(234,111,90,1);
          position: absolute;
          bottom: -0.1rem;
          left: 50%;
          transform: translateX(-50%);//居中处理
        }
      }
    }
    .rouvu{
      width: 100%;
      .list{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 64px;
        background:rgba(255,255,255,1);
        border-radius:6px;
        padding: 0 21px;
        box-sizing: border-box;
        margin-bottom: 10px;
        .tnhdv{
          flex: 1;
          .assers{
            display: flex;
            align-items: center;
            .name{
              height:22px;
              font-size:16px;
              font-weight:500;
              color:rgba(0,0,0,0.85);
              line-height:22px;
            }
            .tubm{
              width: 16px;
              margin-left: 5px;
              img{
                width: 100%;
                display: block;
              }
            }
            .tubm1{
              width: 23px;
              margin-left: 5px;
              img{
                width: 100%;
                display: block;
              }
            }
          }
          .ctra{
            width: 100%;
            text-align: left;
            span:nth-child(1){
              height:17px;
              font-size:12px;
              font-weight:400;
              color:rgba(0,0,0,0.5);
              line-height:17px;
              display: inline-block;
            }
            span:nth-child(2){
              height:17px;
              font-size:12px;
              font-weight:400;
              color:rgba(0,0,0,0.85);
              line-height:17px;
              display: inline-block;
              margin-left: 3px;
            }
            span:nth-child(3){
              height:17px;
              font-size:12px;
              font-weight:400;
              color:rgba(0,0,0,0.5);
              line-height:17px;
              display: inline-block;
              margin-left: 8px;
            }
            span:nth-child(4){
              height:17px;
              font-size:12px;
              font-weight:400;
              color:rgba(104,202,164,1);
              line-height:17px;
              display: inline-block;
              margin-left: 3px;
            }
          }
        }
        .buy{
          width:35px;
          height:35px;
          background:rgba(104,202,164,1);
          border-radius:30px;
          line-height: 35px;
          text-align: center;
          font-size:10px;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
        .sell{
          width:35px;
          height:35px;
          background:rgba(234,111,90,1);
          border-radius:30px;
          line-height: 35px;
          text-align: center;
          font-size:10px;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
      }
      .nower{
        width: 60px;
        margin-top:20px;
        margin: 20px auto;
        img{
          width: 100%;
          display: block;
        }
      }
    }
  }
}
</style>
