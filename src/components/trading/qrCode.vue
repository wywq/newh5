<template>
  <div class="earnings">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">二维码</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="tmb">
        <img :src="imgUrl" alt="二维码"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'earnings',
  data () {
    return {
      imgUrl: ''
    }
  },
  mounted () {
    this.imgUrl = this.$route.query.id
    // console.log(this.imgUrl)
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.earnings{
  width: 100%;
  min-height: 100vh;
  background-color: rgba(240,240,240,1);
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
    padding: 0 10px;
    box-sizing: border-box;
    margin-top: 20px;
    .tmb{
      width: 280px;
      margin: auto;
      img{
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
