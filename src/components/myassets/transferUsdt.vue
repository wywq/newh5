<template>
  <div class="transferUsdt">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">转账</div>
      <div class="icon_right" @click="transferUsdtRecord()">
        记录
      </div>
    </div>
    <div class="content">
      <div class="number">转账人手机号</div>
      <div class="text_bs">
        <input type="number" placeholder="请输入" v-model="phone"/>
        <!-- <span>USDT</span> -->
      </div>
      <div class="number" style="margin-top:40px;">转账数量</div>
      <div class="text_bs">
        <input type="number" placeholder="请输入" v-model="cwf"/>
        <span>USDT</span>
      </div>
    </div>
    <div class="btn" @click="submit()">提交</div>
    <div class="tangj" v-if="tjr" @click.self="close()">
      <div class="desout">
        <div class="tis">提示</div>
        <div class="name" v-if="!name">查询到手机号为:{{ phone }}</div>
        <div class="name" v-if="!name">但该用户未实名认证是否要进行转账</div>
        <div class="name" v-if="name">查询到转账人姓名:{{ name }}</div>
        <div class="name" v-if="name">是否要进行转账</div>
        <div class="two">
          <div class="two_left" @click="close()">取消</div>
          <div class="two_right" @click="fuiobv()">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'transferUsdt',
  data () {
    return {
      tjr: false,
      cwf: '',
      phone: '',
      ID: '',
      name: ''
    }
  },
  mounted () {
    this.ID = JSON.parse(sessionStorage.ID)
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    transferUsdtRecord () {
      this.$router.push({
        path: `/transferUsdtRecord`
      })
    },
    submit () {
      if (this.phone && this.cwf) {
        this.$post('/api/user/getByAccount', {account: this.phone})
          .then(res => {
            if (res.data.page.records[0]) {
              this.name = res.data.page.records[0].name
              this.tjr = true
            } else {
              this.$message({
                message: '用户不存在',
                type: 'warning'
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$message({
          message: '请填写完整',
          type: 'warning'
        })
      }
    },
    close () {
      this.tjr = false
    },
    fuiobv () {
      this.$post('/api/asset/usdtTransfer', {amount: this.cwf, phone: this.phone, userId: this.ID})
        .then(res => {
          console.log(res)
          if (res.data.code === 1) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.$router.go(-1)
            this.tjr = false
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
            this.tjr = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.transferUsdt{
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
    padding: 0 30px;
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
  }
  .btn{
    width:90%;
    height:45px;
    background:rgba(234,111,90,1);
    border-radius:30px;
    margin-left: 5%;
    margin-top: calc(100vh - 360px);
    text-align: center;
    line-height: 45px;
    font-size:18px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .tangj{
    width: 100%;
    height: 100vh;
    background:rgba(0,0,0,0.25);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    .desout{
      width: 70%;
      padding-top: 24px;
      box-sizing: border-box;
      background-color: #ffffff;
      border-radius:10px;
      margin: auto;
      .tis{
        width: 100%;
        height: 22px;
        text-align: center;
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
