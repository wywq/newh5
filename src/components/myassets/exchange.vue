<template>
  <div class="mention">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">CWF认购</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="number">CWF</div>
      <div class="shul">兑换比例：{{ Math.round(bili * 100000) / 100000 }}/CWF</div>
      <div class="text_bs">
        <input type="text" placeholder="输入您想兑换的数量" @input="cwf()" v-model="cwf_number" @click="no_in()" readonly/>
        <span>CWF</span>
      </div>
      <div class="zhuanh">
        <img src="../../assets/tupian/wallet_exchange.png" alt="转换"/>
      </div>
      <div class="number">USDT</div>
      <div class="shul">可用：{{ assets.usdt }}</div>
      <div class="text_bs">
        <div @click="no_in()">{{ usdt_number | numFilter }}</div>
        <!-- <input type="text" placeholder="输入您要兑换的数量" @input="usdt()" v-model="usdt_number" @click="no_in()" readonly/> -->
        <span>USDT</span>
      </div>
      <div class="jklk">CWF认购每账户仅限一次<br>CWF认购价格每月进行相应调整</div>
    </div>
    <div class="btn" @click="submit()">CWF认购</div>
  </div>
</template>

<script>
export default {
  name: 'mention',
  data () {
    return {
      bili: '',
      ID: '',
      assets: {},
      usdt_number: '',
      cwf_number: '',
      akey: 'cwf_usdt_rate',
      akey1: 'start_num'
    }
  },
  mounted () {
    this.ID = JSON.parse(sessionStorage.ID)
    this.init()
  },
  filters: {
    numFilter (value) {
      let realVal = ''
      if (!isNaN(value) && value !== '') {
        // 截取当前数据到小数点后两位
        realVal = parseFloat(value).toFixed(6)
      } else {
        realVal = '--'
      }
      return realVal
    }
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
      // 获取首发数量
      this.$post('/api/param/valByKeys', {keys: [this.akey1]})
        .then(res => {
          this.cwf_number = res.data.page.records[0].avalue
          // 比例
          this.$post('/api/param/valByKeys', {keys: [this.akey]})
            .then(res => {
              this.bili = res.data.page.records[0].avalue
              if (this.bili) {
                this.usdt_number = this.cwf_number * this.bili
              }
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    usdt () {
      if (this.bili) {
        this.cwf_number = this.usdt_number / this.bili
      } else {
        this.usdt_number = ''
        this.cwf_number = ''
        this.$message({
          message: '正在获取比例',
          type: 'error'
        })
      }
    },
    cwf () {
      if (this.bili) {
        this.usdt_number = this.cwf_number * this.bili
      } else {
        this.usdt_number = ''
        this.cwf_number = ''
        this.$message({
          message: '正在获取比例',
          type: 'error'
        })
      }
    },
    no_in () {
      this.$message({
        message: '不可修改',
        type: 'error'
      })
    },
    submit () {
      if (this.cwf_number && this.usdt_number) {
        this.$post('/api/cwf/usdtConvertCwf', {userId: this.ID, usdt: parseFloat(this.usdt_number).toFixed(6)})
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
          message: '暂未开通',
          type: 'warning'
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
.mention{
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
    width: 100%;
    padding: 0 18px;
    box-sizing: border-box;
    margin-top: 20px;
    .number{
      width: 100%;
      text-align: left;
      margin-bottom: 3px;
      height:20px;
      font-size:16px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(0,0,0,0.85);
      line-height:20px;
    }
    .shul{
      width:100%;
      text-align: left;
      height:20px;
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(0,0,0,0.5);
      line-height:20px;
      margin-bottom: 8px;
    }
    .text_bs{
      width: 100%;
      height:40px;
      line-height: 40px;
      background:rgba(240,240,240,1);
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
        background-color: rgba(0, 0, 0, 0);
      }
      div{
        width: 70%;
        border: none;
        outline: none;
        text-indent: 1em;
        text-align: left;
        font-size: 14px;
        background-color: rgba(0, 0, 0, 0);
      }
      span{
        font-size:12px;
        font-weight:400;
        color:rgba(0,0,0,0.5);
      }
    }
    .jklk{
      height:40px;
      font-size:14px;
      font-weight:400;
      color:rgba(0,0,0,0.5);
      line-height:20px;
      margin-top: 13px;
      text-align: left;
    }
    .zhuanh{
      width: 14px;
      margin: 15px auto;
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
    margin-top: calc(100vh - 450px);
    text-align: center;
    line-height: 45px;
    font-size:18px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
}
</style>
