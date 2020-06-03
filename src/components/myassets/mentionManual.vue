<template>
  <div class="mentionManual">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">提现</div>
      <div class="icon_right" @click="record()">
        记录
      </div>
    </div>
    <div class="content">
      <div class="number">提现地址</div>
      <div class="dizi" @click="address()">
        <div class="dizi_detail">
          <div>{{ cuty_list.label ? cuty_list.label : '请选择地址' }}</div>
          <div>{{ cuty_list.usdtOpenId }}</div>
        </div>
        <div class="more">
          <img src="../../assets/tupian/public_table_right.png"/>
        </div>
      </div>
      <div class="number">提现数量</div>
      <div class="text_bs">
        <input type="number" placeholder="请输入" v-model="usdtNum"/>
        <span>USDT</span>
      </div>
      <div class="rmb">手续费 {{ cn_new }} USDT</div>
      <div class="number">手机验证码</div>
      <div class="lieb">
        <input type="number" placeholder="输入手机验证码" class="yzma" v-model="fio_code"/>
        <!-- <div class="riobcn">获取验证码</div> -->
        <div class="riobcn" @click="code()" v-if="yhsi">{{ getCode }}</div>
        <div v-if="!yhsi" class="miao">{{ getCode }}</div>
      </div>
      <div class="title">
        1、最小提现数量为：{{ cn_new1 }} USDT<br/>
        2、提现每笔手续费为：{{ cn_new }} USDT。<br/>
        3、为保障提现顺利，请您认真填写并核对提现地址。<br/>
        4、提交提现订单后，系统将自动审核，审核无误后，提取的USDT将自动存入您填写的提现地址中。
      </div>
      <!-- <input type="text" placeholder="输入要修改的昵称" class="ipt"> -->
    </div>
    <div class="btn" @click="submit()">确认提现</div>
  </div>
</template>

<script>
export default {
  name: 'mentionManual',
  data () {
    return {
      imageUrl: '',
      getCode: '获取验证码',
      yhsi: true,
      telCode: '',
      ID: '',
      phone: '',
      cuty_id: '',
      cuty_list: {},
      fio_code: '',
      usdtNum: '',
      usdtAddr: '',
      key: 'usdt_tran_fee_num',
      key1: 'usdt_tran_min_num',
      cn_new: '',
      cn_new1: ''
    }
  },
  mounted () {
    this.cuty_id = this.$route.params.id
    // this.fuier = this.$route.params.fuier
    this.ID = JSON.parse(sessionStorage.ID)
    this.init()
  },
  methods: {
    init () {
      this.$post('/api/user/' + this.ID)
        .then(res => {
          this.phone = res.data.page.records[0].telephone
          if (res.data.page.records[0].usdtAddr) {
            this.usdtAddr = res.data.page.records[0].usdtAddr
          } else {
            this.$post('/api/recharge/getAddress', {userId: this.ID})
              .then(res => {
                this.usdtAddr = res.data.page.records[0].addr
              })
          }
          // console.log(this.phone)
        })
        .catch(err => {
          console.log(err)
        })
      // 获取提币手续费
      this.$post('/api/param/valByKeys', {keys: [this.key]})
        .then(res => {
          this.cn_new = res.data.page.records[0].avalue
        })
        .catch(err => {
          console.log(err)
        })
      // 获取最小提币数量
      this.$post('/api/param/valByKeys', {keys: [this.key1]})
        .then(res => {
          this.cn_new1 = res.data.page.records[0].avalue
        })
        .catch(err => {
          console.log(err)
        })
      this.$post('/api/usdtAccount/' + this.cuty_id)
        .then(res => {
          this.cuty_list = res.data.page.records[0]
        })
        .catch(err => {
          console.log(err)
        })
    },
    back () {
      this.$router.push({
        path: `/myassets`
      })
    },
    code () {
      this.yhsi = false
      this.$post('/api/sms/send', {phone: this.phone})
        .then(res => {
          // console.log(res)
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
    address () {
      this.$router.push({
        path: `/mentionAddressMan`
      })
    },
    submit () {
      if (this.cuty_list.usdtOpenId) {
        if (this.usdtNum) {
          if (this.fio_code) {
            this.$post('/api/usdtTransfer/manualAdd', {iphone: this.phone, usdtAccountId: this.cuty_list.id, usdtNum: this.usdtNum, userId: this.ID, verifyCode: this.fio_code})
              .then(res => {
                if (res.data.code === 1) {
                  this.$message({
                    message: res.data.msg,
                    type: 'success'
                  })
                  this.$router.push({
                    path: `/myassets`
                  })
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
            message: '请输入数量',
            type: 'error'
          })
        }
      } else {
        this.$message({
          message: '请选择地址',
          type: 'error'
        })
      }
    },
    record () {
      this.$router.push({
        path: `/newMentionRecord`
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mentionManual{
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
      height:20px;
      font-size:14px;
      font-weight:400;
      color:rgba(0,0,0,0.85);
      line-height:20px;
    }
  }
  .content{
    width: 100%;
    padding: 0 18px;
    box-sizing: border-box;
    margin-top: 20px;
    .dizi{
      width: 100%;
      height:64px;
      border-radius:5px;
      border:1px solid rgba(0,0,0,0.15);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      box-sizing: border-box;
      margin-bottom: 16px;
      .dizi_detail{
        flex: 1;
        text-align: left;
        div:nth-child(1){
          height:22px;
          font-size:16px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(0,0,0,0.85);
          line-height:22px;
          margin-bottom: 3px;
        }
        div:nth-child(2){
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(0,0,0,0.5);
          line-height:17px;
        }
      }
      .more{
        width: 10px;
        img{
          width: 100%;
          display: block;
        }
      }
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
    .lieb{
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
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
      .miao{
        width:107px;
        height:40px;
        margin-left: 8px;
        background:rgba(234,111,90,1);
        color: rgba(0, 0, 0, 0.6);
        border-radius:4px;
        line-height: 40px;
        text-align: center;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        // color:rgba(255,255,255,1);
      }
    }
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
    .avatar-uploader{
      width:100px;
      img{
        width: 100%;
        display: block;
      }
    }
  }
  .ipt{
    outline: none;
    width: 100%;
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
    width:90%;
    height:45px;
    background:rgba(234,111,90,1);
    border-radius:30px;
    margin-left: 5%;
    margin-top: calc(100vh - 550px);
    text-align: center;
    line-height: 45px;
    font-size:18px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
}
</style>
