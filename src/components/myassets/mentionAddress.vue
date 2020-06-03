<template>
  <div class="mention">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">提现地址</div>
      <div class="icon_right" @click="add()">
        <img src="../../assets/tupian/navi_add.png"/>
      </div>
    </div>
    <div class="content">
      <div class="dizi" v-for="(item,index) in list" :key="index" @click="fucio(item.id)">
        <div class="dizi_detail">
          <div>{{ item.label }}</div>
          <div>{{ item.usdtOpenId }}</div>
        </div>
        <div class="more" @click.stop="degtre(item.id)">
          <img src="../../assets/tupian/address_delete.png"/>
        </div>
      </div>
      <div v-if="list.length == 0" class="nower">
        <img src="../../assets/tupian/public_no_data.png" alt="暂无数据">
      </div>
    </div>
    <!-- <div class="btn">确认提现</div> -->
  </div>
</template>

<script>
export default {
  name: 'mention',
  data () {
    return {
      ID: '',
      list: [],
      page: {
        size: 100
      }
    }
  },
  mounted () {
    this.ID = JSON.parse(sessionStorage.ID)
    this.init()
  },
  methods: {
    init () {
      this.$post('/api/usdtAccount/list', {userId: this.ID, page: this.page})
        .then(res => {
          this.list = res.data.page.records
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    back () {
      this.$router.go(-1)
    },
    add () {
      this.$router.push({
        path: `mentionAdd`
      })
    },
    degtre (e) {
      this.$post('/api/usdtAccount/delete', [e])
        .then(res => {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.init()
        })
        .catch(err => {
          console.log(err)
        })
    },
    fucio (e) {
      this.$router.push({
        name: `mention`,
        params: {
          id: e
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mention{
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
    margin-top: 5px;
    .dizi{
      width: 100%;
      min-height:60px;
      background:rgba(255,255,255,1);
      border-radius:5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      box-sizing: border-box;
      margin-bottom: 5px;
      .dizi_detail{
        flex: 1;
        text-align: left;
        div:nth-child(1){
          height:22px;
          font-size:16px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(0,0,0,0.85);
          line-height:22px;
          margin-bottom: 3px;
        }
        div:nth-child(2){
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(0,0,0,0.5);
          line-height:17px;
        }
      }
      .more{
        width: 20px;
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
</style>
