<template>
  <div class="modify5">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">绑定推荐人</div>
      <div class="icon_right">
      </div>
    </div>
    <input type="text" placeholder="输入推荐人手机号" class="ipt" v-model="phone">
    <div class="btn" @click="submit()">提交</div>
    <div class="tangj" v-if="tjr" @click.self="close()">
      <div class="desout">
        <div class="tis">提示</div>
        <div class="name" v-if="name">查询到推荐人姓名为：{{ name }}</div>
        <div class="name" v-if="!name">查询到手机号为:{{ phone }}的用户，但该用户未实名认证</div>
        <div class="name">是否要进行绑定</div>
        <div class="two">
          <div class="two_left" @click.stop="close()">取消</div>
          <div class="two_right" @click.stop="confirm()">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modify5',
  data () {
    return {
      tjr: false,
      phone: '',
      name: '',
      id: '',
      userid: '',
      userin: ''
    }
  },
  mounted () {
    this.userid = JSON.parse(sessionStorage.ID)
    this.init()
  },
  methods: {
    init () {
      this.$post('/api/user/' + this.userid)
        .then(res => {
          this.userin = res.data.page.records[0]
        })
        .catch(err => {
          console.log(err)
        })
    },
    back () {
      if (this.userin.parentId === 0) {
        this.$message({
          message: '请绑定推荐人',
          type: 'error'
        })
      } else {
        this.$router.go(-1)
      }
    },
    submit () {
      this.$post('/api/user/' + this.userid)
        .then(res => {
          this.userin = res.data.page.records[0]
          if (res.data.page.records[0].parentId === 0) {
            if (this.phone) {
              this.$post('/api/user/getByAccount', {account: this.phone})
                .then(res => {
                  if (res.data.page.records[0]) {
                    this.name = res.data.page.records[0].name
                    this.id = res.data.page.records[0].id
                    this.tjr = true
                  } else {
                    this.$message({
                      message: '手机号错误',
                      type: 'error'
                    })
                  }
                })
                .catch(err => {
                  console.log(err)
                })
            } else {
              this.$message({
                message: '请输入推荐人手机号',
                type: 'error'
              })
            }
          } else {
            this.$message({
              message: '已有推荐人，不可重复绑定',
              type: 'error'
            })
          }
        })
    },
    confirm () {
      this.$post('/api/user/bindParent', {parentId: this.id, id: this.userid})
        .then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.tjr = false
            this.$router.go(-1)
          } else {
            this.tjr = false
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    close () {
      this.tjr = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modify5{
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
  .ipt{
    outline: none;
    width: 90%;
    margin: 24px 5%;
    text-indent: 1em;
    height:40px;
    line-height: 40px;
    border-radius:4px;
    border:1px solid rgba(0,0,0,0.1);
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(0,0,0,0.7);
  }
  .btn{
    width:90%;
    height:45px;
    background:rgba(234,111,90,1);
    border-radius:30px;
    margin-left: 5%;
    margin-top: calc(100vh - 230px);
    text-align: center;
    line-height: 45px;
    font-size:18px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .tangj{
    width: 100%;
    height: 100vh;
    background:rgba(0,0,0,0.25);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    .desout{
      width: 70%;
      padding-top: 24px;
      box-sizing: border-box;
      background-color: #ffffff;
      border-radius:10px;
      margin: auto;
      .tis{
        width: 100%;
        height: 22px;
        text-align: center;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(0,0,0,0.85);
        line-height:22px;
        margin-bottom: 7px;
      }
      .name{
        width: 100%;
        text-align: center;
        // height:20px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(0,0,0,0.85);
        line-height:20px;
      }
      .two{
        margin-top: 11px;
        width: 100%;
        height:40px;
        display: flex;
        align-items: center;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        .two_left{
          width: 50%;
          border-right: 1px solid rgba(0, 0, 0, 0.1);
          height: 40px;
          line-height: 40px;
          font-size:16px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(0,0,0,0.85);
        }
        .two_right{
          width: 50%;
          height: 40px;
          line-height: 40px;
          font-size:16px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(234, 111, 90, 1);
        }
      }
    }
  }
}
</style>
