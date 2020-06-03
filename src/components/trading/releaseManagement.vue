<template>
  <div class="releaseManagement">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">我的广告</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="hutyu">
        <div :class="active == 1 ? 'bbo' : 'cio'" @click="tou(1)">当前发布</div>
        <div :class="active == 2 ? 'bbo' : 'cio'" @click="tou(2)">历史发布</div>
      </div>
      <div class="rouvu" v-if="active == 1">
        <div class="list" v-for="(item,index) in list" :key="index">
          <div class="tnhdv">
            <div class="assers">
              <div class="name">{{ item.dealType == 1 ? '买入' : '卖出' }}</div>
              <div class="name">{{ item.coinNum }} USDT</div>
            </div>
            <div class="ctra">
              <span>单价</span>
              <span>{{ item.price }} CNY</span>
              <span>状态</span>
              <span>已上架</span>
            </div>
          </div>
          <div class="buy" @click="shelves(item.id)">
            <img src="../../assets/tupian/c2c_manage_down.png"/>
          </div>
          <!-- <div style="color:red;" @click="shelves(item.id)" v-if="item.dealType == 2">
            已下架
          </div> -->
        </div>
        <div v-if="list.length == 0" class="nower" style="margin-top:20px;">
          <img src="../../assets/tupian/public_no_data.png" alt="暂无数据">
        </div>
      </div>
      <div class="rouvu" v-if="active == 2">
        <div v-for="(item,index) in list1" :key="index"  >
          <div class="list" v-if="item.status !== 1">
            <div class="tnhdv">
              <div class="assers">
                <div class="name">{{ item.dealType == 1 ? '买入' : '卖出' }}</div>
                <div class="name">{{ item.coinNum }} USDT</div>
              </div>
              <div class="ctra">
                <span>单价</span>
                <span>{{ item.price }} CNY</span>
                <span>状态</span>
                <span v-if="item.status == 0">已删除</span>
                <span v-if="item.status == 2">待付款</span>
                <span v-if="item.status == 3">待释放</span>
                <span v-if="item.status == 4">已完成</span>
                <span v-if="item.status == 5">已取消</span>
                <span v-if="item.status == 6">待判定</span>
                <span v-if="item.status == 7">已判定</span>
              </div>
            </div>
            <!-- <div style="color:red;" @click="shelves(item.id)" v-if="item.dealType == 2">
              已下架
            </div> -->
            <div class="buy">
              <!-- <img src="../../assets/tupian/c2c_manage_down.png"/> -->
            </div>
          </div>
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
  name: 'releaseManagement',
  data () {
    return {
      active: '1',
      ID: '',
      page: {
        size: 100
      },
      statue: [1],
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
      this.$post('/api/dealNo/list', { issueUserId: this.ID, status: this.statue, page: this.page })
        .then(res => {
          this.list = res.data.page.records
        })
      this.$post('/api/dealNo/list', { issueUserId: this.ID, page: this.page })
        .then(res => {
          this.list1 = res.data.page.records
        })
    },
    shelves (e) {
      this.$post('/api/dealNo/updateOut', {id: e})
        .then(res => {
          // this.list = res.data.page.records
          if (res.data.code === 1) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            // this.$router.go(-1)
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
          this.init()
        })
    },
    back () {
      this.$router.push({
        path: `/trading/1`
      })
    },
    tou (e) {
      this.active = e
      this.$router.push({
        path: `/releaseManagement/${e}`
      })
      if (e === 2) {
        this.$post('/api/dealNo/list', { issueUserId: this.ID, page: this.page })
          .then(res => {
            this.list1 = res.data.page.records
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.releaseManagement{
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
        margin-bottom: 10px;
        box-sizing: border-box;
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
          width:20px;
          // border:1px solid rgba(104,202,164,1);
          // border-radius:50px;
          // line-height: 50px;
          // text-align: center;
          // font-size:10px;
          // font-weight:400;
          // color:rgba(104,202,164,1);
          img{
            width: 100%;
            display: block;
          }
        }
        .sell{
          width:20px;
          // background:rgba(234,111,90,1);
          // border-radius:30px;
          // line-height: 35px;
          // text-align: center;
          // font-size:10px;
          // font-weight:400;
          // color:rgba(255,255,255,1);
          img{
            width: 100%;
            display: block;
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
  }
}
</style>
