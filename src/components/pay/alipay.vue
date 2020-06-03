<template>
  <div class="alipay">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">绑定支付宝</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="number">支付宝账号</div>
      <div class="text_bs">
        <input type="text" placeholder="请输入支付宝账号" v-model="num"/>
        <!-- <span>USDT</span> -->
      </div>
      <div class="number">支付密码</div>
      <div class="text_bs">
        <input type="password" placeholder="请输入支付密码" v-model="passWord"/>
        <!-- <span>USDT</span> -->
      </div>
      <div class="number">转账二维码</div>
      <input type="file" @change="addimg($event)" id="fileId">
      <div class="giun">
        <img :src = valueUrl  v-if="valueUrl">
      </div>
    </div>
    <div class="btn" @click="submit()" v-if="!terId">确认修改</div>
    <div class="btn" @click="submit1(terId)" v-if="terId">确认修改</div>
  </div>
</template>

<script>
export default {
  name: 'alipay',
  data () {
    return {
      ID: '',
      num: '',
      der: '',
      valueUrl: '',
      files: '',
      passWord: '',
      alipay: {},
      terId: ''
    }
  },
  mounted () {
    this.ID = JSON.parse(sessionStorage.ID)
    this.init()
  },
  methods: {
    init () {
      this.$post('/api/payment/list', { userId: this.ID, payType: 2 })
        .then(res => {
          if (res.data.page.records[0]) {
            this.alipay = res.data.page.records[0]
            this.num = res.data.page.records[0].account
            this.valueUrl = res.data.page.records[0].imageUrl
            this.files = res.data.page.records[0].imageUrl
            this.terId = res.data.page.records[0].id
            // console.log(this.files)
          }
        })
    },
    back () {
      this.$router.go(-1)
    },
    addimg (event) {
      console.log(event.target.files[0])
      this.files = event.target.files[0]
      // this.unkdh.files = document.getElementById('fileId').files // 获取文件流
      this.goin = document.getElementById('fileId').files[0] // 获取文件流
      // console.log(this.unkdh.files)
      this.der = event
      let _this = this
      let files = event.target.files[0]
      if (!event || !window.FileReader) return // 看支持不支持FileReader
      let reader = new FileReader()
      reader.readAsDataURL(files) // 这里是最关键的一步，转换就在这里
      reader.onloadend = function () {
        _this.valueUrl = this.result
        // _this.isShow = true
      }
    },
    submit () {
      if (this.num) {
        if (this.files) {
          if (this.passWord) {
            let formData = new FormData()
            formData.append('userId', this.ID)
            formData.append('account', this.num)
            formData.append('payPassword', this.passWord)
            formData.append('payType', '2')
            formData.append('files', this.files)
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
              message: '请输入支付密码',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '请上传二维码',
            type: 'error'
          })
        }
      } else {
        this.$message({
          message: '请输入支付宝账号',
          type: 'error'
        })
      }
    },
    submit1 (e) {
      if (this.num) {
        if (this.files) {
          if (this.passWord) {
            let formData = new FormData()
            formData.append('userId', this.ID)
            formData.append('account', this.num)
            formData.append('payPassword', this.passWord)
            formData.append('payType', '2')
            formData.append('id', e)
            formData.append('files', this.files)
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
              message: '请输入支付密码',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '请上传二维码',
            type: 'error'
          })
        }
      } else {
        this.$message({
          message: '请输入支付宝账号',
          type: 'error'
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.alipay{
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
    .giun{
      width: 200px;
      min-height: 200px;
      margin-top: 20px;
      img{
        width: 100%;
        display: block;
      }
    }
  }
  .btn{
    width:90%;
    height:45px;
    background:rgba(234,111,90,1);
    border-radius:30px;
    margin-left: 5%;
    margin-top: 70px;
    text-align: center;
    line-height: 45px;
    font-size:18px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
}
</style>
