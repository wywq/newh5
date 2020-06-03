<template>
  <div class="earnings">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">咨询详情</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="zixun">
        <span class="shu"></span>
        <span class="zx_text">我的咨询</span>
      </div>
      <div class="gureo">
        {{ detail.userContent }}
      </div>
      <div class="time">{{ detail.createTime }}</div>
    <div class="zixun">
        <span class="shu"></span>
        <span class="zx_text">客服解答</span>
      </div>
      <div class="gureo">
        {{ detail.replyContent ? detail.replyContent : '暂未回答' }}
      </div>
      <div class="time" v-if="detail.replyContent">{{ detail.replyTime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'earnings',
  data () {
    return {
      id: '',
      detail: {}
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.init()
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    init () {
      // console.log(this.id)
      this.$post('/api/feedbackHelp/' + this.id)
        .then(res => {
          this.detail = res.data.page.records[0]
          // this.list = res.data.page.records
          // console.log(res)
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
.earnings{
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
    padding: 0 10px;
    box-sizing: border-box;
    margin-top: 30px;
    .zixun{
      width: 100%;
      text-align: left;
      height: 40px;
      display: flex;
      align-items: center;
      .shu{
        width: 5px;
        height: 15px;
        display: inline-block;
        background:rgba(234,111,90,1);
        margin-right: 5px;
      }
      .zx_text{
        height:22px;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(0,0,0,0.85);
        line-height:22px;
      }
    }
    .gureo{
      margin-left: 10px;
      width:100%;
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(0,0,0,0.85);
      line-height:20px;
      text-align: left;
    }
    .time{
      width:100%;
      height:17px;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(0,0,0,0.5);
      line-height:17px;
      text-align: right;
      margin-top: 10px;
    }
  }
}
</style>
