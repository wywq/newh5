<template>
  <div class="modify3">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">修改支付密码</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="lieb">
        <input type="text" placeholder="输入手机验证码" class="yzma" v-model="verifyCode"/>
        <div class="riobcn" @click="code" v-if="yhsi">{{ getCode }}</div>
        <div class="riobcn" @click="code" v-if="!yhsi">{{ getCode }}</div>
      </div>
      <input type="password" placeholder="输入新密码" class="ipt" v-model="newPassword">
      <input type="password" placeholder="再次输入新密码" class="ipt" v-model="oldPassword">
      <div class="btn" @click="submit()">确认修改</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modify3',
  data () {
    return {
      userin: {},
      ID: '',
      phone: '',
      getCode: '获取验证码',
      yhsi: true,
      telCode: '',
      verifyCode: '',
      newPassword: '',
      oldPassword: ''
    }
  },
  mounted () {
    this.ID = JSON.parse(sessionStorage.ID)
    this.init()
  },
  methods: {
    init () {
      // 用户详细信息
      this.$post('/api/user/' + this.ID)
        .then(res => {
          this.userin = res.data.page.records[0]
          this.phone = res.data.page.records[0].telephone
        })
        .catch(err => {
          console.log(err)
        })
    },
    code () {
      this.yhsi = false
      this.$post('/api/sms/send', {phone: this.phone})
        .then(res => {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
        })
      // let that = this
      this.telCode = '60'
      var TIME_COUNT = setInterval(() => {
        if (this.telCode <= 0) {
          this.yhsi = true
          clearInterval(TIME_COUNT)
          this.getCode = '获取验证码'
        } else {
          this.yhsi = false
          this.telCode--
          this.getCode = this.telCode + 'S后获取'
        }
      }, 1000)
    },
    submit () {
      if (this.newPassword === this.oldPassword) {
        if (this.verifyCode) {
          this.$post('/api/user/updatePayPassword', {identifier: this.phone, newPassword: this.newPassword, userId: this.ID, verifyCode: this.verifyCode})
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
            message: '请输入验证码',
            type: 'error'
          })
        }
      } else {
        this.$message({
          message: '两次密码不一致',
          type: 'error'
        })
      }
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modify3{
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
    width: 90%;
    margin: auto;
  }
  .lieb{
    width: 100%;
    height: 40px;
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
    .yzma{
      flex: 1;
      outline: none;
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
    .riobcn{
      margin-left: 8px;
      width:107px;
      height:40px;
      background:rgba(234,111,90,1);
      border-radius:4px;
      line-height: 40px;
      text-align: center;
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
  }
  .ipt{
    outline: none;
    width: 100%;
    margin-top: 15px;
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
  .btn{
    width:100%;
    height:45px;
    background:rgba(234,111,90,1);
    border-radius:30px;
    margin-top: calc(100vh - 320px);
    text-align: center;
    line-height: 45px;
    font-size:18px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
}
</style>
