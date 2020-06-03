<template>
  <div class="login">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con"></div>
      <div class="icon_right">
      </div>
    </div>
    <div style="width:100%;height:70px;" class="ryiuh">
      <div></div>
      <el-select v-model="value" placeholder="请选择" @change="qwe(value)" class="hiuoy">
        <el-option
          v-for="item in qihua"
          style="background: rgba(0,0,0,0);border: none;"
          :key="item.en"
          :label="item.en"
          :value="item.en">
        </el-option>
      </el-select>
    </div>
    <div class="head">
      {{ $t('phone_deng') }}
    </div>
    <div class="phone" >
      <input type="number" :placeholder="$t('phone')" v-model="phone"/>
    </div>
    <!-- <div class="phone" v-if="!lang">
      <input type="number" placeholder="Please enter your phone number" v-model="phone"/>
    </div> -->
    <div class="code" >
      <input type="number" :placeholder="$t('codev')" v-model="verifyCode"/>
      <div class="yzm" @click="code()" v-if="yhsi">{{ $t('yzm') }}</div>
      <div v-if="!yhsi" class="miao">{{ getCode1 }} {{ $t('mia_hou') }}</div>
    </div>
    <!-- <div class="code" v-if="!lang">
      <input type="number" placeholder="Verification code" v-model="verifyCode"/>
      <div class="yzm" @click="code()" v-if="yhsi">{{ getCode1 }}</div>
      <div v-if="!yhsi" class="miao">{{ getCode1 }}</div>
    </div> -->
    <button class="btn" @click="submit()" :disabled="isDisable">{{ $t('login') }}</button>
    <!-- <div class="btn" @click="submit()" v-if="!lang">Login</div> -->
    <!-- <div class="pas_login" @click="zhanhao()" >{{ $t('number_pas') }}</div> -->
    <!-- <div class="pas_login" @click="zhanhao()" v-if="!lang">Password login</div> -->
    <div class="tisi" >{{ $t('login_text') }}</div>
    <!-- <div class="tisi" v-if="!lang">If you do not have an account, login on this page will automatically register your account</div> -->
  </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers'
import Cookies from 'js-cookie'
export default {
  name: 'login',
  data () {
    return {
      setl: null,
      getCode: '获取验证码',
      yhsi: true,
      phone: '',
      telCode: Number,
      verifyCode: '',
      qihua: [
        {en: '简体中文', id: 2},
        {en: 'English', id: 1}
      ],
      value: 'English',
      lang: false,
      getCode1: 'SMS Code',
      isDisable: false
    }
  },
  mounted () {
    this.phone = this.$route.query.ciuon
    // 获取cookie：
    if (Cookies.get('PLAY_LANG') === 'zh' || Cookies.get('PLAY_LANG') === 'en') {
      var lash = Cookies.get('PLAY_LANG')
      this.$i18n.locale = Cookies.get('PLAY_LANG')
    } else {
      this.$i18n.locale = 'en'
      Cookies.set('PLAY_LANG', 'en')
    }
    if (lash === 'zh') {
      this.value = '简体中文'
    } else {
      this.value = 'English'
    }
  },
  methods: {
    back () {
      this.$router.push({
        path: `/passwordLogin`,
        query: {ciuon: this.phone}
      })
    },
    qwe (e) {
      if (e === '简体中文') {
        this.$i18n.locale = 'zh'
        Cookies.set('PLAY_LANG', 'zh')
        this.lang = true
        this.value = '简体中文'
      } else {
        this.lang = false
        this.$i18n.locale = 'en'
        Cookies.set('PLAY_LANG', 'en')
        this.value = 'English'
      }
    },
    code () {
      let mobileReg = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (mobileReg.test(this.phone)) {
        this.yhsi = false
        this.$post('/api/sms/send', {phone: this.phone})
          .then(res => {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
          })
          .catch(err => {
            console.log(err)
          })
        let that = this
        that.telCode = 60
        var TIME_COUNT = setInterval(() => {
          if (that.telCode > 0) {
            that.yhsi = false
            that.telCode--
            that.getCode = that.telCode
            that.getCode1 = that.telCode
          } else {
            that.yhsi = true
            clearInterval(TIME_COUNT)
          }
        }, 1000)
      } else {
        this.$message({
          message: '手机号错误',
          type: 'warning'
        })
      }
    },
    zhanhao () {
      this.$router.push({
        path: `/passwordLogin`
      })
    },
    log_hui () {
      setTimeout(() => {
        this.isDisable = false
      }, 3000)
    },
    submit () {
      if (this.phone) {
        if (this.verifyCode) {
          this.isDisable = true
          this.log_hui()
          this.$post('/api/user/singUp', {identifier: this.phone, verifyCode: this.verifyCode})
            .then(res => {
              // this.log_hui()
              if (res.data.code === 1) {
                // this.$message({
                //   message: '登陆成功',
                //   type: 'success'
                // })
                sessionStorage.setItem('ID', `${JSON.stringify(res.data.page.records[0].id)}`)
                // 存入cookie：
                Cookies.set('token', res.data.page.records[0].token)
                // 获取cookie：
                let token = Cookies.get('token')
                this.isDisable = false
                console.log(token)
                // let fopkl = setTimeout(() => {
                //   this.isDisable = true
                // }, 3000)
                // 删除cookie:
                // Cookies.remove('token')
                if (token) {
                  let that = this
                  setTimeout(() => {
                    that.$router.push({
                      path: `/`
                    })
                    // that.$shuxin()
                    that.$message({
                      title: '成功',
                      message: '登录成功',
                      type: 'success'
                    })
                  })
                } else {
                  this.$message({
                    title: '失败',
                    message: '登陆失败',
                    type: 'error'
                  })
                  this.isDisable = false
                }
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
            message: '请输验证码',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '请输入手机号',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login{
  width: 100%;
  min-height: 100vh;
  background-color: rgba(245,245,245,1);
  .ryiuh{
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
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
  .head{
    height:33px;
    font-size:24px;
    font-weight:500;
    color:rgba(0,0,0,0.85);
    line-height:33px;
    padding-left:40px;
    box-sizing: border-box;
    text-align: left;
  }
  .hiuoy{
    width: 120px;
    color: #1774BA;
    .el-input__inner{
      background: rgba(0,0,0,0);
      border: none;
    }
  }
  .phone{
    width: 100%;
    padding: 0 14px;
    box-sizing: border-box;
    margin-top: 35px;
    input{
      border: none;
      outline: none;
      width: 100%;
      text-indent: 1em;
      height: 45px;
      line-height: 45px;
      font-size: 16px;
      background-color: rgba(0,0,0,0)
    }
  }
  .code{
    width: 100%;
    padding: 0 14px;
    box-sizing: border-box;
    margin-top: 10px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    input{
      flex: 1;
      border: none;
      outline: none;
      width: 100%;
      text-indent: 1em;
      height: 45px;
      line-height: 45px;
      font-size: 16px;
      background-color: rgba(0,0,0,0)
    }
    .yzm{
      font-size:16px;
      font-weight:400;
      color:rgba(234,111,90,1);
    }
    .miao{
      color:rgba(0,0,0,0.5);
    }
  }
  .btn{
    width: 90%;
    height: 45px;
    margin: auto;
    background:rgba(234,111,90,1);
    border-radius:30px;
    font-size:18px;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:45px;
    text-align: center;
    border: none;
  }
  .pas_login{
    width:100%;
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(23,116,186,1);
    line-height:20px;
    margin-top: 20px;
  }
  .tisi{
    width:90%;
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(0,0,0,0.5);
    line-height:17px;
    margin: auto;
    margin-top: 200px;
  }
}
</style>
