<template>
  <div class="popout">
    <!-- 弹框组件 -->
    <div class="popout_close" @click="onCancel">
      <img class="popout_close_image" src="../../assets/images/close@2x.png" />
    </div>
    <div class="popout_box">
      <div class="popout_box_top"></div>

      <div class="popout_box_bot">
        <div class="popout_text_view">
          <div class="popout_text">
            开启禾蛙新人任务后<span style="color: #FE750A">50日内</span>完成任务
            最高可得5888元现金奖励哦~
          </div>
        </div>
        <div style="width: 100%;display: flex;justify-content: center;">
          <div class="reward_achieve" @click="onConfirm">
            <p style="cursor: pointer;">确认开启</p>
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
      isPrpout: true,
    }
  },
  methods: {
    //  点击确定
    onConfirm() {
      this.$emit('click', '取消111')
    },
    // 点击取消
    onCancel() {
      this.$emit('cancel', '取消111')
    },
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
  height: 136px;
  background-image: url('../../assets/images/smale_rule_back@2x.png');
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
  margin-top: -9px;
  background-image: url('../../assets/images/kaiqihuodong@2x.png');
  background-repeat: no-repeat;
  background-position-x: center;
  background-size: auto 100%;
}

.popout_box_bot {
  width: 100%;
  height: 100%;
  padding-top: 10px;
  flex-flow: row wrap;
  display: flex;
}

.popout_text_view {
  height: 34px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.popout_text {
  color: #0a5669;
  width: 80%;
  text-align: center;
  font-size: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-weight: 500;
  line-height: 17px;

  font-family: PingFangSC-Medium, PingFang SC;
}

.popout_box_bot li {
  list-style-type: disc;
  list-style-position: inside;
  width: 100%;
  color: #0a5669;
  padding-top: 10px;
}

.reward_achieve {
  width: 105px;
  height: 23px;
  background: linear-gradient(180deg, #fdd45e 0%, #fdd45e 38%, #fec84f 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
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
</style>
