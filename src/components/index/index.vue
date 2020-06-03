<template>
  <div class="index">
    <div class="header">
      <div class="icon_left"></div>
      <div class="text_con">HKBTC</div>
      <div class="icon_right">
        <img src="../../assets/navi_setting.png" alt="icon"/>>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in banner" :key="index">
          <img :src="item.img" alt="banner" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!-- 轮播结束 -->
    <div class="notice">
      <div class="notice_icon">
        <img src="../../assets/index_notice.png">
      </div>
      <div class="notice_text">
        <marquee direction="up" scrolldelay="1000">
          <div>夏日钜献 锁仓FIL、USDT 空投UC 兑换 IPFS矿机</div>
          <div>USDT 空投UC</div>
          <div>兑换 IPFS矿机</div>
        </marquee>
      </div>
    </div>
    <div class="hot">
      <div class="hot_cur">
        <div class="curreny">BTC/USDT</div>
        <div class="price">10384.89</div>
        <div class="gains">-3.72%</div>
        <div class="reduced">≈72009.57 CNY</div>
      </div>
      <div class="hot_cur">
        <div class="curreny">BTC/USDT</div>
        <div class="price">10384.89</div>
        <div class="gains">-3.72%</div>
        <div class="reduced">≈72009.57 CNY</div>
      </div>
      <div class="hot_cur">
        <div class="curreny">BTC/USDT</div>
        <div class="price">10384.89</div>
        <div class="gains">-3.72%</div>
        <div class="reduced">≈72009.57 CNY</div>
      </div>
    </div>
    <div class="middle">
      <div class="lock" @click="lock()">
        <div class="lock_l">
          <div class="cnoim">锁仓</div>
          <div class="derion">绑定上级并锁仓送好礼</div>
        </div>
        <div class="lock_r">
          <img src="../../assets/index_lock.png">
        </div>
      </div>
      <div class="middle_right">
        <div class="market" @click="curr()">
          <div class="m_icon">
            <img src="../../assets/index_market.png">
          </div>
          <div class="m_text">币币行情</div>
        </div>
        <div class="help" @click="help()">
          <div class="m_icon">
            <img src="../../assets/index_help.png">
          </div>
          <div class="m_text">使用帮助</div>
        </div>
      </div>
    </div>
    <div class="trade">
      <div class="doer" :class="active == 1 ? 'active' : ''" @click="tanc(1)">USDT交易区</div>
      <div class="doer" :class="active == 2 ? 'active' : ''" @click="open4()">BTC交易区</div>
    </div>
    <div class="table">
      <div class="list" v-for="(item,index) in indexcoin" :key="index">
        <div class="name1">
          <div class="tub">
            <img :src="'https://www.logo.trade.hkbtc.com' + '/storage/app/images/small/' + item.logo_path + '.png'">
          </div>
          <div class="n_text">{{ item.unit }}/{{ item.trade_currency.unit }}</div>
        </div>
        <div class="paic">
          <div class="unit">10384.89 U</div>
          <div class="unit1">≈72009.57 CNY</div>
        </div>
        <div class="btn">
          <button>+3.72%</button>
        </div>
      </div>
    </div>
    <div style="width:100%;height:60px;"></div>
    <div class="footer">
      <div class="list"  @click="index()">
        <div class="icon">
          <img src="../../assets/tab_index_selected.png"/>
        </div>
        <div class="text_a taber_act">首页</div>
      </div>
      <div class="list" @click="curr()">
        <div class="icon">
          <img src="../../assets/tab_coin_normal.png"/>
        </div>
        <div class="text_a">币币</div>
      </div>
      <div class="list" @click="ctwo()">
        <div class="icon">
          <img src="../../assets/tab_c2c_normal.png"/>
        </div>
        <div class="text_a">C2C</div>
      </div>
      <div class="list" @click="lock()">
        <div class="icon">
          <img src="../../assets/tab_lock_normal.png"/>
        </div>
        <div class="text_a">锁仓</div>
      </div>
      <div class="list" @click="my()">
        <div class="icon">
          <img src="../../assets/tab_user_normal.png"/>
        </div>
        <div class="text_a">个人中心</div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import Cookies from 'js-cookie'
export default {
  name: 'Index',
  data () {
    return {
      active: '1',
      banner: [],
      indexcoin: []
    }
  },
  mounted () {
    // 存入cookie：
    Cookies.set('token', '1111')
    // 获取cookie：
    let token = Cookies.get('token')
    console.log(token)
    // 删除cookie:
    // Cookies.remove('token')
    this.init()
  },
  methods: {
    init () {
      // 获取轮播图
      this.$get('/img/show')
        .then(res => {
          this.banner = res
          setTimeout(() => {
            this.swipt()
          }, 1000)
        })
        .catch(err => {
          console.log(err)
        })
      // 获取推荐币种
      this.$get('/trade/indexcoin')
        .then(res => {
          this.indexcoin = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    swipt () {
      var swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
          delay: 3000
        },
        pagination: {
          el: '.swiper-pagination'
        }
      })
      console.log(swiper)
    },
    tanc (e) {
      this.active = e
    },
    open4 () {
      this.$message({
        showClose: true,
        message: '暂未开放',
        type: 'error'
      })
      // this.$notify.error({
      //   title: '错误',
      //   message: '这是一条错误的提示消息'
      // })
    },
    // 跳页
    index () {
      this.$router.push({
        path: `/`
      })
    },
    curr () {
      this.$router.push({
        path: `/CurrencyTrading`
      })
    },
    ctwo () {
      this.$router.push({
        path: `/crransaction`
      })
    },
    lock () {
      this.$router.push({
        path: `/lock`
      })
    },
    my () {
      this.$router.push({
        path: `/userinfo`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .index{
    width: 100%;
    // background-color: red;
    .header{
      height: 44px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #353535;
      padding: 0 16px;
      box-sizing: border-box;
      .icon_left{
        width: 22px;
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
        color:rgba(255,255,255,1);
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
    img{
      width: 100%;
      display: block;
    }
    .notice{
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0 24px;
      box-sizing: border-box;
      border-bottom: 1px solid #eeeeee;
      .notice_icon{
        width: 16px;
        margin-right: 4px;
      }
      .notice_text{
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(0,0,0,0.85);
        line-height:17px;
        marquee{
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(0,0,0,0.85);
          line-height:17px;
        }
      }
    }
    .hot{
      width: 100%;
      padding: 10px 0;
      display: flex;
      align-items: center;
      .hot_cur{
        width: calc(100% / 3);
        text-align: center;
        .curreny{
          height:14px;
          font-size:10px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(0,0,0,0.85);
          line-height:14px;
        }
        .price{
          height:22px;
          font-size:16px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(238,85,85,1);
          line-height:22px;
        }
        .gains{
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(238,85,85,1);
          line-height:17px;
        }
        .reduced{
          height:14px;
          font-size:10px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:400;
          color:rgba(0,0,0,0.5);
          line-height:14px;
        }
      }
    }
    .middle{
      width: 100%;
      padding: 5px;
      box-sizing: border-box;
      background-color: rgba(238,240,241,1);
      display: flex;
      justify-content: space-between;
      .lock{
        width: calc((100% - 6px) / 2);
        height:80px;
        background-color: #ffffff;
        padding: 7px 22px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .lock_l{
          width: 70%;
          text-align: left;
          .cnoim{
            height:25px;
            font-size:18px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(0,0,0,0.85);
            line-height:25px;
          }
          .derion{
            height:34px;
            font-size:12px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(0,0,0,0.5);
            line-height:17px;
          }
        }
        .lock_r{
          width: 25px;
          img{
            width: 100%;
            display: block;
          }
        }
      }
      .middle_right{
        width: calc((100% - 6px) / 2);
        height:80px;
        .market{
          width: 100%;
          height:38px;
          background-color: #ffffff;
          display: flex;
          align-items: center;
          padding-left: 11px;
          box-sizing: border-box;
          .m_icon{
            width: 14px;
            margin-right: 5px;
            img{
              width: 100%;
              display: block;
            }
          }
          .m_text{
            height:20px;
            font-size:14px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(0,0,0,0.85);
            line-height:20px;
          }
        }
        .help{
          width: 100%;
          height:38px;
          background-color: #ffffff;
          margin-top: 4px;
          display: flex;
          align-items: center;
          padding-left: 11px;
          box-sizing: border-box;
          .m_icon{
            width: 14px;
            margin-right: 5px;
            img{
              width: 100%;
              display: block;
            }
          }
          .m_text{
            height:20px;
            font-size:14px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(0,0,0,0.85);
            line-height:20px;
          }
        }
      }
    }
    .trade{
      width: 100%;
      height: 33px;
      padding: 0 8px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      .doer{
        height:33px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(0,0,0,0.85);
        line-height:33px;
        margin-right: 15px;
      }
      .active{
        color:rgba(0,142,187,1);
        border-bottom: 1px solid #008EBB;
      }
    }
    .table{
      width: 100%;
      .list{
        width: 100%;
        height: 44px;
        border-bottom: 1px solid #eeeeee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        box-sizing: border-box;
        .name1{
          width: 30%;
          height: 44px;
          display: flex;
          align-items: center;
          .tub{
            width: 18px;
            height: 18px;
            margin-right: 7px;
            img{
              width: 100%;
              display: block;
            }
            .n_text{
              height:20px;
              font-size:14px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(0,0,0,0.85);
              line-height:20px;
            }
          }
        }
        .paic{
          flex: 1;
          .unit{
            height:17px;
            font-size:12px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(15,168,88,1);
            line-height:17px;
          }
          .unit1{
            height:14px;
            font-size:10px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(0,0,0,0.5);
            line-height:14px;
          }
        }
        .btn{
          width: 30%;
          button{
            padding: 5px 14px;
            color: #ffffff;
            background-color: #0FA858;
            border: none;
            margin-right: 0;
          }
        }
      }
    }
    .footer{
      width: 100%;
      background-color: #ffffff;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 49px;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 9999;
      .list{
        display: block;
        .icon{
          width: 25px;
          margin: auto;
          img{
            width: 100%;
            display: block;
          }
        }
        .text_a{
          margin-top: 4px;
          width:100%;
          font-size:8px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(0,0,0,0.25);
          line-height:11px;
        }
        .taber_act{
          color: #008EBB;
        }
      }
    }
  }
</style>
