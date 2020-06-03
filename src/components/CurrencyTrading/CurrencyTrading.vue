<template>
  <div class="CurrencyTrading">
    <div class="header">
      <div class="icon_left"  @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con">交易中心</div>
      <div class="icon_right" @click="market()">
        <img src="../../assets/tupian/navi_market.png" alt="icon"/>
      </div>
    </div>
    <div class="assets">
      <div class="cusnc">
        <div class="teile">CWF/USDT</div>
        <div class="fidjn">24H量 {{ clinch }}</div>
      </div>
      <div class="houci">
        <div class="green">{{ buidhfg ? buidhfg : '0' }}&nbsp;<span style="font-size:10px; color:rgba(0,0,0,0.5); font-weight:400;">≈ {{ buidhfg * sxf }} CNY</span></div>
        <div class="rews" :style="hdfho >= 0 ? '' : 'color:red'">{{ hdfho }}%</div>
      </div>
    </div>
    <div class="goin">
      <div class="wubo">
        <div class="tou">
          <div>买</div>
          <div>数量</div>
          <div class="price">价格</div>
        </div>
        <div  v-if="vion_list.length > 0">
          <div class="list" v-for="(item,index) in buy_list" :key="index" @click="cancelled(item.cwfAmount, item.issuePrice)">
            <div v-if="item.dealType == 1">{{ index + 1}}</div>
            <div v-if="item.dealType == 1" class="number1">{{ item.cwfAmount }}</div>
            <div v-if="item.dealType == 1" class="price p_back">{{ item.issuePrice }}</div>
          </div>
        </div>
      </div>
      <div class="wubo">
        <div class="tou">
          <div class="price1">价格</div>
          <div class="number">数量</div>
          <div>卖</div>
        </div>
        <div v-if="vion_list.length > 0">
          <div class="list" v-for="(item,index) in sell_list" :key="index" @click="cancelled_sell(item.cwfAmount, item.issuePrice)">
            <div v-if="item.dealType == 2" class="price1 sell_back">{{ item.issuePrice }}</div>
            <div v-if="item.dealType == 2" class="number">{{ item.cwfAmount }}</div>
            <div v-if="item.dealType == 2">{{ index + 1 }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="vion_list.length == 0" class="nower" style="margin-top:20px;">
      <img src="../../assets/tupian/public_no_data.png" alt="暂无数据">
    </div>
    <div class="buy_sell">
      <div class="buy">
        <div class="header_bs">买入</div>
        <div class="assets_bs" v-if="assets">可用 {{ assets.usdt ? assets.usdt : '0' }} USDT</div>
        <div class="price_bs">买入价</div>
        <div class="text_bs">
          <input type="text" placeholder="请输入" v-model="buy_price" @input="tyio()"/>
          <span>USDT</span>
        </div>
        <div class="rmb">≈ {{ do_cny | xiaoshudian }} CNY</div>
        <div class="price_bs">买入量</div>
        <div class="text_bs">
          <input type="text" placeholder="请输入" v-model="buy_number"/><!--@input="cuion()"-->
          <span>CWF</span>
        </div>
        <div class="turnover"><span>交易额</span>{{ buy_price * buy_number }}  USDT</div>
        <div class="poundage"><span>手续费</span>{{ buy_number * sxf2 / 100 | xiaoshudian }}  ({{ sxf2 }}% CWF)</div>
        <div class="buy_submit" @click="buy(1)">买入</div>
      </div>
      <div class="sell">
        <div class="header_bs">卖出</div>
        <div class="assets_bs" v-if="assets">可用 {{ assets.cwf ? assets.cwf : '0' }} CWF</div>
        <div class="price_bs">卖出价</div>
        <div class="text_bs">
          <input type="text" placeholder="请输入" v-model="sell_price" @input="sell_tyio()"/>
          <span>USDT</span>
        </div>
        <div class="rmb">≈ {{ sell_cny | xiaoshudian }} CNY</div>
        <div class="price_bs">卖出量</div>
        <div class="text_bs">
          <input type="text" placeholder="请输入" v-model="sell_number"/><!--@input="cuion_1()"-->
          <span>CWF</span>
        </div>
        <div class="turnover"><span>交易额</span>{{ sell_price * sell_number }}  USDT</div>
        <div class="poundage"><span>手续费</span>{{ sell_price * sell_number * sxf2_1 / 100 | xiaoshudian }}  ({{ sxf2_1 }}% USDT)</div>
        <div class="sell_submit" @click="buy(2)">卖出</div>
      </div>
    </div>
    <div class="tiao"></div>
    <div class="setting">
      <div class="setting_head">
        <div class="head_now">我的委托</div>
        <!-- <div class="head_all" @click="entrust()">全部委托 ></div> -->
      </div>
      <div class="setting_list">
        <div class="list_head">
          <div class="one">买卖</div>
          <div class="two">价格(USDT)</div>
          <div class="two">数量(CWF)</div>
          <div class="two">已成交</div>
          <div class="three">下架</div>
        </div>
        <div v-if="weitu.length > 0">
          <div class="list_content" v-for="(item,index) in weitu" :key="index">
            <div class="one" :style="item.dealType == '1' ? 'color:#0FA858' : 'color:#EE5555'">{{ item.dealType == '1' ? '买' : '卖' }}</div>
            <div class="two">{{ item.issuePrice }}</div>
            <div class="two">{{ item.cwfAmount }}</div>
            <div class="two">{{ item.tradedCwfAmount / item.cwfAmount * 100 }} %</div>
            <div class="three" @click="revoca(item.id)">
              <img src="../../assets/tupian/trade_down.png"/>
            </div>
          </div>
        </div>
        <div v-if="weitu.length == 0" class="nower">
          <img src="../../assets/tupian/public_no_data.png" alt="暂无数据">
        </div>
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
  </div>
</template>
<script>
export default {
  name: 'CurrencyTrading',
  data () {
    return {
      tjr: false,
      qwe: 1,
      ID: '',
      prtice: '',
      buy_number: '',
      buy_price: '',
      sell_number: '',
      sell_price: '',
      password: '',
      type: '',
      weitu: [],
      assets: '',
      akey: '',
      sxf: '',
      sxf2: '',
      sxf2_1: '',
      sxf3: '',
      sxf4: '',
      do_cny: '0',
      sell_cny: '0',
      page: {
        size: 100
      },
      vion_list: [],
      buy_list: [],
      sell_list: [],
      hdfho: '',
      buidhfg: '',
      clinch: '',
      akey1: 'usdt_cny_rate', // USDT/CNY比率
      akey2: 'cwf_transaction_fee', // 买交易手续费
      akey2_1: 'usdt_transaction_fee', // 卖交易手续费
      akey3: 'cwf_cny_rate', // CWF/CNY比率
      akey4: 'cwf_usdt_rate' // CWF/USDT比率
    }
  },
  mounted () {
    this.ID = JSON.parse(sessionStorage.ID)
    this.init()
  },
  filters: {
    // *号省略
    xiaoshudian (value) {
      let realVal = ''
      if (!isNaN(value) && value !== '') {
        // 截取当前数据到小数点后两位
        realVal = parseFloat(value).toFixed(4)
      } else {
        realVal = '--'
      }
      return realVal
    }
  },
  methods: {
    init () {
      // 个人资产
      this.$post('/api/asset/' + this.ID)
        .then(res => {
          this.assets = res.data.page.records[0]
        })
        .catch(err => {
          console.log(err)
        })
      // 获取我的委托
      this.$post('/api/order/list', {userId: this.ID, page: this.page, status: [1, 2]})
        .then(res => {
          this.weitu = res.data.page.records
        })
        .catch(err => {
          console.log(err)
        })
      // 成交记录
      this.$post('/api/order/h24DealTotalNum')
        .then(res => {
          this.clinch = res.data.page.records[0]
        })
      // 获取USDT/CNY比率
      this.$post('/api/param/valByKeys', {keys: [this.akey1]})
        .then(res => {
          this.sxf = res.data.page.records[0].avalue
        })
      // 获取买手续费
      this.$post('/api/param/valByKeys', {keys: [this.akey2]})
        .then(res => {
          if (res.data.page.records[0]) {
            this.sxf2 = res.data.page.records[0].avalue * 100
          }
        })
        // 获取卖手续费
      this.$post('/api/param/valByKeys', {keys: [this.akey2_1]})
        .then(res => {
          if (res.data.page.records[0]) {
            this.sxf2_1 = res.data.page.records[0].avalue * 100
          }
        })
      // 获取CWF/CNY比率
      this.$post('/api/param/valByKeys', {keys: [this.akey3]})
        .then(res => {
          this.sxf3 = res.data.page.records[0].avalue
        })
      // 获取CWF/USDT比率
      this.$post('/api/param/valByKeys', {keys: [this.akey4]})
        .then(res => {
          this.sxf4 = res.data.page.records[0].avalue
        })
      // 获取涨幅
      this.$post('/api/order/h24UpAndDown')
        .then(res => {
          this.hdfho = res.data.page.records[0]
        })
      // 获取比例
      this.$post('/api/order/newPrice')
        .then(res => {
          if (res.data.page.records[0]) {
            this.buidhfg = res.data.page.records[0].dealPrice
          }
        })
      // 获取列表
      this.$post('/api/order/groupList')
        .then(res => {
          this.vion_list = res.data.page.records
          // console.log(this.vion_list)
          if (this.vion_list.length > 0) {
            let ert = this.vion_list
            let j = 0
            let k = 0
            for (let i = 0; i <= ert.length; i++) {
              if (ert[i]['dealType'] === 1) {
                this.buy_list[j] = ert[i]
                // console.log(this.buy_list)
                j++
              } else {
                this.sell_list[k] = ert[i]
                k++
              }
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // cuion () {
    //   if (this.buy_number < 1) {
    //     this.buy_number = 1
    //     this.$message({
    //       message: '买入量不能小于1',
    //       type: 'error'
    //     })
    //   }
    // },
    // cuion_1 () {
    //   if (this.sell_number < 1) {
    //     this.sell_number = 1
    //     this.$message({
    //       message: '买入量不能小于1',
    //       type: 'error'
    //     })
    //   }
    // },
    tyio () {
      this.do_cny = this.buy_price * this.sxf
    },
    sell_tyio () {
      this.sell_cny = this.sell_price * this.sxf
    },
    back () {
      this.$router.go(-1)
    },
    market () {
      this.$router.push({
        path: `/market`
      })
    },
    buy (e) {
      if (e === 1) {
        if (this.buy_number && this.buy_price) {
          this.tjr = true
          this.type = e
        } else {
          this.$message({
            message: '请输入完整',
            type: 'error'
          })
        }
      }
      if (e === 2) {
        if (this.sell_number && this.sell_price) {
          this.tjr = true
          this.type = e
        } else {
          this.$message({
            message: '请输入完整',
            type: 'error'
          })
        }
      }
      // if (e === 1) {
      //   if (this.buy_number && this.buy_price) {
      //     this.$post('/api/order/list', {dealType: e, issuePrice: this.buy_price, cwfAmount: this.buy_number, userId: this.ID})
      //       .then(res => {
      //         console.log(res)
      //         this.tjr = true
      //       })
      //       .catch(err => {
      //         console.log(err)
      //       })
      //   } else {
      //     this.$message({
      //       message: '请输入完整',
      //       type: 'error'
      //     })
      //   }
      // }
      // if (e === 2) {
      //   if (this.sell_number && this.sell_price) {
      //     this.$post('/api/order/list', {dealType: e, issuePrice: this.sell_price, cwfAmount: this.sell_number, userId: this.ID})
      //       .then(res => {
      //         console.log(res)
      //         this.tjr = true
      //       })
      //       .catch(err => {
      //         console.log(err)
      //       })
      //   } else {
      //     this.$message({
      //       message: '请输入完整',
      //       type: 'error'
      //     })
      //   }
      // }
    },
    confirm () {
      if (this.type === 1) {
        this.$post('/api/user/verifyPayPassword', {payPassword: this.password, userId: this.ID})
          .then(res => {
            if (res.data.code === 1) {
              // this.$message({
              //   message: res.data.msg,
              //   type: 'success'
              // })
              this.tjr = false
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
            if (res.data.code === 1) {
              this.$post('/api/order/add', {dealType: this.type, issuePrice: this.buy_price, cwfAmount: this.buy_number, userId: this.ID})
                .then(res => {
                  if (res.data.code === 1) {
                    this.$message({
                      message: res.data.msg,
                      type: 'success'
                    })
                    this.init()
                    location.reload()
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
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
      if (this.type === 2) {
        this.$post('/api/user/verifyPayPassword', {payPassword: this.password, userId: this.ID})
          .then(res => {
            if (res.data.code === 1) {
              // this.$message({
              //   message: res.data.msg,
              //   type: 'success'
              // })
              this.tjr = false
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
            if (res.data.code === 1) {
              this.$post('/api/order/add', {dealType: this.type, issuePrice: this.sell_price, cwfAmount: this.sell_number, userId: this.ID})
                .then(res => {
                  if (res.data.code === 1) {
                    this.$message({
                      message: res.data.msg,
                      type: 'success'
                    })
                    this.init()
                    location.reload()
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
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    close () {
      this.tjr = false
    },
    revoca (e) {
      console.log(e)
      this.$post('/api/order/revocation/' + e)
        .then(res => {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.init()
          location.reload()
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 点买到卖
    cancelled (e, p) {
      this.sell_number = e
      this.sell_price = p
    },
    // 点卖到买
    cancelled_sell (x, y) {
      this.buy_number = x
      this.buy_price = y
    }
  }
}
</script>
<style lang="scss" scoped>
  .CurrencyTrading{
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
    // 资产信息
    .assets{
      width: 100%;
      padding: 5px 10px;
      box-sizing: border-box;
      border-bottom: 1px solid #eeeeee;
      .cusnc{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .teile{
          text-align: left;
          height:22px;
          font-size:16px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(0,0,0,0.85);
          line-height:22px;
        }
        .fidjn{
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(0,0,0,0.5);
          line-height:17px;
        }
      }
      .houci{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .green{
          height:25px;
          font-size:18px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(15,168,88,1);
          line-height:25px;
        }
        .rews{
          height:20px;
          font-size:14px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(15,168,88,1);
          line-height:20px;
        }
      }
    }
    // 数据表格样式
    .goin{
      width: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      margin-top: 10px;
      .wubo{
        width: 50%;
      }
      .tou{
        display: flex;
        justify-content: space-between;
        div{
          text-align: left;
          height:14px;
          font-size:10px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(0,0,0,0.5);
          line-height:14px;
        }
        div:nth-child(2){
          flex: 1;
          margin: 0 10px;
        }
        .price{
          padding-right: 5px;
        }
        .price1{
          padding-left: 5px;
        }
        .number{
          text-align: right;
        }
      }
      .list{
        display: flex;
        justify-content: space-between;
        align-items: center;
        // height: 20px;
        div{
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(0,0,0,0.85);
          line-height:17px;
        }
        .number{
          flex: 1;
          margin: 0 10px;
          text-align: right;
        }
        .number1{
          flex: 1;
          margin: 0 10px;
          text-align: left;
        }
        .price{
          padding-right: 5px;
        }
        .p_back{
          background:rgba(15,168,88,0.2);
        }
        .sell_back{
          background:rgba(238,85,85,0.2);
        }
        .price1{
          padding-left: 5px;
        }
      }
    }
    // 买卖交易样式
    .buy_sell{
      width: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      margin-top: 10px;
      .buy{
        width: 50%;
        text-align: left;
        padding-right: 8px;
        box-sizing: border-box;
        .header_bs{
          height:17px;
          font-size:12px;
          font-weight:400;
          color:rgba(0,0,0,0.5);
          line-height:17px;
        }
        .assets_bs{
          height:17px;
          font-size:12px;
          font-weight:400;
          color:rgba(0,0,0,0.85);
          line-height:17px;
        }
        .price_bs{
          height:14px;
          font-size:10px;
          font-weight:400;
          color:rgba(0,0,0,0.5);
          line-height:14px;
          margin-top: 5px;
          margin-bottom: 3px;
        }
        .text_bs{
          width: 100%;
          height:25px;
          border-radius:4px;
          border:1px solid rgba(0,0,0,0.1);
          padding: 0 3px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          input{
            width: 70%;
            border: none;
            outline: none;
          }
          span{
            font-size:12px;
            font-weight:400;
            color:rgba(0,0,0,0.5);
          }
        }
        .rmb{
          width:100%;
          height:14px;
          font-size:10px;
          font-weight:400;
          color:rgba(0,0,0,0.5);
          line-height:14px;
          text-align: right;
          margin-top: 2px;
        }
        .block{
          width: 100%;
          height: 30px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-left: 10px;
          .slider_slug{
            flex: 1;
          }
          div:nth-child(2){
            width: 40px;
            font-size:14px;
            font-weight:400;
            color:rgba(95,95,95,0.7);
            text-align: center;
            margin-left: 15px;
          }
        }
        .turnover{
          height:14px;
          font-size:10px;
          font-weight:400;
          color:rgba(0,0,0,0.85);
          line-height:14px;
          margin-top: 5px;
          span{
            height:14px;
            font-size:10px;
            font-weight:400;
            color:rgba(0,0,0,0.5);
            line-height:14px;
            display: inline-block;
            margin-right: 6px;
          }
        }
        .poundage{
          height:14px;
          font-size:10px;
          font-weight:400;
          color:rgba(0,0,0,0.85);
          line-height:14px;
          margin-top: 5px;
          span{
            height:14px;
            font-size:10px;
            font-weight:400;
            color:rgba(0,0,0,0.5);
            line-height:14px;
            display: inline-block;
            margin-right: 6px;
          }
        }
        .buy_submit{
          width: 85%;
          margin: auto;
          height:25px;
          background:rgba(15,168,88,1);
          border-radius:2px;
          text-align: center;
          line-height: 25px;
          font-size:12px;
          font-weight:400;
          color:rgba(255,255,255,1);
          margin-top: 8px;
        }
      }
      .sell{
        width: 50%;
        text-align: left;
        padding-left: 8px;
        box-sizing: border-box;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        .header_bs{
          height:17px;
          font-size:12px;
          font-weight:400;
          color:rgba(0,0,0,0.5);
          line-height:17px;
        }
        .assets_bs{
          height:17px;
          font-size:12px;
          font-weight:400;
          color:rgba(0,0,0,0.85);
          line-height:17px;
        }
        .price_bs{
          height:14px;
          font-size:10px;
          font-weight:400;
          color:rgba(0,0,0,0.5);
          line-height:14px;
          margin-top: 5px;
          margin-bottom: 3px;
        }
        .text_bs{
          width: 100%;
          height:25px;
          border-radius:4px;
          border:1px solid rgba(0,0,0,0.1);
          padding: 0 3px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          input{
            width: 70%;
            border: none;
            outline: none;
          }
          span{
            font-size:12px;
            font-weight:400;
            color:rgba(0,0,0,0.5);
          }
        }
        .rmb{
          width:100%;
          height:14px;
          font-size:10px;
          font-weight:400;
          color:rgba(0,0,0,0.5);
          line-height:14px;
          text-align: right;
          margin-top: 2px;
        }
        .block{
          width: 100%;
          height: 30px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-left: 10px;
          .slider_slug{
            flex: 1;
          }
          div:nth-child(2){
            width: 40px;
            font-size:14px;
            font-weight:400;
            color:rgba(95,95,95,0.7);
            text-align: center;
            margin-left: 15px;
          }
        }
        .turnover{
          height:14px;
          font-size:10px;
          font-weight:400;
          color:rgba(0,0,0,0.85);
          line-height:14px;
          margin-top: 5px;
          span{
            height:14px;
            font-size:10px;
            font-weight:400;
            color:rgba(0,0,0,0.5);
            line-height:14px;
            display: inline-block;
            margin-right: 6px;
          }
        }
        .poundage{
          height:14px;
          font-size:10px;
          font-weight:400;
          color:rgba(0,0,0,0.85);
          line-height:14px;
          margin-top: 5px;
          span{
            height:14px;
            font-size:10px;
            font-weight:400;
            color:rgba(0,0,0,0.5);
            line-height:14px;
            display: inline-block;
            margin-right: 6px;
          }
        }
        .sell_submit{
          width: 85%;
          margin: auto;
          height:25px;
          background:rgba(238,85,85,1);
          border-radius:2px;
          text-align: center;
          line-height: 25px;
          font-size:12px;
          font-weight:400;
          color:rgba(255,255,255,1);
          margin-top: 8px;
        }
      }
    }
    .tiao{
      width: 100%;
      height: 5px;
      margin-top:10px;
      background: #eeeeee;
    }
    .setting{
      width: 100%;
      padding: 0 9px;
      box-sizing: border-box;
      .setting_head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        text-align: left;
        .head_now{
          font-size:16px;
          font-weight:500;
          color:rgba(0,0,0,0.85);
        }
        .head_all{
          font-size:12px;
          font-weight:400;
          color:rgba(0,142,187,1);
        }
      }
      .setting_list{
        width: 100%;
        .nower{
          width: 60px;
          margin-top:20px;
          margin: 20px auto;
          img{
            width: 100%;
            display: block;
          }
        }
        .list_head{
          width: 100%;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #eeeeee;
          .one{
            width: 10%;
            font-size:12px;
            font-weight:400;
            color:rgba(0,0,0,0.5);
          }
          .two{
            width: 30%;
            font-size:12px;
            font-weight:400;
            color:rgba(0,0,0,0.5);
          }
          .three{
            width: 30px;
            margin-right: 10px;
            font-size:12px;
            font-weight:400;
            color:rgba(0,0,0,0.5);
            img{
              width: 100%;
            }
          }
        }
        .list_content{
          width: 100%;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #eeeeee;
          .one{
            width: 10%;
            font-size:12px;
            font-weight:400;
            color:rgba(0,0,0,0.85);
          }
          .two{
            width: 30%;
            font-size:12px;
            font-weight:400;
            color:rgba(0,0,0,0.85);
          }
          .three{
            width: 30px;
            margin-right: 10px;
            img{
              width: 20px;
              margin: auto;
              display: block;
            }
          }
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
</style>
