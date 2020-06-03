<template>
  <div class="passwordLogin">
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
    <!-- <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/tupian/public_back_big.png" alt="icon"/>
      </div>
      <div class="text_con"></div>
      <div class="icon_right">
      </div>
    </div> -->
    <div style="width:100%;height:40px;" class="ryiuh">
      <div></div>
      <!-- <el-select v-model="value" placeholder="请选择" @change="qwe(value)" class="hiuoy">
        <el-option
          v-for="item in qihua"
          class="wer"
          popper-class="wer"
          style="background: rgba(0,0,0,0);border: none;"
          :key="item.en"
          :label="item.en"
          :value="item.en">
        </el-option>
      </el-select> -->
    </div>
    <div class="head">
      {{ $t('zh_password') }}
    </div>
    <div class="phone">
      <input type="text" :placeholder="$t('zh_pass_phone')" v-model="identifier"/>
    </div>
    <div class="phone" style="margin-top:10px;margin-bottom:30px;">
      <input type="password" :placeholder="$t('zh_pass_password')" v-model="password"/>
    </div>
    <button class="btn" @click="submit()" :disabled="isDisable">{{ $t('login') }}</button>
    <div class="pas_login" @click="zhanhao()" >{{ $t('number_pas') }}</div>
    <!-- <div class="btn" @click="submit()" :disabled="isDisable">{{ $t('login') }}</div> -->
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'passwordLogin',
  data () {
    return {
      identifier: '',
      password: '',
      isDisable: false,
      qihua: [
        {en: '简体中文', id: 2},
        {en: 'English', id: 1}
      ],
      value: 'English',
      lang: false
    }
  },
  mounted () {
    // this.$i18n.locale = Cookies.get('PLAY_LANG')
    // 获取cookie：
    this.identifier = this.$route.query.ciuon
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
    back () {
      // this.$router.go(-1)
      this.$router.push({
        path: `/login`
      })
    },
    zhanhao () {
      this.$router.push({
        path: `/login`,
        query: {ciuon: this.identifier}
      })
    },
    log_hui () {
      setTimeout(() => {
        this.isDisable = false
      }, 3000)
    },
    submit () {
      if (this.identifier) {
        if (this.password) {
          this.isDisable = true
          this.log_hui()
          this.$post('/api/user/login', {identifier: this.identifier, password: this.password})
            .then(res => {
              if (res.data.code === 1) {
                // this.$message({
                //   message: '登陆成功',
                //   type: 'success'
                // })
                sessionStorage.setItem('ID', `${JSON.stringify(res.data.page.records[0].id)}`)
                // 存入cookie：
                Cookies.set('token', res.data.page.records[0].token)
                let token = Cookies.get('token')
                this.isDisable = false
                if (token) {
                  let that = this
                  setTimeout(() => {
                    that.$router.push({
                      path: `/`
                    })
                    // that.$shuxin()
                    this.$message({
                      message: '登陆成功',
                      type: 'success'
                    })
                  })
                } else {
                  this.$message({
                    title: '失败',
                    message: '登陆失败',
                    type: 'error'
                  })
                }
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
                this.isDisable = false
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message({
            message: '请输密码',
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
.passwordLogin{
  width: 100%;
  min-height: 100vh;
  background-color: rgba(245,245,245,1);
  .ryiuh{
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .hiuoy{
      width: 120px;
    }
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
}
</style>
