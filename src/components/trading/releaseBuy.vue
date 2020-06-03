<template>
  <div class="releaseBuy">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">发布买入</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="title">
        1.C2C交易区卖USDT收取{{ cn_new1 }}%手续费<br/>
        2.单笔交易建议前往C2C页面直接交易<br/>
        3.多笔或经常交易建议在C2C页面发布广告<br/>
        4.发布广告不收取费用<br/>
        5.在发布广告时，USDT数量不得小于{{ cn_new }}枚
      </div>
      <div class="number">数量</div>
      <div class="text_bs">
        <input type="number" placeholder="输入数量" v-model="num"/>
        <span>USDT</span>
      </div>
      <div class="number">单价</div>
      <div class="text_bs">
        <input type="number" placeholder="输入单价" v-model="pay"/>
        <span>CNY</span>
      </div>
      <div class="number">支付密码</div>
      <div class="text_bs">
        <input type="password" placeholder="输入支付密码" v-model="password"/>
        <!-- <span>CNY</span> -->
      </div>
      <div class="number">备注</div>
      <div class="text_bs1">
        <textarea name="bu" cols="30" rows="10" placeholder="给对方的备注信息" v-model="remarks"></textarea>
      </div>
      <button class="btn" @click="submit()">发布买入</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'releaseBuy',
  data () {
    return {
      num: '',
      pay: '',
      ID: '',
      remarks: '',
      password: '',
      key: 'usdt_deal_min_num',
      cn_new: '',
      key1: 'usdt_deal_fee',
      cn_new1: ''
    }
  },
  mounted () {
    this.ID = JSON.parse(sessionStorage.ID)
    this.init()
  },
  methods: {
    init () {
      // 获取提币手续费
      this.$post('/api/param/valByKeys', {keys: [this.key]})
        .then(res => {
          this.cn_new = res.data.page.records[0].avalue
        })
        .catch(err => {
          console.log(err)
        })
      // 获取提币手续费
      this.$post('/api/param/valByKeys', {keys: [this.key1]})
        .then(res => {
          this.cn_new1 = res.data.page.records[0].avalue
        })
        .catch(err => {
          console.log(err)
        })
    },
    back () {
      this.$router.go(-1)
    },
    submit () {
      if (this.remarks && this.pay && this.num && this.password) {
        this.$post('/api/dealNo/add', { issueUserId: this.ID, dealType: 1, remarks: this.remarks, price: this.pay, coinNum: this.num, payPassword: this.password, userId: this.ID })
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
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$message({
          message: '请输入完整',
          type: 'error'
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.releaseBuy{
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
    padding: 0 24px;
    box-sizing: border-box;
    margin-top: 20px;
    .title{
      width:100%;
      text-align: left;
      // height:34px;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(0,0,0,0.85);
      line-height:17px;
      margin-bottom: 10px;
      margin-top: 20px;
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
      line-height: 40px;
      border-radius:4px;
      border:1px solid rgba(0,0,0,0.1);
      padding-right: 8px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      input{
        width: 70%;
        border: none;
        outline: none;
        text-indent: 1em;
        font-size: 14px;
      }
      span{
        font-size:12px;
        font-weight:400;
        color:rgba(0,0,0,0.5);
      }
    }
    .text_bs1{
      width: 100%;
      font-size: 20px;
      line-height: 26px;
      border-radius:4px;
      border:1px solid rgba(0,0,0,0.1);
      padding-right: 8px;
      box-sizing: border-box;
      textarea{
        width: 100%;
        border: none;
        outline: none;
        text-indent: 1em;
      }
    }
    .btn{
      width:100%;
      height:45px;
      background:rgba(104, 202, 164, 1);
      border-radius:30px;
      margin-top: 20px;
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
