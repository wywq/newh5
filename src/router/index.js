import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // 首页
    {
      path: '/index',
      name: 'index',
      component: () => import('../components/index/index.vue')
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/login/login.vue')
    },
    {
      path: '/passwordLogin',
      name: 'passwordLogin',
      component: () => import('../components/login/passwordLogin.vue')
    },
    // 行情
    {
      path: '/market',
      name: 'market',
      component: () => import('@/components/CurrencyTrading/market.vue')
    },
    // 全部委托
    {
      path: '/entrust',
      name: 'entrust',
      component: () => import('@/components/CurrencyTrading/entrust.vue')
    },
    // C2C
    {
      path: '/crransaction',
      name: 'crransaction',
      component: () => import('@/components/crransaction/crransaction.vue')
    },
    // 锁仓
    {
      path: '/lock',
      name: 'lock',
      component: () => import('@/components/lock/lock.vue')
    },
    // 个人中心
    {
      path: '/',
      name: 'userinfo',
      component: () => import('@/components/userinfo/userinfo.vue')
    },
    // 个人信息
    {
      path: '/personal',
      name: 'personal',
      component: () => import('@/components/userinfo/personal.vue')
    },
    // 修改昵称
    {
      path: '/modify1',
      name: 'modify1',
      component: () => import('@/components/userinfo/modify1.vue')
    },
    // 修改登录密码
    {
      path: '/modify2',
      name: 'modify2',
      component: () => import('@/components/userinfo/modify2.vue')
    },
    // 修改支付密码
    {
      path: '/modify3',
      name: 'modify3',
      component: () => import('@/components/userinfo/modify3.vue')
    },
    // 实名认证
    {
      path: '/modify4',
      name: 'modify4',
      component: () => import('@/components/userinfo/modify4.vue')
    },
    // 绑定推荐人
    {
      path: '/modify5',
      name: 'modify5',
      component: () => import('@/components/userinfo/modify5.vue')
    },
    // 推荐人名单
    {
      path: '/modify6',
      name: 'modify6',
      component: () => import('@/components/userinfo/modify6.vue')
    },
    // 支付绑定
    {
      path: '/modify7',
      name: 'modify7',
      component: () => import('@/components/userinfo/modify7.vue')
    },
    // 微信
    {
      path: '/wechat',
      name: 'wechat',
      component: () => import('@/components/pay/wechat.vue')
    },
    // 支付宝
    {
      path: '/alipay',
      name: 'alipay',
      component: () => import('@/components/pay/alipay.vue')
    },
    // 银行卡
    {
      path: '/bank',
      name: 'bank',
      component: () => import('@/components/pay/bank.vue')
    },
    // 我的资产
    {
      path: '/myassets',
      name: 'myassets',
      component: () => import('@/components/myassets/myassets.vue')
    },
    // 理财收益
    {
      path: '/financial',
      name: 'financial',
      component: () => import('@/components/userinfo/financial.vue')
    },
    // 充币自动
    {
      path: '/charge',
      name: 'charge',
      component: () => import('@/components/myassets/charge.vue')
    },
    // 充币手动
    {
      path: '/chargeManual',
      name: 'chargeManual',
      component: () => import('@/components/myassets/chargeManual.vue')
    },
    // 充值记录
    {
      path: '/newChargeRecord',
      name: 'newChargeRecord',
      component: () => import('@/components/myassets/newChargeRecord.vue')
    },
    // 自动充币记录
    {
      path: '/chargeRecord',
      name: 'chargeRecord',
      component: () => import('@/components/myassets/chargeRecord.vue')
    },
    // 手动充币记录
    {
      path: '/chargeManuslRecord',
      name: 'chargeManuslRecord',
      component: () => import('@/components/myassets/chargeManuslRecord.vue')
    },
    // 提现自动
    {
      path: '/mention',
      name: 'mention',
      component: () => import('@/components/myassets/mention.vue')
    },
    // 提现手动
    {
      path: '/mentionManual',
      name: 'mentionManual',
      component: () => import('@/components/myassets/mentionManual.vue')
    },
    // 提现记录自动
    {
      path: '/mentionRecord',
      name: 'mentionRecord',
      component: () => import('@/components/myassets/mentionRecord.vue')
    },
    // 提现记录全部
    {
      path: '/newMentionRecord',
      name: 'newMentionRecord',
      component: () => import('@/components/myassets/newMentionRecord.vue')
    },
    // 提现记录手动
    {
      path: '/mentionManualRecord',
      name: 'mentionManualRecord',
      component: () => import('@/components/myassets/mentionManualRecord.vue')
    },
    // 提现地址
    {
      path: '/mentionAddress',
      name: 'mentionAddress',
      component: () => import('@/components/myassets/mentionAddress.vue')
    },
    // 提现地址
    {
      path: '/mentionAddressMan',
      name: 'mentionAddressMan',
      component: () => import('@/components/myassets/mentionAddressMan.vue')
    },
    // 添加提现地址
    {
      path: '/mentionAdd',
      name: 'mentionAdd',
      component: () => import('@/components/myassets/mentionAdd.vue')
    },
    // 兑换
    {
      path: '/exchange',
      name: 'exchange',
      component: () => import('@/components/myassets/exchange.vue')
    },
    // 收益
    {
      path: '/earnings',
      name: 'earnings',
      component: () => import('@/components/myassets/earnings.vue')
    },
    // 转账
    {
      path: '/transfer',
      name: 'transfer',
      component: () => import('@/components/myassets/transfer.vue')
    },
    // 转账记录
    {
      path: '/transferRecord',
      name: 'transferRecord',
      component: () => import('@/components/myassets/transferRecord.vue')
    },
    // 转账USDT
    {
      path: '/transferUsdt',
      name: 'transferUsdt',
      component: () => import('@/components/myassets/transferUsdt.vue')
    },
    // 转账USDT记录
    {
      path: '/transferUsdtRecord',
      name: 'transferUsdtRecord',
      component: () => import('@/components/myassets/transferUsdtRecord.vue')
    },
    // 交易中心
    {
      path: '/CurrencyTrading',
      name: 'CurrencyTrading',
      component: () => import('@/components/CurrencyTrading/CurrencyTrading.vue')
    },
    // 我的推荐
    {
      path: '/recommended',
      name: 'recommended',
      component: () => import('@/components/recommended/recommended.vue')
    },
    // 我的推荐详情
    {
      path: '/recommendedDetails/:id',
      name: 'recommendedDetails',
      component: () => import('@/components/recommended/recommendedDetails.vue')
    },
    // 我的团队
    {
      path: '/team',
      name: 'team',
      component: () => import('@/components/recommended/team.vue')
    },
    // 我的团队详情
    {
      path: '/teamDetails/:id',
      name: 'teamDetails',
      component: () => import('@/components/recommended/teamDetails.vue')
    },
    // APP设置
    {
      path: '/appset',
      name: 'appset',
      component: () => import('@/components/appset/appset.vue')
    },
    // 帮助与咨询
    {
      path: '/help',
      name: 'help',
      component: () => import('@/components/help/help.vue')
    },
    // 咨询详情
    {
      path: '/helpDetails/:id',
      name: 'helpDetails',
      component: () => import('@/components/help/helpDetails.vue')
    },
    // 咨询详情
    {
      path: '/newhelp',
      name: 'newhelp',
      component: () => import('@/components/help/newhelp.vue')
    },
    // 公告列表
    {
      path: '/notice',
      name: 'notice',
      component: () => import('@/components/notice/notice.vue')
    },
    // 公告详情
    {
      path: '/noticeDetails/:id',
      name: 'noticeDetails',
      component: () => import('@/components/notice/noticeDetails.vue')
    },
    // 下载中心
    {
      path: '/download',
      name: 'download',
      component: () => import('@/components/download/download.vue')
    },
    // C2C交易
    {
      path: '/trading/:id',
      name: 'trading',
      component: () => import('@/components/trading/trading.vue')
    },
    // 发布买入
    {
      path: '/releaseBuy',
      name: 'releaseBuy',
      component: () => import('@/components/trading/releaseBuy.vue')
    },
    // 发布卖出
    {
      path: '/releaseSell',
      name: 'releaseSell',
      component: () => import('@/components/trading/releaseSell.vue')
    },
    // 买入
    {
      path: '/buy/:id',
      name: 'buy',
      component: () => import('@/components/trading/buy.vue')
    },
    // 卖出
    {
      path: '/sell/:id',
      name: 'sell',
      component: () => import('@/components/trading/sell.vue')
    },
    // 二维码
    {
      path: '/qrCode',
      name: 'qrCode',
      component: () => import('@/components/trading/qrCode.vue')
    },
    // 我的订单
    {
      path: '/myOrder/:id',
      name: 'myOrder',
      component: () => import('@/components/trading/myOrder.vue')
    },
    // 订单详情
    {
      path: '/orderDetails/:id',
      name: 'orderDetails',
      component: () => import('@/components/trading/orderDetails.vue')
    },
    // 发布管理
    {
      path: '/releaseManagement/:id',
      name: 'releaseManagement',
      component: () => import('@/components/trading/releaseManagement.vue')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  }
})
router.beforeEach((to, from, next) => {
  // 将所有需要登陆才显示的页面的路由都放进一个数组(放name里的名称)
  const nextRoute = ['userinfo', 'download', 'newMentionRecord', 'newChargeRecord', 'mentionManual', 'mentionManualRecord', 'mentionAddressMan', 'chargeManuslRecord', 'chargeManual', 'transferUsdt', 'transferRecord', 'mentionRecord', 'chargeRecord', 'market', 'noticeDetails', 'notice', 'newhelp', 'appset', 'helpDetails', 'help', 'appset', 'teamDetails', 'team', 'recommendedDetails', 'recommended', 'exchange', 'CurrencyTrading', 'transfer', 'earnings', 'mentionAdd', 'mentionAddress', 'entrust', 'crransaction', 'lock', 'personal', 'modify1', 'modify2', 'modify3', 'modify4', 'modify5', 'myassets', 'charge', 'mention'] // 'userinfo'
  // 获取登陆状态
  let isLogin = Cookies.get('token')
  // let fuiId = JSON.parse(sessionStorage.ID)
  let fuiId = window.sessionStorage.getItem('ID')
  if (to.name === 'passwordLogin') { // 如果是登录页，则跳过验证
    next() // 必不可少
    return // 以下的代码不执行
  }
  if (nextRoute.indexOf(to.name) >= 0) { // 判断该页面是否需要登陆
    if (!isLogin || !fuiId) { // 判断登陆状态
      next({name: 'passwordLogin'}) // 如果未登录，则跳转到登录页
      console.log('333')
    } else {
      next() // 如果已经登陆，那就可以跳转
    }
  } else { // 其他的无需登陆的页面不做验证
    next()
  }
})

export default router
