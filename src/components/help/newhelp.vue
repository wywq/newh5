<template>
  <div class="newhelp">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">新增咨询</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <textarea name="wene" id="" class="tean" placeholder="请输入咨询内容" v-model="userContent"></textarea>
    </div>
    <div class="btn" @click="submit()">提交</div>
  </div>
</template>

<script>
export default {
  name: 'newhelp',
  data () {
    return {
      ID: '',
      // replyContent: '',
      userContent: ''
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
      if (this.userContent) {
        this.$post('/api/feedbackHelp/add', {userContent: this.userContent, userId: this.ID})
          .then(res => {
            console.log(res)
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
          message: '请输入问题',
          type: 'error'
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.newhelp{
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
    padding: 0 24px;
    box-sizing: border-box;
    margin-top: 24px;
    .tean{
      width:100%;
      min-height:273px;
      border-radius:4px;
      border:1px solid rgba(0,0,0,0.1);
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(0,0,0,0.8);
      line-height:20px;
      text-indent: 1em;
      outline: none;
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
