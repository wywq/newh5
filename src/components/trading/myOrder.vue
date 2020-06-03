<template>
  <div class="myOrder">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">我的订单</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="hutyu">
        <div :class="active == 1 ? 'bbo' : 'cio'" @click="tou(1)">当前订单</div>
        <div :class="active == 2 ? 'bbo' : 'cio'" @click="tou(2)">历史订单</div>
      </div>
      <div class="rouvu" v-if="active == 1">
        <div class="list" v-for="(item,index) in list" :key="index" @click="orderDetails(item.id, item)">
          <div class="tnhdv">
            <div class="assers">
              <div class="name" :style="item.buyUserId == ID ? 'color:green' : 'color:red'">{{ item.buyUserId == ID ? '买入' : '卖出' }}</div>
              <div class="name">{{ item.coinNum }} USDT</div>
            </div>
            <div class="ctra">
              <span>交易伙伴</span>
              <span>{{ item.buyUserId == ID ? item.sellerAccount : item.buyerAccount }}</span>
              <span>单价</span>
              <span>{{ item.price }} CNY</span>
            </div>
          </div>
          <div class="buy" v-if="item.status == 2">待付款</div>
          <div class="buy" v-if="item.status == 3">待释放</div>
          <div class="buy" style="border:1px solid rgba(234,111,90,1);color:rgba(234,111,90,1);" v-if="item.status == 6">待判定</div>
          <!-- <div class="buy" style="border:1px solid rgba(241,170,0,1);color:rgba(241,170,0,1);" v-if="item.status == 5">已释放</div> -->
          <!-- <div class="buy" v-if="item.status == 6">已下单</div> -->
        </div>
        <div v-if="list.length == 0" class="nower" style="margin-top:20px;">
          <img src="../../assets/tupian/public_no_data.png" alt="暂无数据">
        </div>
      </div>
      <div class="rouvu" v-if="active == 2">
        <div class="list" v-for="(item,index) in list1" :key="index" @click="orderDetails(item.id, item)">
          <div class="tnhdv">
            <div class="assers">
              <!-- <div class="name" style="color:green" v-if="item.buyUserId == ID">买入</div>
              <div class="name" style="color:green" v-if="item.sellUserId == ID">卖出</div> -->
              <div class="name" :style="item.buyUserId == ID ? 'color:green' : 'color:red'">{{ item.buyUserId == ID ? '买入' : '卖出' }}</div>
              <div class="name">{{ item.coinNum }} USDT</div>
            </div>
            <div class="ctra">
              <span>交易伙伴</span>
              <span>{{ item.buyUserId == ID ? item.sellerAccount : item.buyerAccount }}</span>
              <!-- <span v-if="item.sellUserId == ID">{{ item.buyerAccount }}</span>
              <span v-if="item.buyUserId == ID">{{ item.sellerAccount }}</span> -->
              <span>单价</span>
              <span>{{ item.price }} CNY</span>
            </div>
          </div>
          <div class="buy" style="border:1px solid rgba(241,170,0,1);color:rgba(241,170,0,1);" v-if="item.status == 4">已完成</div>
          <div class="buy" style="border:1px solid rgba(174, 174, 174, 1);color:rgba(0, 0, 0, 0.5);" v-if="item.status == 5">已取消</div>
          <div class="buy" style="border:1px solid rgba(241,170,0,1);color:rgba(241,170,0,1);" v-if="item.status == 7">已判定</div>
        </div>
        <div v-if="list1.length == 0" class="nower" style="margin-top:20px;">
          <img src="../../assets/tupian/public_no_data.png" alt="暂无数据">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myOrder',
  data () {
    // (0删除,1新发布,2已下单(待付款),3已付款,4已释放,5已取消,6待判定,7已判定
    return {
      active: '1',
      ID: '',
      page: {
        size: 100
      },
      statue: [2, 3, 6],
      statue1: [4, 5, 7],
      list: [],
      list1: []
    }
  },
  mounted () {
    this.active = this.$route.params.id
    this.ID = JSON.parse(sessionStorage.ID)
    this.init()
  },
  methods: {
    init () {
      this.$post('/api/dealNo/dealNoList', { id: this.ID, status: this.statue, page: this.page })
        .then(res => {
          this.list = res.data.page.records
        })
      this.$post('/api/dealNo/dealNoList', { id: this.ID, status: this.statue1, page: this.page })
        .then(res => {
          this.list1 = res.data.page.records
        })
    },
    back () {
      this.$router.push({
        path: `/trading/1`
      })
    },
    tou (e) {
      if (this.active !== e) {
        this.active = e
        this.$router.push({
          path: `/myOrder/${e}`
        })
        // console.log('1')
      }
    },
    orderDetails (e, fxdata) {
      this.$router.push({
        path: `/orderDetails/${e}`,
        query: {
          fxdata: JSON.stringify(fxdata)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.myOrder{
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
    margin-top: 10px;
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
    .rouvu{
      width: 100%;
      .list{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 64px;
        background:rgba(255,255,255,1);
        border-radius:6px;
        padding: 0 21px;
        box-sizing: border-box;
        margin-bottom: 10px;
        .tnhdv{
          flex: 1;
          .assers{
            display: flex;
            align-items: center;
            .name{
              height:22px;
              font-size:16px;
              font-weight:500;
              color:rgba(0,0,0,0.85);
              line-height:22px;
              margin-right: 6px;
            }
            .tubm{
              width: 16px;
              margin-left: 5px;
              img{
                width: 100%;
                display: block;
              }
            }
            .tubm1{
              width: 23px;
              margin-left: 5px;
              img{
                width: 100%;
                display: block;
              }
            }
          }
          .ctra{
            width: 100%;
            text-align: left;
            span:nth-child(1){
              height:17px;
              font-size:12px;
              font-weight:400;
              color:rgba(0,0,0,0.5);
              line-height:17px;
              display: inline-block;
            }
            span:nth-child(2){
              height:17px;
              font-size:12px;
              font-weight:400;
              color:rgba(0,0,0,0.85);
              line-height:17px;
              display: inline-block;
              margin-left: 3px;
            }
            span:nth-child(3){
              height:17px;
              font-size:12px;
              font-weight:400;
              color:rgba(0,0,0,0.5);
              line-height:17px;
              display: inline-block;
              margin-left: 8px;
            }
            span:nth-child(4){
              height:17px;
              font-size:12px;
              font-weight:400;
              color:rgba(0,0,0,0.85);
              line-height:17px;
              display: inline-block;
              margin-left: 3px;
            }
          }
        }
        .buy{
          width:50px;
          height:50px;
          border:1px solid rgba(104,202,164,1);
          border-radius:50px;
          line-height: 50px;
          text-align: center;
          font-size:10px;
          font-weight:400;
          color:rgba(104,202,164,1);
        }
        .sell{
          width:35px;
          height:35px;
          background:rgba(234,111,90,1);
          border-radius:30px;
          line-height: 35px;
          text-align: center;
          font-size:10px;
          font-weight:400;
          color:rgba(255,255,255,1);
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
  }
}
</style>
