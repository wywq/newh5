<template>
  <div class="earnings">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">基金理财</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="balance">CWF余额 {{ buji.cwf ? buji.cwf : '0' }}</div>
      <div class="licai" >
        <div class="zubio">
          <div class="huionb" :class="tab_active == 1 ? 'active' : ''" @click="tab(1)">日理财</div>
          <div class="huionb" :class="tab_active == 2 ? 'active' : ''" @click="tab(2)">年理财</div>
        </div>
        <div v-if="tab_active == 1">
          <!-- <div class="lic_toibc">CWF余额  {{ buji.cwf ? buji.cwf : '0' }}</div> -->
          <div class="lic_small">日理财 {{ buji.freeze ? buji.freeze : '0' }}</div>
          <div class="lieb">
            <input type="number" placeholder="输入要理财的数额" class="yzma" v-model="amount"/>
            <div class="riobcn" @click="licai()">日理财</div>
          </div>
          <!-- <div class="lic_small">年理财 {{ buji.freeze ? buji.freeze : '0' }}</div>
          <div class="lieb">
            <input type="number" placeholder="输入要理财的数额" class="yzma" v-model="year_zhuanc"/>
            <div class="riobcn" @click="year_licai()">年理财</div>
          </div> -->
          <!-- <div class="lic_xid">确认理财后金额将锁定，一个收益周期结束后可转出</div> -->
          <div class="lic_small">可转出 {{ buji.extract ? buji.extract : '0' }}</div>
          <div class="lieb">
            <input type="number" placeholder="输入要转出的数额" class="yzma" v-model="zhuanc"/>
            <div class="riobcn" @click="zhc()">转出 </div>
          </div>
          <!-- <div class="lic_xid" style="height: auto; color: rgba(234, 111, 90, 1);">在每周六奖励未发放前，请勿将CWF转出，否则将不会获得奖励</div> -->
        </div>
        <div v-if="tab_active == 2">
          <!-- <div class="lic_toibc">CWF余额  {{ buji.cwf ? buji.cwf : '0' }}</div> -->
          <!-- <div class="lic_small">年理财 {{ buji.freeze ? buji.freeze : '0' }}</div> -->
          <!-- <div class="lieb">
            <input type="number" placeholder="输入要理财的数额" class="yzma" v-model="amount"/>
            <div class="riobcn" @click="licai()">日理财</div>
          </div> -->
          <div class="lic_small">年理财 {{ buji.annualFreeze ? buji.annualFreeze : '0' }}</div>
          <div class="lieb">
            <input type="number" placeholder="输入要理财的数额" class="yzma" v-model="year_amount"/>
            <div class="riobcn" @click="year_licai()">年理财</div>
          </div>
          <!-- <div class="lic_xid">确认理财后金额将锁定，一个收益周期结束后可转出</div> -->
          <div class="lic_small">可转出 {{ buji.annualExtract ? buji.annualExtract : '0' }}</div>
          <div class="lieb">
            <input type="number" placeholder="输入要转出的数额" class="yzma" v-model="year_zhuanc"/>
            <div class="riobcn" @click="year_zhc()">转出 </div>
          </div>
          <!-- <div class="lic_xid" style="height: auto; color: rgba(234, 111, 90, 1);">在每周六奖励未发放前，请勿将CWF转出，否则将不会获得奖励</div> -->
        </div>
      </div>
      <div class="list" style="background:rgba(0,0,0,0);min-height:20px;">
        <div class="eduert" style="width: 100%; text-align: center;">理财记录</div>
        <!-- <div class="eduert">收益时间</div> -->
      </div>
      <div v-if="list.length > 0">
        <div class="list" v-for="(item,index) in list" :key="index" style="display: block; text-align: left; padding: 8px 20px;">
          <div class="ert">{{ item.cwfType == 10 ? '理财购买' : '理财提取' }}  {{ item.cwf }} CWF</div>
          <div class="eduert">{{ item.createTime }}</div>
        </div>
      </div>
      <div v-if="list.length == 0" class="nower">
        <img src="../../assets/tupian/public_no_data.png" alt="暂无数据">
      </div>
    </div>
    <div class="tangj" v-if="tjr" @click.self="close()">
      <div class="desout">
        <div class="tis">密码</div>
        <input type="password" class="ipt" v-model="password">
        <div class="two">
          <div class="two_left" @click.stop="close()">取消</div>
          <div class="two_right" @click.stop="confirm()">确定</div>
        </div>
      </div>
    </div>
    <!-- <button @click="sy()">别点我啊</button> -->
  </div>
</template>

<script>
export default {
  name: 'earnings',
  data () {
    return {
      tab_active: 1,
      list: [],
      ID: '',
      buji: {},
      amount: '',
      zhuanc: '',
      year_amount: '',
      year_zhuanc: '',
      tjr: false,
      ghu: '',
      password: '',
      page: {
        size: 100
      },
      types: Number
    }
  },
  mounted () {
    this.ID = JSON.parse(sessionStorage.ID)
    this.init()
  },
  methods: {
    init () {
      this.$post('/api/cwfLog/fundLogs', {page: this.page, cwfType: [10, 11], userId: this.ID})
        .then(res => {
          this.list = res.data.page.records
        })
        .catch(err => {
          console.log(err)
        })
      this.$post('/api/cwfFund/home', {userId: this.ID})
        .then(res => {
          this.buji = res.data.page.records[0]
        })
        .catch(err => {
          console.log(err)
        })
    },
    // sy () {
    //   this.$post('/api/cwfProfit/add')
    //     .then(res => {
    //       console.log(res)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    tab (e) {
      this.tab_active = e
    },
    back () {
      this.$router.go(-1)
    },
    close () {
      this.tjr = false
    },
    licai () {
      if (this.amount) {
        this.ghu = 1
        this.tjr = true
      } else {
        this.$message({
          message: '请输入日理财数量',
          type: 'error'
        })
      }
    },
    zhc (e) {
      if (this.zhuanc) {
        this.types = e
        this.ghu = 2
        this.tjr = true
      } else {
        this.$message({
          message: '请输入转出数量',
          type: 'error'
        })
      }
    },
    year_licai () {
      if (this.year_amount) {
        this.ghu = 3
        this.tjr = true
      } else {
        this.$message({
          message: '请输入年理财数量',
          type: 'error'
        })
      }
    },
    year_zhc () {
      if (this.year_zhuanc) {
        this.ghu = 4
        this.tjr = true
      } else {
        this.$message({
          message: '请输入转出数量',
          type: 'error'
        })
      }
    },
    confirm () {
      if (this.ghu === 1) {
        this.$post('/api/user/verifyPayPassword', {payPassword: this.password, userId: this.ID})
          .then(res => {
            if (res.data.code === 1) { // 日理财
              this.$post('/api/cwfFund/buyFund', {userId: this.ID, amount: this.amount, fundType: 1})
                .then(res => {
                  // this.buji = res.data.page.records[0]
                  if (res.data.code === 1) {
                    this.$message({
                      message: res.data.msg,
                      type: 'success'
                    })
                  } else {
                    this.$message({
                      message: res.data.msg,
                      type: 'error'
                    })
                  }
                  this.init()
                })
                .catch(err => {
                  console.log(err)
                })
              this.tjr = false
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          })
      } else if (this.ghu === 2) { // 日转出
        this.$post('/api/user/verifyPayPassword', {payPassword: this.password, userId: this.ID})
          .then(res => {
            if (res.data.code === 1) {
              this.$post('/api/cwfFund/extract', {userId: this.ID, amount: this.zhuanc, fundType: 1})
                .then(res => {
                  // this.buji = res.data.page.records[0]
                  if (res.data.code === 1) {
                    this.$message({
                      message: res.data.msg,
                      type: 'success'
                    })
                  } else {
                    this.$message({
                      message: res.data.msg,
                      type: 'error'
                    })
                  }
                  this.init()
                })
                .catch(err => {
                  console.log(err)
                })
              this.tjr = false
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          })
      } else if (this.ghu === 3) { // 年理财
        this.$post('/api/user/verifyPayPassword', {payPassword: this.password, userId: this.ID})
          .then(res => {
            if (res.data.code === 1) {
              this.$post('/api/cwfFund/buyFund', {userId: this.ID, amount: this.year_amount, fundType: 2})
                .then(res => {
                  // this.buji = res.data.page.records[0]
                  if (res.data.code === 1) {
                    this.$message({
                      message: res.data.msg,
                      type: 'success'
                    })
                  } else {
                    this.$message({
                      message: res.data.msg,
                      type: 'error'
                    })
                  }
                  this.init()
                })
                .catch(err => {
                  console.log(err)
                })
              this.tjr = false
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          })
      } else if (this.ghu === 4) { // 年转出
        this.$post('/api/user/verifyPayPassword', {payPassword: this.password, userId: this.ID})
          .then(res => {
            if (res.data.code === 1) {
              this.$post('/api/cwfFund/extract', {userId: this.ID, amount: this.year_zhuanc, fundType: 2})
                .then(res => {
                  // this.buji = res.data.page.records[0]
                  if (res.data.code === 1) {
                    this.$message({
                      message: res.data.msg,
                      type: 'success'
                    })
                  } else {
                    this.$message({
                      message: res.data.msg,
                      type: 'error'
                    })
                  }
                  this.init()
                })
                .catch(err => {
                  console.log(err)
                })
              this.tjr = false
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.earnings{
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
    .balance{
      width:100%;
      height:29px;
      background:rgba(255,255,255,1);
      border-radius:5px;
      font-size:16px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(0,0,0,0.85);
      line-height:29px;
      margin-bottom: 5px;
    }
    .licai{
      width: 100%;
      background:rgba(255,255,255,1);
      border-radius:5px;
      padding: 20px 20px;
      box-sizing: border-box;
      .zubio{
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: left;
        align-items: center;
        margin-bottom: 8px;
        .huionb{
          width: 80px;
          height:30px;
          font-size:18px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(0,0,0,0.85);
          line-height:30px;
          border-bottom: 3px solid rgba(216, 216, 216, 1);
        }
        .active{
          color:rgba(234,111,90,1);
          border-bottom: 3px solid rgba(234, 111, 90, 1);
        }
      }
      .lic_toibc{
        width:100%;
        height:29px;
        font-size:21px;
        font-weight:500;
        color:rgba(0,0,0,0.85);
        line-height:29px;
        text-align: left;
      }
      .lic_small{
        width:100%;
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(0,0,0,0.5);
        line-height:17px;
        text-align: left;
        margin-top: 2px;
        margin-bottom: 6px;
      }
      .lieb{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .yzma{
          flex: 1;
          outline: none;
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
        .riobcn{
          margin-left: 8px;
          width:107px;
          height:40px;
          background:rgba(234,111,90,1);
          border-radius:4px;
          line-height: 40px;
          text-align: center;
          font-size:14px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
      }
      .lic_xid{
        width:100%;
        height:17px;
        font-size:12px;
        font-weight:400;
        color:rgba(0,0,0,0.5);
        line-height:17px;
        text-align: left;
        margin: 8px 0;
      }
    }
    .list{
      width:100%;
      min-height:47px;
      background:rgba(255,255,255,1);
      border-radius:5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;
      margin-bottom: 5px;
      .ert{
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(0,0,0,0.85);
        word-break: break-all;
      }
      .eduert{
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(0,0,0,0.5);
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
  .tangj{
    width: 100%;
    height: 100vh;
    background:rgba(0,0,0,0.25);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    .desout{
      width: 70%;
      padding-top: 24px;
      box-sizing: border-box;
      background-color: #ffffff;
      border-radius:10px;
      margin: auto;
      .ipt{
        outline: none;
        width: 90%;
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
      .tis{
        width: 90%;
        height: 22px;
        margin: auto;
        text-align: left;
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
