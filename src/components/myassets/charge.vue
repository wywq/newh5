<template>
  <div class="charge">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">充值</div>
      <div class="icon_right" @click="record()">
        记录
      </div>
    </div>
    <div class="content">
      <div class="skidj">充值地址</div>
      <div class="coin_wallet">
        <div id = "inviteCode" >{{ usdtAddr }}</div>
        <div @click="copyLink()">点击复制</div>
      </div>
      <div class="title">
        1.此地址是您在CWF创富基金中的专属充值地址，可以反复充值<br>
        2.充值需要平台进行确认，确认无误后，您USDT将会自动充值到您的账户中<br>
        3.点击本页右上角的“记录”按钮，可查询当前充值状态及充值历史记录
      </div>
      <!-- <div class="number">充值数量</div>
      <div class="text_bs">
        <input type="number" placeholder="请输入" v-model="unkdh.rechargeNum"/>
        <span>USDT</span>
      </div>
      <div class="number">交易ID号</div>
      <div class="text_bs">
        <input type="text" placeholder="请输入交易ID" v-model="unkdh.rechargeDealId"/>
      </div>
      <div class="number">交易凭证</div>
      <input type="file" @change="addimg($event)" id="fileId">
      <div class="giun">
        <img :src = valueUrl  v-if="valueUrl">
      </div> -->
      <!-- <el-upload
        class="avatar-uploader"
        action="http://47.92.104.73:8081/api/recharge/saveOrUpdate"
        :data = unkdh
        :show-file-list="false"
        :on-success="handleAvatarSuccess">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload> -->
        <!-- <span>USDT</span> -->
      <!-- <input type="text" placeholder="输入要修改的昵称" class="ipt"> -->
    </div>
    <!-- <div class="btn" @click="submit()">提交凭证</div> -->
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'charge',
  data () {
    return {
      ID: '',
      cn_new: '',
      imageUrl: '',
      unkdh: {
        userId: '',
        evidenceUrl: '',
        rechargeDealId: '',
        rechargeNum: '',
        id: '',
        files: []
      },
      fuino: '',
      usdtAddr: '',
      der: '',
      valueUrl: '',
      key: 'usdt_recharge_addr' // USDT充值地址
    }
  },
  mounted () {
    this.unkdh.userId = JSON.parse(sessionStorage.ID)
    this.ID = JSON.parse(sessionStorage.ID)
    this.init()
  },
  methods: {
    init () {
      this.$post('/api/user/' + this.ID)
        .then(res => {
          if (res.data.page.records[0].usdtAddr) {
            this.usdtAddr = res.data.page.records[0].usdtAddr
          } else {
            this.$post('/api/recharge/getAddress', {userId: this.ID})
              .then(res => {
                this.usdtAddr = res.data.page.records[0].addr
              })
          }
          // this.assets = res.data.page.records[0]
        })
        .catch(err => {
          console.log(err)
        })
      // this.$post('/api/strParam/list')
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
      // 获取usdt充值地址
      this.$post('/api/strParam/valByKeys', {keys: [this.key]})
        .then(res => {
          this.cn_new = res.data.page.records[0].svalue
        })
        .catch(err => {
          console.log(err)
        })
    },
    addimg (event) {
      // console.log(event.target.files[0])
      console.log(this.unkdh.files)
      this.unkdh.files = event.target.files[0]
      this.fuino = event.target.files[0]
      // this.unkdh.files = document.getElementById('fileId').files // 获取文件流
      this.goin = document.getElementById('fileId').files[0] // 获取文件流
      // console.log(this.unkdh.files)
      this.der = event
      let _this = this
      let files = event.target.files[0]
      if (!event || !window.FileReader) return // 看支持不支持FileReader
      let reader = new FileReader()
      reader.readAsDataURL(files) // 这里是最关键的一步，转换就在这里
      reader.onloadend = function () {
        _this.valueUrl = this.result
        // _this.isShow = true
      }
    },
    submit () {
      if (this.unkdh.rechargeNum && this.unkdh.rechargeDealId && this.fuino) {
        let formData = new FormData()
        formData.append('userId', this.unkdh.userId)
        // formData.append('evidenceUrl', this.unkdh.evidenceUrl)
        formData.append('rechargeDealId', this.unkdh.rechargeDealId)
        formData.append('rechargeNum', this.unkdh.rechargeNum)
        // formData.append('id', this.unkdh.id)
        formData.append('files', this.fuino)
        this.$post('/api/recharge/saveOrUpdate', formData, {
          headers: {
            'Content-Type': false
          }
        })
          .then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              this.$router.go(-1)
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$message({
          message: '请输入完整',
          type: 'error'
        })
      }
    },
    back () {
      this.$router.go(-1)
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
    },
    // 上传图片
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      // this.form.recharge_card_id = res
    },
    record () {
      this.$router.push({
        path: `/newChargeRecord`,
        query: {ciuon: this.usdtAddr}
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.charge{
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
      height:20px;
      font-size:14px;
      font-weight:400;
      color:rgba(0,0,0,0.85);
      line-height:20px;
    }
  }
  .content{
    width: 100%;
    padding: 0 18px;
    box-sizing: border-box;
    margin-top: 20px;
    .skidj{
      height:20px;
      font-size:14px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(0,0,0,0.85);
      line-height:20px;
      text-align: left;
      margin-bottom: 10px;
    }
    .title{
      width:100%;
      text-align: left;
      // height:34px;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(0,0,0,0.85);
      line-height:17px;
      margin-bottom: 10px;
    }
    .coin_wallet{
      width:100%;
      height:64px;
      background:rgba(234,111,90,0.15);
      border-radius:4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 19px;
      box-sizing: border-box;
      text-align: left;
      margin-bottom: 20px;
      div:nth-child(1){
        font-size:16px;
        font-weight:400;
        color:rgba(95,95,95,0.7);
        flex: 1;
        overflow: hidden;
      }
      div:nth-child(2){
        font-size:14px;
        font-weight:400;
        color:rgba(0,142,187,1);
        cursor: pointer;
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
      }
    }
    .number{
      width: 100%;
      text-align: left;
      margin-bottom: 10px;
      height:20px;
      font-size:14px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(0,0,0,0.85);
      line-height:20px;
    }
    .giun{
      width: 80px;
      margin-top: 20px;
      img{
        width: 100%;
        display: block;
      }
    }
    .text_bs{
      width: 100%;
      height:40px;
      line-height: 40px;
      border-radius:4px;
      border:1px solid rgba(0,0,0,0.1);
      padding-right: 8px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      input{
        width: 70%;
        border: none;
        outline: none;
        text-indent: 1em;
        font-size: 14px;
      }
      span{
        font-size:12px;
        font-weight:400;
        color:rgba(0,0,0,0.5);
      }
    }
    .avatar-uploader{
      width:100px;
      img{
        width: 100%;
        display: block;
      }
    }
  }
  .ipt{
    outline: none;
    width: 100%;
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
    margin-top: 70px;
    text-align: center;
    line-height: 45px;
    font-size:18px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
}
</style>
