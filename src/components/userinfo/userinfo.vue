<template>
  <div class="userinfo">
    <div class="header">个人中心</div>
    <div class="personal">
      <div class="toux">
        <img src="../../assets/tupian/index_headicon.png" alt="头像"/>
      </div>
      <div class="information">
        <div class="name">
          <span class="name1">{{ userin.nickname }}</span>
          <span class="pho">({{ userin.telephone | hideMiddle }})</span>
        </div>
        <div class="assets">
          <span class="bizi">USDT</span>
          <span class="num" v-if="assets">{{ assets.usdt ? assets.usdt : '0' }}</span>
          <span class="bizi">CWF</span>
          <span class="num" v-if="assets">{{ assets.cwf ? assets.cwf : '0' }}</span>
        </div>
      </div>
    </div>
    <div class="stati">
      <div class="botuc">
        <div>已注册人数</div>
        <div>{{ sxf1 ? sxf1 : '0' }}</div>
      </div>
      <div class="botuc" style="border:none;">
        <div>发行总量</div>
        <div>{{ sxf2 ? sxf2 : '0' }}</div>
      </div>
      <!-- <div class="botuc">
        <div>已发行</div>
        <div>{{ sxf3 ? sxf3 : '0' }}</div>
      </div>
      <div class="botuc" style="border:none;">
        <div>未发行</div>
        <div>{{ sxf4 ? sxf4 : '0' }}</div>
      </div> -->
    </div>
    <div class="notice" @click="notice()">
      <div class="notice_tu">
        <img src="../../assets/tupian/index_notice.png" alt="公告"/>
      </div>
      <div class="new_notice">最新公告</div>
      <div class="notice_text">
        <div class="title">{{ list.title ? list.title : '没有数据' }}</div>
        <div class="details">{{ list.content ? list.content : '没有数据' }}</div>
      </div>
    </div>
    <div class="new_list">
      <div class="vyui">全部功能</div>
      <div class="gusfn">
        <div class="duisonc" @click="perturbation()">
          <div class="reou">
            <img src="../../assets/tupian/index_info.png" alt="tu"/>
          </div>
          <div class="efhd">个人信息</div>
        </div>
        <div class="duisonc" @click="myassets()">
          <div class="reou">
            <img src="../../assets/tupian/index_wallet@2x.png" alt="tu"/>
          </div>
          <div class="efhd">我的资产</div>
        </div>
        <div class="duisonc" @click="modify6()">
          <div class="reou">
            <img src="../../assets/tupian/index_people.png" alt="tu"/>
          </div>
          <div class="efhd">推荐明细</div>
        </div>
        <div class="duisonc" @click="earnings()">
          <div class="reou">
            <img src="../../assets/tupian/index_earning.png" alt="tu"/>
          </div>
          <div class="efhd">理财收益</div>
        </div>
        <div class="duisonc" @click="recom()">
          <div class="reou">
            <img src="../../assets/tupian/index_invite.png" alt="tu"/>
          </div>
          <div class="efhd">推荐奖励</div>
        </div>
        <div class="duisonc" @click="team()">
          <div class="reou">
            <img src="../../assets/tupian/index_team.png" alt="tu"/>
          </div>
          <div class="efhd">团队奖励</div>
        </div>
        <div class="duisonc" @click="currtra()">
          <div class="reou">
            <img src="../../assets/tupian/index_trade.png" alt="tu"/>
          </div>
          <div class="efhd">交易中心</div>
        </div>
        <div class="duisonc" @click="cjscm()">
          <div class="reou">
            <img src="../../assets/tupian/index_c2c.png" alt="tu"/>
          </div>
          <div class="efhd">C2C交易</div>
        </div>
        <div class="duisonc" @click="samePay()">
          <div class="reou">
            <img src="../../assets/tupian/index_city.png" alt="tu"/>
          </div>
          <div class="efhd">同城支付</div>
        </div>
        <div class="duisonc" @click="appset()">
          <div class="reou">
            <img src="../../assets/tupian/index_help.png" alt="tu"/>
          </div>
          <div class="efhd">咨询帮助</div>
        </div>
        <div class="duisonc" @click="download()">
          <div class="reou">
            <img src="../../assets/tupian/index_download.png" alt="tu"/>
          </div>
          <div class="efhd">下载中心</div>
        </div>
        <div class="duisonc" @click="exit()">
          <div class="reou">
            <img src="../../assets/tupian/index_logout.png" alt="tu"/>
          </div>
          <div class="efhd">退出登录</div>
        </div>
      </div>
    </div>
    <!-- <div class="list">
      <div class="list_item" @click="perturbation()">
        <div class="list_tub">
          <div class="list_tou">
            <img src="../../assets/tupian/index_info.png" alt="tu"/>
          </div>
          <div class="list_text">个人信息</div>
        </div>
        <div class="more">
          <img src="../../assets/tupian/public_table_right@2x.png" />
        </div>
      </div>
      <div class="list_item" @click="myassets()">
        <div class="list_tub">
          <div class="list_tou">
            <img src="../../assets/tupian/index_wallet@2x.png" alt="tu"/>
          </div>
          <div class="list_text">我的资产</div>
        </div>
        <div class="more">
          <img src="../../assets/tupian/public_table_right@2x.png" />
        </div>
      </div>
      <div class="list_item" @click="recom()">
        <div class="list_tub">
          <div class="list_tou">
            <img src="../../assets/tupian/index_invite.png" alt="tu"/>
          </div>
          <div class="list_text">我的推荐</div>
        </div>
        <div class="more">
          <img src="../../assets/tupian/public_table_right@2x.png" />
        </div>
      </div>
      <div class="list_item" @click="modify6()">
        <div class="list_tub">
          <div class="list_tou">
            <img src="../../assets/tupian/index_people.png" alt="tu"/>
          </div>
          <div class="list_text">推荐明细</div>
        </div>
        <div class="more">
          <img src="../../assets/tupian/public_table_right@2x.png" />
        </div>
      </div>
      <div class="list_item" @click="team()">
        <div class="list_tub">
          <div class="list_tou">
            <img src="../../assets/tupian/index_team.png" alt="tu"/>
          </div>
          <div class="list_text">我的团队</div>
        </div>
        <div class="more">
          <img src="../../assets/tupian/public_table_right@2x.png" />
        </div>
      </div>
      <div class="list_item" @click="currtra()">
        <div class="list_tub">
          <div class="list_tou">
            <img src="../../assets/tupian/index_trade.png" alt="tu"/>
          </div>
          <div class="list_text">交易中心</div>
        </div>
        <div class="more">
          <img src="../../assets/tupian/public_table_right@2x.png" />
        </div>
      </div>
      <div class="list_item" @click="appset()">
        <div class="list_tub">
          <div class="list_tou">
            <img src="../../assets/tupian/index_help.png" alt="tu"/>
          </div>
          <div class="list_text">咨询帮助</div>
        </div>
        <div class="more">
          <img src="../../assets/tupian/public_table_right@2x.png" />
        </div>
      </div>
      <div class="list_item" @click="download()">
        <div class="list_tub">
          <div class="list_tou">
            <img src="../../assets/tupian/index_download.png" alt="tu"/>
          </div>
          <div class="list_text">下载中心</div>
        </div>
        <div class="more">
          <img src="../../assets/tupian/public_table_right@2x.png" />
        </div>
      </div>
      <div class="exit" @click="exit()">
        退出登录
      </div>
    </div> -->
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  name: 'userinfo',
  data () {
    return {
      phone: '',
      ID: '',
      assets: {},
      userin: {},
      list: {},
      // kiuton: [],
      key1: 'account_num', // 已注册人数
      key2: 'cwf_issue_amount', // 发行总量
      key3: 'circulate_num', // 已发行
      key4: 'not_circulate_num', // 未发行
      sxf1: '',
      sxf2: '',
      sxf3: '',
      sxf4: ''
    }
  },
  mounted () {
    this.ID = JSON.parse(sessionStorage.ID)
    this.init()
    // this.newnotice()
  },
  filters: {
    // *号省略
    hideMiddle (val) {
      if (val) {
        return `${val.substring(0, 3)}****${val.substring(val.length - 3)}`
      }
    }
  },
  methods: {
    init () {
      // 获取公告信息
      this.$post('/api/notice/list')
        .then(res => {
          this.list = res.data.page.records[0]
          // this.$message({
          //   message: res.data.msg,
          //   type: 'success'
          // })
        })
        .catch(err => {
          console.log(err)
        })
      // 获取注册人数一栏
      this.$post('/api/param/valByKeys', {keys: [this.key1]})
        .then(res => {
          this.sxf1 = res.data.page.records[0].avalue
        })
        .catch(err => {
          console.log(err)
        })
      this.$post('/api/param/valByKeys', {keys: [this.key2]})
        .then(res => {
          this.sxf2 = res.data.page.records[0].avalue
        })
        .catch(err => {
          console.log(err)
        })
      this.$post('/api/param/valByKeys', {keys: [this.key3]})
        .then(res => {
          this.sxf3 = res.data.page.records[0].avalue
        })
        .catch(err => {
          console.log(err)
        })
      this.$post('/api/param/valByKeys', {keys: [this.key4]})
        .then(res => {
          this.sxf4 = res.data.page.records[0].avalue
        })
        .catch(err => {
          console.log(err)
        })
      // 参数列表
      this.$post('/api/param/list')
        .then(res => {
          this.kiuton = res.data.page.records
        })
      // 个人资产
      this.$post('/api/asset/' + this.ID)
        .then(res => {
          this.assets = res.data.page.records[0]
        })
        .catch(err => {
          console.log(err)
        })
      // 用户详细信息
      this.$post('/api/user/' + this.ID)
        .then(res => {
          if (res.data.code === 1) {
            this.userin = res.data.page.records[0]
            if (res.data.page.records[0].parentId === 0) {
              this.$router.push({
                path: `/modify5`
              })
            }
          } else {
            sessionStorage.setItem('ID', ``)
            Cookies.remove('token')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    newnotice () {
      // 获取公告信息
      this.$post('/api/notice/list')
        .then(res => {
          this.list = res.data.page.records[0]
        })
        .catch(err => {
          console.log(err)
        })
    },
    perturbation () {
      this.$router.push({
        path: `/personal`
      })
    },
    myassets () {
      if (this.userin.name && this.userin.idCard) {
        this.$router.push({
          path: `/myassets`
        })
      } else {
        this.$message({
          message: '请实名认证',
          type: 'success'
        })
        this.$router.push({
          path: `/modify4`
        })
      }
      // this.$router.push({
      //   path: `/myassets`
      // })
    },
    earnings () {
      this.$router.push({
        path: `/financial`
      })
    },
    currtra () {
      if (this.userin.name && this.userin.idCard) {
        this.$router.push({
          path: `/CurrencyTrading`
        })
      } else {
        this.$message({
          message: '请实名认证',
          type: 'success'
        })
        this.$router.push({
          path: `/modify4`
        })
      }
      // this.$router.push({
      //   path: `/CurrencyTrading`
      // })
    },
    recom () {
      this.$router.push({
        path: `/recommended`
      })
    },
    team () {
      this.$router.push({
        path: `/team`
      })
    },
    modify6 () {
      this.$router.push({
        path: `/modify6`
      })
    },
    cjscm () {
      this.$router.push({
        path: `/trading/${1}`
      })
    },
    samePay () {
      this.$message({
        message: '暂未开通',
        type: 'success'
      })
    },
    appset () {
      this.$router.push({
        path: `/appset`
      })
    },
    download () {
      this.$router.push({
        path: `/download`
      })
    },
    notice () {
      this.$router.push({
        path: `/notice`
      })
    },
    exit () {
      sessionStorage.setItem('ID', ``)
      Cookies.remove('token')
      this.$message({
        message: '退出成功',
        type: 'success'
      })
      this.$router.push({
        path: `/passwordLogin`
      })
      // location.reload()
      // this.$get('/api/user/logout')
      //   .then(res => {
      //     console.log(res)
      //   })
    }
  }
}
</script>
<style lang="scss" scoped>
  .userinfo{
    width: 100%;
    background:rgba(240,240,240,1);
    min-height: 100vh;
    .header{
      width:100%;
      height:44px;
      font-size:16px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(0,0,0,0.85);
      line-height:44px;
      text-align: center;
      background-color: #ffffff;
    }
    .personal{
      width:100%;
      padding: 10px 18px;
      box-sizing: border-box;
      background:rgba(255,255,255,1);
      display: flex;
      align-items: center;
      .toux{
        width: 66px;
        img{
          width: 100%;
          display: block;
        }
      }
      .information{
        margin-left: 10px;
        text-align: left;
        .name{
          flex: 1;
          .name1{
            height:25px;
            font-size:18px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(0,0,0,0.85);
            line-height:25px;
            display: inline-block;
          }
          .pho{
            height:14px;
            font-size:10px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(0,0,0,0.5);
            line-height:14px;
            display: inline-block;
          }
        }
        .assets{
          margin-top: 8px;
          .bizi{
            height:17px;
            font-size:12px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(0,0,0,0.5);
            line-height:17px;
            display: inline-block;
          }
          .num{
            height:20px;
            font-size:14px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(0,0,0,0.85);
            line-height:20px;
            display: inline-block;
          }
        }
      }
    }
    .stati{
      margin: 8px 8px;
      background:rgba(255,255,255,1);
      padding: 15px 0;
      border-radius:6px;
      display: flex;
      align-items: center;
      .botuc{
        width: 50%;
        border-right: 1px solid rgba(0, 0, 0, 0.25);
        text-align: center;
        div:nth-child(1){
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(0,0,0,0.85);
          line-height:17px;
        }
        div:nth-child(2){
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(234,111,90,1);
          line-height:17px;
          margin-top: 5px;
        }
      }
    }
    .notice{
      margin: 0 8px;
      background:rgba(255,255,255,1);
      border-radius:6px;
      padding: 10px 12px;
      height: 60px;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .notice_tu{
        width: 20px;
        img{
          width: 100%;
          display: block
        }
      }
      .new_notice{
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(0,0,0,0.85);
        line-height:17px;
        margin-left: 8px;
        border-right: 2px solid rgba(0, 0, 0, 0.1);
        padding-right: 5px;
      }
      .notice_text{
        margin-left: 5px;
        text-align: left;
        flex: 1;
        .title{
          width: 100%;
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(0,0,0,0.85);
          line-height:17px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
        .details{
          width:100%;
          height:16px;
          font-size:10px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(0,0,0,0.5);
          line-height:16px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
      }
    }
    .new_list{
      background:rgba(255,255,255,1);
      border-radius:6px;
      margin: 8px 8px;
      padding: 10px 12px;
      box-sizing: border-box;
      .vyui{
        width:100%;
        height:30px;
        font-size:14px;
        font-weight:500;
        color:rgba(0,0,0,0.85);
        line-height:30px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        padding: 0 5px;
        box-sizing: border-box;
        text-align: left;
      }
      .gusfn{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .duisonc{
          width: 25%;
          height: 70px;
          padding: 11px 0;
          box-sizing: border-box;
          .reou{
            width: 25px;
            margin: auto;
            img{
              width: 100%;
              display: block;
            }
          }
          .efhd{
            width:100%;
            height:17px;
            font-size:12px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(0,0,0,0.85);
            line-height:17px;
            margin-top: 6px;
          }
        }
      }
    }
    .list{
      margin: 8px 8px;
      background:rgba(255,255,255,1);
      border-radius:6px;
      .list_item{
        width: 100%;
        padding: 0 12px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 48px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        .list_tub{
          display: flex;
          align-items: center;
          .list_tou{
            width: 20px;
            img{
              width: 100%;
              display: block;
            }
          }
          .list_text{
            height:20px;
            font-size:14px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(0,0,0,0.85);
            line-height:20px;
            margin-left: 8px;
          }
        }
        .more{
          width: 10px;
          img{
            width: 100%;
            display: block;
          }
        }
      }
    }
    .exit{
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size:16px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(234,111,90,1);
    }
  }
</style>
