<template>
  <div class="mentionManualRecord">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">提现记录</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content" v-if="list.length > 0">
      <div class="new_list" v-for="(item,index) in list" :key="index">
        <div class="name">{{ item.rechargeNum }} USDT</div>
        <div class="huti">
          <span class="ui">{{ item.createTime }}</span>
          <span class="bak" v-if="item.status == 1">处理中</span>
          <span class="bak" v-if="item.status == 2">成功</span>
          <span class="bak" v-if="item.status == 3">失败</span>
          <!-- <span class="bak">{{ item.status == 1 ? '处理中' : item.status == 2 ? '成功' : item.status == 3 ? '失败' }}</span> -->
          <!-- <span class="bak">123 CWF</span>
          <span class="ui">123</span>
          <span class="bak">123 CWF</span> -->
        </div>
      </div>
    </div>
    <div v-if="list.length == 0" class="nower">
      <img src="../../assets/tupian/public_no_data.png" alt="暂无数据">
    </div>
  </div>
</template>

<script>
export default {
  name: 'mentionManualRecord',
  data () {
    return {
      ID: '',
      page: {
        size: 100
      },
      list: []
    }
  },
  mounted () {
    this.ID = JSON.parse(sessionStorage.ID)
    this.init()
  },
  methods: {
    init () {
      this.$post('/api/usdtTransfer/manualList', {userId: this.ID, page: this.page})
        .then(res => {
          // this.list = res.data.page.records
          if (res.data.page) {
            this.list = res.data.page.records
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
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
.mentionManualRecord{
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
    .new_list{
      width: 100%;
      min-height:60px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      padding: 10px 24px;
      box-sizing: border-box;
      text-align: left;
      margin-top: 5px;
      .name{
        width: 100%;
        height:25px;
        font-size:18px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(0,0,0,0.85);
        line-height:25px;
      }
      .huti{
        width: 100%;
        .ui{
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(0,0,0,0.5);
          line-height:17px;
          margin-right: 5px;
        }
        .back{
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(0,0,0,0.85);
          line-height:17px;
          margin-right: 5px;
        }
      }
    }
  }
  .nower{
    width: 60px;
    margin-top:20px;
    margin: 20px auto;
    img{
      width: 100%;
      display: block;
    }
  }
}
</style>
