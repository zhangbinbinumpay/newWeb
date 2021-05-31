<template>
  <div class="popout">
    <!-- 弹框组件 -->
    <div class="popout_close" @click="onCancel">
      <img class="popout_close_image" src="../../assets/images/close@2x.png" />
    </div>
    <div class="popout_box">
      <div class="popout_box_top"></div>

      <div class="popout_box_bot">
        <div class="input_box">
          <uinput
            class="input_box_uinput"
            :onlyInput="false"
            label="银行卡号"
            disabled="disabled"
            type="label"
            inputBorder="none"
            labelPosition="right"
            :defaultValue="bankAccount"
          ></uinput>
          <uinput
            class="input_box_uinput"
            :onlyInput="false"
            label="姓名"
            disabled="disabled"
            type="label"
            inputBorder="none"
            labelPosition="right"
            :defaultValue="userName"
          ></uinput>
          <uinput
            class="input_box_uinput"
            :onlyInput="false"
            label="身份证号"
            disabled="disabled"
            type="label"
            inputBorder="none"
            labelPosition="right"
            :defaultValue="identityCard"
          ></uinput>
          <uinput
            class="input_box_uinput"
            :onlyInput="false"
            label="禾蛙账号"
            disabled="disabled"
            type="label"
            inputBorder="none"
            labelPosition="right"
            :defaultValue="userMobile"
          ></uinput>
        </div>
        <div class="bottom_box">
          <div v-if="canEditInfo" class="reward_achieve" @click="confirmPost">
            <p>修改信息</p>
          </div>
          <div class="no_editable" v-else>
            <p>任务期已结束，请耐心等待奖励发放！</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import uinput from './uinput'

export default {
  props: {
    canEditInfo: {
      type: Boolean,
      default: false,
    },
    userMobile: {
      type: String,
    },
    bankAccount: {
      type: String,
    },
    userName: {
      type: String,
    },
    identityCard: {
      type: String,
    },
  },
  data() {
    return {
      isPrpout: true,
    }
  },
  methods: {
    //  点击确定
    onConfirm() {
      this.$emit('confirm', '确定111')
    },
    // 点击取消
    onCancel() {
      this.$emit('cancel', '取消111')
    },
    //确认提交
    confirmPost() {
      this.$emit('click', '')
    },
  },
  components: {
    uinput,
  },
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
  height: 17px;
}

.popout_box {
  width: 236px;
  height: 218px;
  /*background-color: red;*/
  background-image: url('../../assets/images/rule_background@2x.png');
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
  margin-top: -6px;
  background-image: url('../../assets/images/lyxinxi@2x.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;
}

.popout_box_bot {
  width: 80%;
  /*height: 80%;*/
  /*padding-top: 10px;*/
  /*overflow: scroll;*/
  /*background-color: red;*/
}

.popout_box_bot li {
  list-style-type: disc;
  list-style-position: inside;
  width: 100%;
  color: #0a5669;
  padding-top: 10px;
  /*line-height: 30px;*/
  /*border: 1px solid #dddddd;*/
}

.input_box {
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
}

.input_box_uinput {
  height: 30px;
  width: 206px;
  padding-top: 8px;
}

.bottom_box {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 33px;
  /*background-color: red;*/
}

.reward_achieve {
  width: 105px;
  height: 23px;
  background: linear-gradient(180deg, #fdd45e 0%, #fdd45e 38%, #fec84f 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3),
    0px 0px 20px rgba(0, 0, 0, 0.1) inset;
}

.reward_achieve p {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  color: #ab5700;
  overflow: hidden;
  margin: 0 auto;
  /*transform: scale(0.8)*/
}

.no_editable {
  /*margin-top: 10px;*/
  /*margin-bottom: 12px;*/
}

.no_editable p {
  color: #fe750a;
  font-size: 10px;
}
</style>
