<template>
  <div class="newChargeRecord">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">充值记录</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="hutyu">
      <div :class="active == 1 ? 'bbo' : 'cio'" @click="tou(1)">客服充值</div>
      <div :class="active == 2 ? 'bbo' : 'cio'" @click="tou(2)">自动充值</div>
    </div>
    <div class="content" v-if="list.length > 0 && active == 1">
      <div class="new_list" v-for="(item,index) in list" :key="index">
        <div class="name">充值 {{ item.rechargeNum }} USDT</div>
        <div class="huti">
          <span class="ui">{{ item.createTime }}</span>
          <span class="ui" v-if="item.status == 1">处理中</span>
          <span class="ui" v-if="item.status == 2">成功</span>
          <span class="ui" v-if="item.status == 3">失败</span>
          <!-- <span class="ui">123</span>
          <span class="bak">123 CWF</span> -->
        </div>
      </div>
    </div>
    <div v-if="list.length == 0 && active == 1" class="nower">
      <img src="../../assets/tupian/public_no_data.png" alt="暂无数据">
    </div>
    <div class="content" v-if="list1.length > 0 && active == 2">
      <div class="new_list" v-for="(item,index) in list1" :key="index">
        <div class="name">充值 {{ item.amount }} USDT</div>
        <div class="huti">
          <span class="ui">{{ item.createTime }}</span>
          <span class="ui" v-if="item.status == 1">处理中</span>
          <span class="ui" v-if="item.status == 2">成功</span>
          <span class="ui" v-if="item.status == 3">失败</span>
          <!-- <span class="ui">123</span>
          <span class="bak">123 CWF</span> -->
        </div>
      </div>
    </div>
    <div v-if="list1.length == 0 && active == 2" class="nower">
      <img src="../../assets/tupian/public_no_data.png" alt="暂无数据">
    </div>
  </div>
</template>

<script>
export default {
  name: 'newChargeRecord',
  data () {
    return {
      ID: '',
      page: {
        size: 100
      },
      list: [],
      list1: [],
      usdtAddr: '',
      active: '1'
    }
  },
  mounted () {
    this.ID = JSON.parse(sessionStorage.ID)
    // this.identifier = this.$route.query.ciuon
    this.init()
  },
  methods: {
    init () {
      this.$post('/api/recharge/manualList', {userId: this.ID, page: this.page})
        .then(res => {
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
    },
    tou (e) {
      this.active = e
      if (e === 2) {
        this.$post('/api/user/' + this.ID)
          .then(res => {
            if (res.data.page.records[0].usdtAddr) {
              this.usdtAddr = res.data.page.records[0].usdtAddr
              this.$post('/api/recharge/list', {userId: this.ID, page: this.page, addr: this.usdtAddr})
                .then(res => {
                  if (res.data.page) {
                    this.list1 = res.data.page.records
                  } else {
                    this.$message({
                      message: res.data.msg,
                      type: 'error'
                    })
                  }
                })
            } else {
              this.$post('/api/recharge/getAddress', {userId: this.ID})
                .then(res => {
                  this.usdtAddr = res.data.page.records[0].addr
                  this.$post('/api/recharge/list', {userId: this.ID, page: this.page, addr: this.usdtAddr})
                    .then(res => {
                      if (res.data.page) {
                        this.list1 = res.data.page.records
                      } else {
                        this.$message({
                          message: res.data.msg,
                          type: 'error'
                        })
                      }
                    })
                })
            }
            // this.assets = res.data.page.records[0]
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.newChargeRecord{
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
  .hutyu{
    width: 100%;
    height:30px;
    background:rgba(255,255,255,1);
    border-radius:6px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 6px 0;
    .cio{
      width:50%;
      height:17px;
      font-size:12px;
      font-weight:400;
      color:rgba(0,0,0,0.85);
      line-height:17px;
    }
    .bbo{
      width:50%;
      height:17px;
      font-size:12px;
      font-weight:400;
      color:rgba(234,111,90,1);
      line-height:17px;
      // border-bottom: 2px solid rgba(234,111,90,1);
      position: relative;
      // border-bottom-width:20px;
      &:after {
        content: " ";
        width: 20px;
        height: 2px;
        border-radius:2px;
        background: rgba(234,111,90,1);
        position: absolute;
        bottom: -0.1rem;
        left: 50%;
        transform: translateX(-50%);//居中处理
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
