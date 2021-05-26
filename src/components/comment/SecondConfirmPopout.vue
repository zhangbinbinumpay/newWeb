<template>
  <div class="popout">    <!-- 弹框组件 -->
    <div style="height: 20px;width: 32%;display: flex;justify-content: flex-end" @click="onCancel">
      <img style="width: 20px;height: 20px"
           src="../../assets/images/close@2x.png">
    </div>
    <div class="popout_box">
      <div class="popout_box_top">
      </div>

      <div class="popout_box_bot">

        <div style="width: 100%;display: flex;justify-content: center;flex-direction: column">
          <div style="color: #0A5669;text-align: center;font-size: 12px;transform: scale(0.6);overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;">
            开启禾蛙新人任务后<span style="color: #FE750A">50日内</span>完成任务
            最高可得5888元现金奖励哦~
          </div>
        </div>
        <div
            style="width: 100%;display: flex;justify-content: center;">
          <div class="reward_achieve" @click="onConfirm">
            <p>确认开启
            </p>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPrpout: true
    }
  },
  methods: {
    //  点击确定
    onConfirm() {
      this.$emit('click', "取消111")
    },
    // 点击取消
    onCancel() {
      this.$emit('cancel', "取消111")
    }
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
  width: 31.5%;
  height: 18%;
  background-image: url("../../assets/images/smale_rule_back@2x.png");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-size: 100% 100%;
}

.popout_box_top {
  width: 67%;
  height: 14%;
  margin-top: -0.2rem;
  background-image: url("../../assets/images/kaiqihuodong@2x.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;
}

.popout_box_bot {
  width: 100%;
  height: 100%;
  padding-top: 10px;
  flex-flow: row wrap;
  display: flex;
}

.popout_box_bot li {
  list-style-type: disc;
  list-style-position: inside;
  width: 100%;
  color: #0A5669;
  padding-top: 10px;
}

.reward_achieve {
  width: 80px;
  height: 20px;
  background: linear-gradient(180deg, #FDD45E 0%, #FDD45E 38%, #FEC84F 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
}

.reward_achieve p {
  font-size: 8px;
  font-family: PingFangSC-Medium, PingFang SC;
  color: #AB5700;
  overflow: hidden;
  margin: 0 auto;
  /*transform: scale(0.8)*/
}
</style>
