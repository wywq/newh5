<template>
  <div class="buy">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">买入</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="assers">
        <div class="name">姓名</div>
        <div class="name" v-if="orderDetails.user">{{ orderDetails.user.name }}</div>
      </div>
      <div class="assers">
        <div class="name">单价</div>
        <div class="name" style="color:rgba(104,202,164,1);" v-if="orderDetails">{{ orderDetails.price }} CNY</div>
      </div>
      <div class="assers">
        <div class="name">支付方式</div>
        <div style="display: flex;" v-for="(jkui,iu) in orderDetails.payments" :key="iu">
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
      <div class="jsdh">备注</div>
      <div class="text">{{ orderDetails.remarks }}</div>
      <div class="number">数量</div>
      <div class="text_bs">
        <input type="text" placeholder="请输入" v-model="buy_price" @input="tyio()" readonly/>
        <span>USDT</span>
      </div>
      <div class="rmb">= {{ do_cny | xiaoshudian }} CNY</div>
      <div class="number">支付密码</div>
      <div class="text_bs">
        <input type="password" placeholder="输入支付密码" v-model="password"/>
        <!-- <span>CNY</span> -->
      </div>
      <button class="btn" @click="submit()">买入</button>
    </div>
    <!-- <div class="tangj" v-if="tjr" @click.self="close()">
      <div class="desout">
        <div class="tis">密码</div>
        <input type="password" class="ipt" v-model="password">
        <div class="two">
          <div class="two_left" @click.stop="close()">取消</div>
          <div class="two_right" @click.stop="confirm()">确定</div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'buy',
  data () {
    return {
      tjr: false,
      password: '',
      ID: '',
      buy_price: '',
      do_cny: '',
      sxf: '6.97',
      order_id: '',
      orderDetails: {}
    }
  },
  mounted () {
    this.ID = JSON.parse(sessionStorage.ID)
    this.order_id = this.$route.params.id
    this.init()
  },
  filters: {
    // *号省略
    xiaoshudian (value) {
      let realVal = ''
      if (!isNaN(value) && value !== '') {
        // 截取当前数据到小数点后两位
        realVal = parseFloat(value).toFixed(4)
      } else {
        realVal = '00.00'
      }
      return realVal
    }
  },
  methods: {
    init () {
      this.$post('/api/dealNo/list', {id: this.order_id})
        .then(res => {
          // console.log(res)
          this.orderDetails = res.data.page.records[0]
          this.buy_price = res.data.page.records[0].coinNum
          if (this.buy_price) {
            this.tyio()
          }
        })
    },
    back () {
      this.$router.go(-1)
    },
    tyio () {
      this.do_cny = this.buy_price * this.orderDetails.price
    },
    submit () {
      this.$post('/api/dealNo/placeDeal', { buyUserId: this.ID, dealNoId: this.order_id, sellUserId: this.orderDetails.issueUserId, payPassword: this.password, userId: this.ID })
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.buy{
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
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
    padding: 0 20px;
    box-sizing: border-box;
    margin-top: 20px;
    .assers{
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .name{
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(0,0,0,0.85);
        line-height:22px;
        margin-right: 6px;
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
    .jsdh{
      text-align: left;
      height:20px;
      font-size:14px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(0,0,0,0.85);
      line-height:20px;
    }
    .text{
      text-align: left;
      width:100%;
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(0,0,0,0.85);
      line-height:20px;
      margin-bottom: 10px;
    }
    .number{
      width: 100%;
      text-align: left;
      margin-bottom: 10px;
      height:20px;
      font-size:14px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(0,0,0,0.85);
      line-height:20px;
    }
    .text_bs{
      width: 100%;
      height:40px;
      border-radius:4px;
      border:1px solid rgba(0,0,0,0.1);
      padding: 0 15px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      input{
        width: 70%;
        border: none;
        outline: none;
        height: 38px;
        background: rgba(0, 0, 0, 0);
      }
      span{
        font-size:12px;
        font-weight:400;
        color:rgba(0,0,0,0.5);
      }
    }
    .rmb{
      width:100%;
      height:20px;
      font-size:14px;
      font-weight:400;
      color:rgba(0,0,0,0.5);
      line-height:20px;
      text-align: right;
      margin-top: 2px;
    }
    .btn{
      width:100%;
      height:45px;
      background:rgba(104, 202, 164, 1);
      border-radius:30px;
      margin-top: 100px;
      text-align: center;
      line-height: 45px;
      font-size:18px;
      font-weight:400;
      color:rgba(255,255,255,1);
      border: none;
    }
  }
}
</style>
