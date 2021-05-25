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
        <div style="height: 40px;background-color: red;display: flex;flex-direction: row;align-items: center">
          <p style="color:#0A5669;font-size: 10px;width: 60px "> 银行卡卡号</p>
          <input style="height: 30px;border-radius: 2px" placeholder="请输入银行卡号"></input>

        </div>
        <uinput style="height: 10px;width: 220px" :onlyInput="true" placeholder="银行卡号输入框" type="bankcard"
                inputBorder="bottom"></uinput>

      </div>
    </div>
  </div>
</template>

<script>

    import uinput from "./uinput";

    export default {
        data() {
            return {
                isPrpout: true
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
            }
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
    overflow: scroll;
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
</style>
