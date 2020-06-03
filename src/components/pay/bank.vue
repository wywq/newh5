<template>
  <div class="bank">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">绑定银行卡</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="number">开户姓名</div>
      <div class="text_bs">
        <input type="text" placeholder="请输入开户姓名" v-model="name"/>
        <!-- <span>USDT</span> -->
      </div>
      <div class="number">银行卡号</div>
      <div class="text_bs">
        <input type="number" placeholder="请输入银行卡号" v-model="number"/>
        <!-- <span>USDT</span> -->
      </div>
      <div class="number">开户行</div>
      <div class="text_bs">
        <input type="text" placeholder="请输入开户行" v-model="openBank"/>
      </div>
      <div class="number">开户支行</div>
      <div class="text_bs">
        <input type="text" placeholder="请输入开户支行" v-model="branch"/>
      </div>
      <div class="number">支付密码</div>
      <div class="text_bs">
        <input type="password" placeholder="请输入支付密码" v-model="passWord"/>
        <!-- <span>USDT</span> -->
      </div>
      <div class="btn" @click="submit()" v-if="!bank_id">确认修改</div>
      <div class="btn" @click="submit1(bank_id)" v-if="bank_id">确认修改</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bank',
  data () {
    return {
      ID: '',
      name: '',
      number: '',
      openBank: '',
      branch: '',
      passWord: '',
      bank: {},
      bank_id: ''
    }
  },
  mounted () {
    this.ID = JSON.parse(sessionStorage.ID)
    this.init()
  },
  methods: {
    init () {
      this.$post('/api/payment/list', { userId: this.ID, payType: 3 })
        .then(res => {
          if (res.data.page.records[0]) {
            this.bank = res.data.page.records[0]
            this.name = res.data.page.records[0].accountName
            this.number = res.data.page.records[0].account
            this.openBank = res.data.page.records[0].openAccountAddr
            this.branch = res.data.page.records[0].openAccountSubAddr
            this.bank_id = res.data.page.records[0].id
          }
        })
    },
    back () {
      this.$router.go(-1)
    },
    submit () {
      if (this.name && this.number && this.openBank && this.branch && this.passWord) {
        let formData = new FormData()
        formData.append('userId', this.ID)
        formData.append('account', this.number)
        formData.append('accountName', this.name)
        formData.append('openAccountAddr', this.openBank)
        formData.append('openAccountSubAddr', this.branch)
        formData.append('payPassword', this.passWord)
        formData.append('payType', '3')
        this.$post('/api/payment/add', formData)
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
      } else {
        this.$message({
          message: '请输入完整',
          type: 'error'
        })
      }
    },
    submit1 (e) {
      if (this.name && this.number && this.openBank && this.branch && this.passWord) {
        let formData = new FormData()
        formData.append('userId', this.ID)
        formData.append('account', this.number)
        formData.append('accountName', this.name)
        formData.append('openAccountAddr', this.openBank)
        formData.append('openAccountSubAddr', this.branch)
        formData.append('payPassword', this.passWord)
        formData.append('payType', '3')
        formData.append('id', e)
        this.$post('/api/payment/update', formData)
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
.bank{
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
        width: 90%;
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
  }
  .btn{
    width:90%;
    height:45px;
    background:rgba(234,111,90,1);
    border-radius:30px;
    margin-left: 5%;
    margin-top: 150px;
    text-align: center;
    line-height: 45px;
    font-size:18px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
}
</style>
