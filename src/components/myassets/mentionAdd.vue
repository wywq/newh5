<template>
  <div class="mentionAdd">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">添加提现地址</div>
      <div class="icon_right">
      </div>
    </div>
    <input type="text" placeholder="请输入地址标签" class="ipt" v-model="label">
    <input type="text" placeholder="请输入提现地址" class="ipt" v-model="usdtOpenId">
    <div class="btn" @click="submit()">提交</div>
  </div>
</template>

<script>
export default {
  name: 'mentionAdd',
  data () {
    return {
      ID: '',
      label: '',
      usdtOpenId: ''
    }
  },
  mounted () {
    this.ID = JSON.parse(sessionStorage.ID)
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    submit () {
      if (this.usdtOpenId && this.label) {
        this.$post('/api/usdtAccount/add', {userId: this.ID, label: this.label, usdtOpenId: this.usdtOpenId})
          .then(res => {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.$router.go(-1)
            console.log(res)
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
.mentionAdd{
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
  .ipt{
    outline: none;
    width: 90%;
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
    width:90%;
    height:45px;
    background:rgba(234,111,90,1);
    border-radius:30px;
    margin-left: 5%;
    margin-top: calc(100vh - 280px);
    text-align: center;
    line-height: 45px;
    font-size:18px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
}
</style>
