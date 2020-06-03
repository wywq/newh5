<template>
  <div class="noticeDetails">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">公告详情</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="ward">{{ detail.title }}</div>
      <!-- <div class="time">{{ detail.createTime }}</div> -->
      <div class="taectad" v-html="fegui"></div>
      <!-- <div class="taectad">{{ rex }}</div> -->
      <div class="time">{{ detail.createTime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'noticeDetails',
  data () {
    return {
      id: '',
      detail: '',
      rex: '',
      fegui: ''
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.init()
  },
  filters: {
    zhuan (str) {
      this.rex = str.replace(/\n|\r\n/g, '<br/>')
      return str.replace(/\n|\r\n/g, '<br/>')
    }
  },
  methods: {
    init () {
      this.$post('/api/notice/' + this.id)
        .then(res => {
          this.detail = res.data.page.records[0]
          this.str = this.detail.content
          this.fegui = this.str.replace(/\n|\r\n/g, '<br/>')
          // this.str = this.detail.content .replace(/↵/g, '\n')
          // this.list = res.data.page.records
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.noticeDetails{
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
    padding: 0 20px;
    box-sizing: border-box;
    margin-top: 10px;
    text-align: left;
    .ward{
      width:100%;
      height:22px;
      font-size:16px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(0,0,0,0.85);
      line-height:22px;
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
    }
    .taectad{
      width:100%;
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(0,0,0,0.5);
      line-height:17px;
      margin-top: 10px;
      // text-indent: 1em;
    }
  }
}
</style>
