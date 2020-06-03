<template>
  <div class="personal">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">个人信息</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="list" @click="modify1()">
      <div class="list_text">修改昵称</div>
      <div class="more">
        <img src="../../assets/tupian/public_table_right.png" alt="更多"/>
      </div>
    </div>
    <div class="list" @click="modify2()">
      <div class="list_text">修改登录密码</div>
      <div class="more">
        <img src="../../assets/tupian/public_table_right.png" alt="更多"/>
      </div>
    </div>
    <div class="list" @click="modify3()">
      <div class="list_text">修改支付密码</div>
      <div class="more">
        <img src="../../assets/tupian/public_table_right.png" alt="更多"/>
      </div>
    </div>
    <div class="list" @click="modify4()">
      <div class="list_text">实名认证</div>
      <div class="more">
        <img src="../../assets/tupian/public_table_right.png" alt="更多"/>
      </div>
    </div>
    <div class="list" @click="modify5()">
      <div class="list_text">绑定推荐人</div>
      <div class="more">
        <img src="../../assets/tupian/public_table_right.png" alt="更多"/>
      </div>
    </div>
    <div class="list" @click="modify7()">
      <div class="list_text">支付绑定</div>
      <div class="more">
        <img src="../../assets/tupian/public_table_right.png" alt="更多"/>
      </div>
    </div>
    <!-- <div class="list" @click="modify6()">
      <div class="list_text">推荐人名单</div>
      <div class="more">
        <img src="../../assets/tupian/public_table_right.png" alt="更多"/>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'personal',
  data () {
    return {
      ID: '',
      userin: {}
    }
  },
  mounted () {
    this.ID = JSON.parse(sessionStorage.ID)
    this.init()
  },
  methods: {
    init () {
      this.$post('/api/user/' + this.ID)
        .then(res => {
          this.userin = res.data.page.records[0]
        })
        .catch(err => {
          console.log(err)
        })
    },
    back () {
      this.$router.go(-1)
    },
    modify1 () {
      this.$router.push({
        path: `/modify1`
      })
    },
    modify2 () {
      this.$router.push({
        path: `/modify2`
      })
    },
    modify3 () {
      this.$router.push({
        path: `/modify3`
      })
    },
    modify4 () {
      if (this.userin.name && this.userin.idCard) {
        this.$message({
          message: '已实名认证',
          type: 'success'
        })
      } else {
        this.$router.push({
          path: `/modify4`
        })
      }
    },
    modify5 () {
      if (this.userin.parentId !== 0 || this.userin.parentAccount) {
        this.$message({
          message: '已绑定推荐人',
          type: 'success'
        })
      } else {
        this.$router.push({
          path: `/modify5`
        })
      }
    },
    modify7 () {
      this.$router.push({
        path: `/modify7`
      })
    }
    // modify6 () {
    //   this.$router.push({
    //     path: `/modify6`
    //   })
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// html /deep/.el-message{
//   min-width: 600px!important;
// }
.personal{
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
    .more{
      width: 9px;
      img{
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
