<template>
  <div class="team">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">支付绑定</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="list" @click="wechat()">
      <div class="list_text">微信</div>
      <div class="hionbj">
        <div style="margin-right: 3px; font-size: 14px; color:#666;">{{ wechat1 ? '已绑定' : '未绑定' }}</div>
        <div class="more">
          <img src="../../assets/tupian/public_table_right.png" alt="更多"/>
        </div>
      </div>
    </div>
    <div class="list" @click="alipay()">
      <div class="list_text">支付宝</div>
      <div class="hionbj">
        <div style="margin-right: 3px; font-size: 14px; color:#666;">{{ alipay1 ? '已绑定' : '未绑定' }}</div>
        <div class="more">
          <img src="../../assets/tupian/public_table_right.png" alt="更多"/>
        </div>
      </div>
    </div>
    <div class="list" @click="bank()">
      <div class="list_text">银行卡</div>
      <div class="hionbj">
        <div style="margin-right: 3px; font-size: 14px; color:#666;">{{ bank1 ? '已绑定' : '未绑定' }}</div>
        <div class="more">
          <img src="../../assets/tupian/public_table_right.png" alt="更多"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'team',
  data () {
    return {
      ID: '',
      page: {
        size: 100
      },
      chuji: [],
      binding: {},
      wechat1: false,
      alipay1: false,
      bank1: false
    }
  },
  mounted () {
    this.ID = JSON.parse(sessionStorage.ID)
    this.init()
  },
  filters: {
    // *号省略
    hideMiddle (val) {
      if (val) {
        return `${val.substring(0, 3)}****${val.substring(val.length - 3)}`
      }
    }
  },
  methods: {
    init () {
      this.$post('/api/user/getRemAccounts', {id: this.ID, page: this.page})
        .then(res => {
          this.chuji = res.data.page.records
        })
      this.$post('/api/payment/list', { userId: this.ID })
        .then(res => {
          this.binding = res.data.page.records
          for (let i = 0; i < this.binding.length; i++) {
            if (this.binding[i].payType === 1) {
              this.wechat1 = true
              // console.log(this.wechat1)
            } else if (this.binding[i].payType === 1) {
              this.alipay1 = true
              // console.log(this.alipay1)
            } else if (this.binding[i].payType === 1) {
              this.bank1 = true
              // console.log(this.bank1)
            }
          }
          // console.log(res)
        })
    },
    back () {
      this.$router.go(-1)
    },
    wechat () {
      this.$router.push({
        path: `/wechat`
      })
    },
    alipay () {
      this.$router.push({
        path: `/alipay`
      })
    },
    bank () {
      this.$router.push({
        path: `/bank`
      })
    },
    eruswd (e) {
      this.$router.push({
        path: `/teamDetails/${e}`
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.team{
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
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
  .list{
    width: 100%;
    height: 48px;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    .list_text{
      font-size:14px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(0,0,0,0.85);
    }
    .hionbj{
      display: flex;
      align-items: center;
      .more{
        width: 9px;
        img{
          width: 100%;
          display: block;
        }
      }
    }
  }
}
</style>
