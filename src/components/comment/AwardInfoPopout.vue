<template>
  <div class="popout">    <!-- 弹框组件 -->
    <div style="height: 40px;width: 80%;display: flex;justify-content: flex-end" @click="onCancel">
      <img style="width: 26px;height: 26px"
           src="../../assets/images/close@2x.png">
    </div>
    <div class="popout_box">
      <div class="popout_box_top">
      </div>

      <div class="popout_box_bot">
        <p style="color: #0A5669;font-size: 10px;transform: scale(0.9);white-space: nowrap;">
          请填写下方信息，我们将在新用户任务全部结束后发放奖励~
        </p>
        <div style="height: 200px;display: flex;flex-direction: column;align-items: center;margin-top: 20px">
          <uinput style="height: 40px;width: 280px" :onlyInput="false" label="银行卡号" placeholder="请填写本人银行卡号"
                  type="bankcard"
                  inputBorder="all" labelPosition="right" v-model="bankCard"
                  @inputclear="bankCard = $event.clear"></uinput>
          <uinput style="height: 40px;width: 280px" :onlyInput="false" label="姓名" placeholder="请填写本人真实姓名"
                  inputBorder="all" labelPosition="right" v-model="userName"
                  @inputclear="userName = $event.clear"></uinput>
          <uinput style="height: 40px;width: 280px" :onlyInput="false" label="身份证号" placeholder="请填写本人身份证号"
                  type="idcard"
                  inputBorder="all" labelPosition="right" v-model="idCardNo"
                  @inputclear="idCardNo = $event.clear"></uinput>
          <uinput style="height: 40px;width: 280px" :onlyInput="false" label="禾蛙账号"
                  disabled="disabled" type="label" inputBorder="none" labelPosition="right"
                  :defaultValue="userPhone"></uinput>
          <uinput style="height: 40px;width: 280px" :onlyInput="false" label="验证码" placeholder="请填写验证码"
                  type="msgcode"
                  :send="true"
                  inputBorder="all" labelPosition="right" v-model="sendCode"
                  :@counting="authCode"
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
      this.$emit('click', [this.bankCard, this.userName, this.idCardNo, this.sendCode].concat('-'))
    },
    //发送手机验证码
    authCode() {
      this.$g_loadingShow('数据加载中');
      let url = "act/api/v1/web/authCode";
      this.getRequest(url, this.userData).then(res => {
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

.popout_box {
  width: 80%;
  height: 55%;
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
  width: 90%;
  height: 12%;
  background-image: url("../../assets/images/award_mark@2x.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;
}

.popout_box_bot {
  width: 85%;
  height: 80%;
  padding-top: 10px;
  /*overflow: scroll;*/
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

.reward_achieve {
  width: 80px;
  height: 30px;
  background: linear-gradient(180deg, #FDD45E 0%, #FDD45E 38%, #FEC84F 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;

}

.reward_achieve p {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  color: #AB5700;
  overflow: hidden;
  margin: 0 auto;
  /*transform: scale(0.8)*/
}
</style>
