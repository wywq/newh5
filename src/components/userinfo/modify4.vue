<template>
  <div class="modify4">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">实名认证</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <input type="text" placeholder="输入您的真实姓名" class="ipt" v-model="name">
      <input type="text" placeholder="输入您的身份证号" class="ipt" v-model="idCard">
      <div class="btn" @click="submit()">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modify4',
  data () {
    return {
      name: '',
      idCard: '',
      ID: ''
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
      if (this.name && this.idCard) {
        this.$post('/api/user/verifyIdCard', {name: this.name, idcard: this.idCard, userId: this.ID})
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
          message: '请填写完整',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modify4{
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
