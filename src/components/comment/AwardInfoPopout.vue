<template>
  <div class="popout">    <!-- 弹框组件 -->
    <div class="popout_close" @click="onCancel">
      <img class="popout_close_image"
           src="../../assets/images/close@2x.png">
    </div>
    <div class="popout_box">
      <div class="popout_box_top">
      </div>

      <div class="popout_box_bot">
        <p>
          请填写下方信息，我们将在新用户任务全部结束后发放奖励~
        </p>
        <div class="input_box">
          <uinput class="input_box_uinput" :onlyInput="false" label="银行卡号" placeholder="请填写本人银行卡号"
                  type="bankcard"
                  inputBorder="all" labelPosition="right" v-model="bankCard"
                  @inputclear="bankCard = $event.clear"></uinput>
          <uinput class="input_box_uinput" :onlyInput="false" label="姓名" placeholder="请填写本人真实姓名"
                  inputBorder="all" labelPosition="right" v-model="userName"
                  @inputclear="userName = $event.clear"></uinput>
          <uinput class="input_box_uinput" :onlyInput="false" label="身份证号" placeholder="请填写本人身份证号"
                  type="idcard"
                  inputBorder="all" labelPosition="right" v-model="idCardNo"
                  @inputclear="idCardNo = $event.clear"></uinput>
          <uinput class="input_box_uinput" :onlyInput="false" label="禾蛙账号"
                  disabled="disabled" type="label" inputBorder="none" labelPosition="right"
                  :defaultValue="userPhone"></uinput>
          <uinput class="input_box_uinput" :onlyInput="false" label="验证码" placeholder="请填写验证码"
                  type="msgcode"
                  :send="true"
                  inputBorder="all" labelPosition="right" v-model="sendCode"
                  v-on:counting="authCode"
                  @inputclear="sendCode = $event.clear"></uinput>
        </div>
        <div style="width: 100%; display: flex;justify-content: center;margin-top: 20px">
          <div class="reward_achieve" @click="confirmPost">
            <p>确认提交
            </p>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import uinput from "./uinput";

export default {
  props: {
    userPhone: {
      type: String
    },
    user_id: {
      type: String
    },
    token: {
      type: String
    }
  },

  data() {
    return {
      isPrpout: true,
      bankCard: '',
      userName: '',
      idCardNo: '',
      sendCode: ''
    }
  },
  methods: {
    //  点击确定
    onConfirm() {
      this.$emit('confirm', "确定111")
    },
    // 点击取消
    onCancel() {
      this.$emit('cancel', "取消111")
    },
    //确认提交
    confirmPost() {
      if (this.bankCard.length < 16) {
        this.$g_toast('银行卡号不正确');
        return;
      }
      if (this.userName.length < 2) {
        this.$g_toast('姓名不正确');
        return;
      }
      if (this.idCardNo.length < 16) {
        this.$g_toast('身份证号不正确');
        return;
      }
      if (this.sendCode.length < 5) {
        this.$g_toast('验证码不正确');
        return;
      }
      this.$emit('click', [this.bankCard, this.userName, this.idCardNo, this.sendCode].join('-'))
    },
    //发送手机验证码
    authCode() {
      this.$g_loadingShow('数据加载中');
      let url = "act/api/v1/web/authCode";
      var requestParam = {};
      requestParam['mobile'] = this.userPhone;
      requestParam['token'] = this.token;
      requestParam['user_id'] = this.user_id;
      // console.log("requestParam:"+JSON.stringify(requestParam));
      this.getRequest(url, requestParam).then(res => {
        this.$g_loadingHide();
        console.log('res.data:' + JSON.stringify(res));
        let respnseData = res.data;
        if (respnseData) {
          let status = respnseData.status;
          if (status.code === 200) {
            this.userAccount = res.data.data;
          } else {
            this.$g_toast(status.detail);
          }
        } else {
          //请求错误
        }

      }).catch(err => {
        console.log('er1r:' + err);
        this.$g_loadingHide();
      });
    },
  },
  components: {
    uinput
  }
}
</script>

<style scoped>
.popout {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.popout_close {
  height: 20px;
  width: 236px;
  display: flex;
  justify-content: flex-end;
}

.popout_close_image {
  width: 17px;
  height: 17px
}

.popout_box {
  width: 236px;
  height: 266px;
  /*background-color: red;*/
  background-image: url("../../assets/images/rule_background@2x.png");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-size: 100% 100%;
}

.popout_box_top {
  width: 160px;
  height: 35px;
  background-image: url("../../assets/images/award_mark@2x.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;
  margin-top: -6px;
}

.popout_box_bot {
  width: 85%;
  height: 80%;
  padding-top: 10px;
  /*overflow: scroll;*/
}

.popout_box_bot p {
  color: #0A5669;
  font-size: 8px;
  white-space: nowrap;
}

.popout_box_bot li {
  list-style-type: disc;
  list-style-position: inside;
  width: 100%;
  color: #0A5669;
  padding-top: 10px;
  /*line-height: 30px;*/
  /*border: 1px solid #dddddd;*/
}

.input_box {
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px
}

.input_box_uinput {
  height: 40px;
  width: 206px;
  padding-top: 8px;
}

.reward_achieve {
  width: 105px;
  height: 23px;
  background: linear-gradient(180deg, #FDD45E 0%, #FDD45E 38%, #FEC84F 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.reward_achieve p {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  color: #AB5700;
  overflow: hidden;
  margin: 0 auto;
}
</style>
