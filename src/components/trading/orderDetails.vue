<template>
  <div class="orderDetails">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">订单详情</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="progress">
        <div class="soiu">订单进度</div>
        <div class="xinix">
          <div class="kolijn" v-if="order_details.status == 2 || order_details.status == 3 || order_details.status == 4 || order_details.status == 5 || order_details.status == 6 || order_details.status == 7">
            <div>1</div>
            <div>待付款</div>
          </div>
          <div class="kolijn1" :class="order_details.status == 3 || order_details.status == 4 ? 'kolijn' : '' " v-if="order_details.status == 2 || order_details.status == 3 || order_details.status == 4">
            <div>2</div>
            <div>待释放</div>
          </div>
          <div class="kolijn1" :class="order_details.status == 4 ? 'kolijn' : '' " v-if="order_details.status == 2  || order_details.status == 3 || order_details.status == 4">
            <div>3</div>
            <div>已完成</div>
          </div>
          <div class="kolijn" v-if="order_details.status == 5">
            <div>2</div>
            <div>已取消</div>
          </div>
          <div class="kolijn" v-if="order_details.status == 6 || order_details.status == 7">
            <div>2</div>
            <div>待判定</div>
          </div>
          <div class="kolijn1" :class="order_details.status == 7 ? 'kolijn' : '' " v-if="order_details.status == 6 || order_details.status == 7">
            <div>3</div>
            <div>已判定</div>
          </div>
          <!-- <div class="kolijn1" v-if="order_details.status == 6">
            <div>3</div>
            <div>已判定</div>
          </div> -->
        </div>
      </div>
      <div class="orderdeta">
        <div class="soiu">订单信息</div>
        <!-- <div class="auocu">
          <span>编号</span>
          <span>1053421234566</span>
        </div> -->
        <div class="auocu">
          <span>类型</span>
          <span :style="fxdata.buyUserId == ID ? 'color:green' : 'color:red'">{{ fxdata.buyUserId == ID ? '买入' : '卖出' }}</span>
          <!-- <span :style="order_details.dealType !== 1 ? 'color: rgba(15,168,88,1);' : 'color:red'">{{ order_details.dealType !== 1 ? '买入' : '卖出' }}</span> -->
        </div>
        <div class="auocu">
          <span>数量</span>
          <span>{{ order_details.coinNum }}</span>
        </div>
        <div class="auocu">
          <span>金额</span>
          <span>{{ order_details.coinNum * order_details.price }} CNY</span>
        </div>
        <div class="auocu">
          <span>单价</span>
          <span>{{ order_details.price }} CNY</span>
        </div>
        <div class="auocu">
          <span>时间</span>
          <span>{{ order_details.createTime }} </span>
        </div>
        <div class="auocu" style="display: flex">
          <span>备注</span>
          <span style="flex:1">{{ order_details.remarks }}</span>
        </div>
      </div>
      <div class="paydetaile">
         <!-- v-if="fxdata.buyUserId == ID" -->
        <div>
          <div class="soiu">支付信息</div>
          <div v-for="(item,index) in pay" :key="index">
            <div class="wechat" v-if="item.payType == 1">
              <div class="wechat_tmb">
                <div class="fuo">
                  <img src="../../assets/tupian/c2c_wechat.png"/>
                </div>
                <div class="duo">微信支付</div>
              </div>
              <div class="wechat_accon">微信账号：{{ item.account }}</div>
              <div class="more" @click="more(item.imageUrl)">点击查看二维码</div>
            </div>
            <div class="alipay" v-if="item.payType == 2">
              <div class="wechat_tmb">
                <div class="fuo">
                  <img src="../../assets/tupian/c2c_alipay.png"/>
                </div>
                <div class="duo">支付宝</div>
              </div>
              <div class="wechat_accon">支付宝账号：{{ item.account }}</div>
              <div class="more" @click="more(item.imageUrl)">点击查看二维码</div>
            </div>
            <div class="bank" v-if="item.payType == 3">
              <div class="wechat_tmb">
                <div class="fuo">
                  <img src="../../assets/tupian/c2c_bank.png"/>
                </div>
                <div class="duo">银行卡</div>
              </div>
              <div class="wechat_accon">银行卡号：{{ item.account }} </div>
              <!-- <div class="wechat_accon">姓名 {{ item.accountName }} </div> -->
              <div class="more">开户信息：{{ item.accountName }} {{ item.openAccountAddr }} {{ item.openAccountSubAddr }}</div>
            </div>
          </div>
        </div>
        <div class="remaining">剩余时间</div>
        <div class="time">{{ last_m }}:{{ last_s }}</div>
        <div class="shifn" v-if="order_details.status == 6">等待系统判定</div>
        <div v-if="fxdata.buyUserId == ID">
          <div class="submit" v-if="order_details.status == 2">
            <div class="succ" @click="payment()">标记付款</div>
            <div class="err_wer" @click="cancel()">取消订单</div>
          </div>
          <div class="shifn" v-if="order_details.status == 3">等待卖家释放</div>
          <div class="shifn" style="background:rgba(77,77,77,1);" v-if="order_details.status == 4 || order_details.status == 5 || order_details.status == 7">已完成</div>
        </div>
        <div v-if="fxdata.sellUserId == ID">
          <div class="submit" v-if="order_details.status == 2">
            <div class="succ" style="background:rgba(174, 174, 174, 1);">等待买家付款</div>
            <div class="err_wer" style="background:rgba(174, 174, 174, 1);">取消订单</div>
          </div>
          <div class="shifn" style="background:rgba(234, 111, 90, 1);" v-if="order_details.status == 3" @click="finish()">释放钱包</div>
          <div class="shifn" style="background:rgba(77,77,77,1);" v-if="order_details.status == 4 || order_details.status == 7">已完成</div>
        </div>
      </div>
    </div>
    <div class="tangj" v-if="tjr" @click.self="close()">
      <div class="desout">
        <div class="tis">密码</div>
        <input type="password" class="ipt" v-model="password">
        <div class="two">
          <div class="two_left" @click.stop="close()">取消</div>
          <div class="two_right" @click.stop="confirm()">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderDetails',
  data () {
    return {
      tjr: false,
      ID: '',
      giouto: '',
      last_m: '',
      last_s: '',
      order_id: {},
      order_details: {},
      pay: {},
      password: '',
      fxdata: {},
      buy_sell: false
    }
  },
  mounted () {
    this.ID = JSON.parse(sessionStorage.ID)
    this.order_id = this.$route.params.id
    this.fxdata = JSON.parse(this.$route.query.fxdata)
    this.init()
  },
  methods: {
    init () {
      console.log(this.fxdata)
      this.$post('/api/dealNo/' + this.order_id)
        .then(res => {
          this.order_details = res.data.page.records[0]
          // this.pay = res.data.page.records[0].payments
          this.giouto = res.data.page.records[0].createTime
          if (this.giouto) {
            this.time_co()
          }
        })
      this.$post('/api/payment/list', {userId: this.fxdata.sellUserId})
        .then(res => {
          this.pay = res.data.page.records
        })
      // console.log(this.fxdata.issueUserId === this.fxdata.sellUserId)
      if (this.ID === this.fxdata.buyUserId) {
        this.buy_sell = true
        // console.log(this.buy_sell)
      } else if (this.ID === this.fxdata.sellUserId) {
        this.buy_sell = false
        // console.log(this.buy_sell)
      }
    },
    back () {
      this.$router.go(-1)
    },
    more (e) {
      this.$router.push({
        path: `/qrCode`,
        query: {
          id: e
        }
      })
    },
    close () {
      this.tjr = false
    },
    // 买家取消订单
    cancel (e) {
      this.$post('/api/dealNo/cancelDeal/' + this.order_id)
        .then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.$router.go(-1)
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
        })
    },
    // 买家已付款
    payment () {
      this.$post('/api/dealNo/finishPay', {userId: this.ID, id: this.order_id})
        .then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            // this.$router.go(-1)
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
          this.init()
        })
    },
    // 卖家释放钱包
    finish () {
      this.tjr = true
    },
    confirm () {
      this.$post('/api/dealNo/finishDeal', {userId: this.ID, id: this.order_id, payPassword: this.password})
        .then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.$router.go(-1)
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
          this.init()
          this.tjr = false
        })
    },
    // 倒计时
    time_co () {
      // 备用
      let stringTime = this.giouto // 返回时间
      let timestamp1 = stringTime.replace(/-/g, '/')
      let timestamp2 = new Date(timestamp1).getTime()
      let nowTime = new Date().getTime()
      let subtract = nowTime - timestamp2
      let day = parseInt(subtract / 86400000) // 天
      let minusDay = subtract - parseInt(day) * 86400000
      let hour = parseInt(minusDay / 3600000) // 小时
      let minusHour = minusDay - parseInt(hour) * 3600000
      this.last_m = parseInt(minusHour / 60000) // 分
      let minusMinute = minusHour - parseInt(this.last_m) * 60000
      this.last_s = parseInt(minusMinute / 1000) // 秒
      // console.log(this.last_s)
      if (subtract > 1800000) {
        this.last_m = '00'
        this.last_s = '00'
      } else {
        // 1
        let bouier = 29 - this.last_m
        let bouier1 = 60 - this.last_s
        if (bouier < 10) {
          this.last_m = '0' + bouier
        } else {
          this.last_m = bouier
        }
        if (bouier1 < 10) {
          this.last_s = '0' + bouier1
        } else {
          this.last_s = bouier1
        }
        setInterval(() => {
          this.time_co()
        }, 1000)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.orderDetails{
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
    margin-top: 10px;
    .progress{
      width: 100%;
      height:120px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      padding: 8px 10px;
      box-sizing: border-box;
      .soiu{
        height:20px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(0,0,0,0.85);
        line-height:20px;
        padding-left: 4px;
        border-left: 3px solid rgba(234,111,90,1);
        text-align: left;
      }
      .xinix{
        width: 90%;
        margin: auto;
        display: flex;
        justify-content: space-around;
        margin-top: 6px;
        .kolijn{
          width:90px;
          height:78px;
          background:rgba(234,111,90,1)!important;
          border-radius:4px;
          color: rgba(255,255,255,1)!important;
          padding: 14px 0;
          box-sizing: border-box;
          div:nth-child(1){
            width:100%;
            height:33px;
            font-size:24px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1)!important;
            line-height:33px;
          }
          div:nth-child(2){
            width:100%;
            height:20px;
            font-size:14px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1)!important;
            line-height:20px;
          }
        }
        .kolijn1{
          width:90px;
          height:78px;
          background:rgba(228,228,228,1);
          border-radius:4px;
          color: rgba(0, 0, 0, 0.85);
          padding: 14px 0;
          box-sizing: border-box;
          div:nth-child(1){
            width:100%;
            height:33px;
            font-size:24px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(0, 0, 0, 0.85);
            line-height:33px;
          }
          div:nth-child(2){
            width:100%;
            height:20px;
            font-size:14px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(0, 0, 0, 0.85);
            line-height:20px;
          }
        }
      }
    }
    .orderdeta{
      width: 100%;
      background:rgba(255,255,255,1);
      border-radius:4px;
      padding: 8px 10px;
      box-sizing: border-box;
      margin: 10px 0;
      .soiu{
        height:20px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(0,0,0,0.85);
        line-height:20px;
        padding-left: 4px;
        border-left: 3px solid rgba(234,111,90,1);
        text-align: left;
      }
      .auocu{
        width: 100%;
        text-align: left;
        height: 30px;
        line-height: 30px;
        span:nth-child(1){
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(0,0,0,0.5);
          line-height:17px;
          display: inline-block;
          margin-right: 4px;
        }
        span:nth-child(2){
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(0, 0, 0, 0.85);
          line-height:17px;
          display: inline-block;
          // margin-right: 8px;
        }
      }
    }
    .paydetaile{
      width: 100%;
      background:rgba(255,255,255,1);
      border-radius:4px;
      padding: 8px 10px;
      box-sizing: border-box;
      .soiu{
        height:20px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(0,0,0,0.85);
        line-height:20px;
        padding-left: 4px;
        border-left: 3px solid rgba(234,111,90,1);
        text-align: left;
      }
      .wechat{
        width:340px;
        height:70px;
        background:rgba(54,206,79,1);
        border-radius:10px;
        padding: 6px 22px;
        box-sizing: border-box;
        color: rgba(255,255,255,1);
        margin-top: 10px;
        .wechat_tmb{
          display: flex;
          align-items: center;
          .fuo{
            width: 19px;
            img{
              width: 100%;
              display: block;
            }
          }
          .duo{
            height:22px;
            font-size:16px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:22px;
            margin-left: 5px;
          }
        }
        .wechat_accon{
          height:20px;
          font-size:14px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:20px;
          text-align: left;
        }
        .more{
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,0.8);
          line-height:17px;
          text-align: left;
        }
      }
      .alipay{
        width:340px;
        height:70px;
        background:rgba(86, 183, 223, 1);
        border-radius:10px;
        padding: 6px 22px;
        box-sizing: border-box;
        color: rgba(255,255,255,1);
        margin-top: 10px;
        .wechat_tmb{
          display: flex;
          align-items: center;
          .fuo{
            width: 19px;
            img{
              width: 100%;
              display: block;
            }
          }
          .duo{
            height:22px;
            font-size:16px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:22px;
            margin-left: 5px;
          }
        }
        .wechat_accon{
          height:20px;
          font-size:14px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:20px;
          text-align: left;
        }
        .more{
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,0.8);
          line-height:17px;
          text-align: left;
        }
      }
      .bank{
        width:340px;
        height:70px;
        background:rgba(124, 124, 124, 1);
        border-radius:10px;
        padding: 6px 22px;
        box-sizing: border-box;
        color: rgba(255,255,255,1);
        margin-top: 10px;
        .wechat_tmb{
          display: flex;
          align-items: center;
          .fuo{
            width: 21px;
            img{
              width: 100%;
              display: block;
            }
          }
          .duo{
            height:22px;
            font-size:16px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:22px;
            margin-left: 5px;
          }
        }
        .wechat_accon{
          height:20px;
          font-size:14px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:20px;
          text-align: left;
        }
        .more{
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,0.8);
          line-height:17px;
          text-align: left;
        }
      }
      .remaining{
        width:100%;
        height:20px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(0,0,0,0.85);
        line-height:20px;
        margin-top: 15px;
      }
      .time{
        width:100%;
        height:29px;
        font-size:21px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(0,0,0,0.85);
        line-height:29px;
        margin-bottom: 15px;
      }
      .submit{
        width: 90%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .succ{
          width:45%;
          height:35px;
          background:rgba(234,111,90,1);
          border-radius:4px;
          font-size:14px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:35px;
        }
        .err_wer{
          width:45%;
          height:35px;
          background:rgba(77, 77, 77, 1);
          border-radius:4px;
          font-size:14px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:35px;
        }
      }
      .shifn{
        width:150px;
        height:35px;
        background:rgba(174,174,174,1);
        border-radius:4px;
        margin: auto;
        font-size:14px;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:35px;
      }
    }
  }
  .tangj{
    width: 100%;
    height: 100vh;
    background:rgba(0,0,0,0.25);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    .desout{
      width: 70%;
      padding-top: 24px;
      box-sizing: border-box;
      background-color: #ffffff;
      border-radius:10px;
      margin: auto;
      .ipt{
        outline: none;
        width: 90%;
        text-indent: 1em;
        height:40px;
        line-height: 40px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(0,0,0,0.7);
      }
      .tis{
        width: 90%;
        height: 22px;
        margin: auto;
        text-align: left;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(0,0,0,0.85);
        line-height:22px;
        margin-bottom: 7px;
      }
      .name{
        width: 100%;
        text-align: center;
        height:20px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(0,0,0,0.85);
        line-height:20px;
      }
      .two{
        margin-top: 11px;
        width: 100%;
        height:40px;
        display: flex;
        align-items: center;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        .two_left{
          width: 50%;
          border-right: 1px solid rgba(0, 0, 0, 0.1);
          height: 40px;
          line-height: 40px;
          font-size:16px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(0,0,0,0.85);
        }
        .two_right{
          width: 50%;
          height: 40px;
          line-height: 40px;
          font-size:16px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(234, 111, 90, 1);
        }
      }
    }
  }
}
</style>
