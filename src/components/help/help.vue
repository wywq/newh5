<template>
  <div class="help">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">帮助与咨询</div>
      <div class="icon_right" @click="derop()">
        <img src="../../assets/tupian/navi_add.png"/>
      </div>
    </div>
    <div class="content">
      <div class="list" @click="details(item.id)" v-for="(item,index) in list" :key="index">
        <div class="list_tit">{{ item. userContent}}</div>
        <div class="list_time">{{ item.createTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'help',
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
  // computed: {
  //   reverseSum () {
  //     return this.list.reverse()
  //   }
  // },
  methods: {
    init () {
      this.$post('/api/feedbackHelp/list', {userId: this.ID, page: this.page})
        .then(res => {
          console.log(res)
          this.list = res.data.page.records.reverse()
        })
        .catch(err => {
          console.log(err)
        })
    },
    back () {
      this.$router.go(-1)
    },
    details (e) {
      this.$router.push({
        path: `/helpDetails/${e}`
      })
    },
    derop () {
      this.$router.push({
        path: `/newhelp`
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.help{
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
    .list{
      width:100%;
      height:69px;
      background:rgba(255,255,255,1);
      border-radius:5px;
      padding: 8px 20px;
      box-sizing: border-box;
      margin-bottom: 5px;
      .list_tit{
        width:100%;
        height:34px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(0,0,0,0.85);
        line-height:17px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-align: left;
      }
      .list_time{
        width:100%;
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(0,0,0,0.5);
        line-height:17px;
        text-align: right;
        margin-top: 3px;
      }
    }
  }
}
</style>
