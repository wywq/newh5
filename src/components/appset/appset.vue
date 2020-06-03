<template>
  <div class="appset">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">咨询帮助</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="help">
      <div class="help_email" style="border-right: 1px solid rgba(0, 0, 0, 0.25); height: 46px;"  @click="kfyx()">
        <div class="help_img">
          <img src="../../assets/tupian/help_email.png" alt="icon">
        </div>
        <div class="help_text">客服邮箱</div>
      </div>
      <div class="help_email" @click="derop()">
        <div class="help_img">
          <img src="../../assets/tupian/help_add.png" alt="icon">
        </div>
        <div class="help_text">新增咨询</div>
      </div>
    </div>
    <div class="zixun">咨询记录(点击问题查看详情)</div>
    <div class="content" v-if="list.length > 0">
      <div class="list" @click="details(item.id)" v-for="(item,index) in list" :key="index">
        <div class="list_tit">{{ item. userContent}}</div>
        <div class="list_time">{{ item.createTime }}</div>
      </div>
    </div>
    <div v-if="list.length == 0" class="nower">
      <img src="../../assets/tupian/public_no_data.png" alt="暂无数据">
    </div>
    <!-- <div class="list" @click="kfyx()">
      <div class="list_tit">客服邮箱</div>
      <div class="more">
        <img src="../../assets/tupian/public_table_right.png" alt="">
      </div>
    </div>
    <div class="list" @click="help()">
      <div class="list_tit">帮助与咨询</div>
      <div class="more">
        <img src="../../assets/tupian/public_table_right.png" alt="">
      </div>
    </div> -->
    <div class="tangj" v-if="tjr" @click.self="close()">
      <div class="desout">
        <div class="tis">提示</div>
        <div class="name">客服邮箱为 <span id="inviteCode">{{ sxf4 }}</span></div>
        <div class="name">点击确定进行复制</div>
        <div class="two">
          <div class="two_left" @click.stop="close()">取消</div>
          <div class="two_right" @click="copyLink()">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appset',
  data () {
    return {
      tjr: false,
      akey: 'server_email',
      sxf4: '',
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
      this.$post('/api/strParam/valByKeys', {keys: [this.akey]})
        .then(res => {
          this.sxf4 = res.data.page.records[0].svalue
        })
        .catch(err => {
          console.log(err)
        })
      this.$post('/api/feedbackHelp/list', {userId: this.ID, page: this.page})
        .then(res => {
          // console.log(res)
          this.list = res.data.page.records.reverse()
        })
        .catch(err => {
          console.log(err)
        })
    },
    back () {
      this.$router.go(-1)
    },
    kfyx () {
      this.tjr = true
    },
    close () {
      this.tjr = false
    },
    copyLink () {
      var Url2 = document.getElementById('inviteCode').innerText
      var oInput = document.createElement('input')
      oInput.value = Url2
      document.body.appendChild(oInput)
      oInput.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      oInput.className = 'oInput'
      oInput.style.display = 'none'
      this.$message({
        showClose: true,
        message: '复制成功',
        type: 'success'
      })
      this.tjr = false
    },
    help () {
      this.$router.push({
        path: '/help'
      })
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
.appset{
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
  .help{
    width: 95%;
    height: 80px;
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    border-radius: 8px;
    .help_email{
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .help_img{
        width: 30px;
        img{
          width: 100%;
          display: block;
        }
      }
      .help_text{
        height:22px;
        font-size:16px;
        font-weight:500;
        color:rgba(0,0,0,0.85);
        line-height:22px;
        margin-left: 6px;
      }
    }
  }
  .zixun{
    width: 100%;
    height: 30px;
    text-align: center;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(0,0,0,0.5);
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
  .nower{
    width: 60px;
    margin-top:20px;
    margin: 20px auto;
    img{
      width: 100%;
      display: block;
    }
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
        height:20px;
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
