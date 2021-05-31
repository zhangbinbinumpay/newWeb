<template>
  <div class="popout">
    <!-- 弹框组件 -->
    <div class="popout_box">
      <div class="popout_box_top"></div>

      <div class="popout_box_bot">
        <div style="width: 100%;display: flex;justify-content: center">
          <img
            class="circle_image"
            src="../../assets/images/info-circle@2x.png"
          />
        </div>
        <div
          style="width: 100%;display: flex;justify-content: center;flex-direction: column"
        >
          <div class="text_1">
            小蛙发现你不具备参与活动的资格哦~
          </div>
          <p class="text_2">
            所在猎企需要有3名以上顾问
          </p>
          <p class="text_3">
            且本人<span style="color: #FE750A">从未接过单</span
            >才可开启新用户任务
          </p>
        </div>
        <div
          style="width: 100%;display: flex;justify-content: center;flex-direction: column;align-items: center;margin-top: 20px"
        >
          <div class="reward_achieve" @click="onCancel">
            <p style="cursor: pointer;">我知道了</p>
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
      this.$emit('confirm', '确定111')
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

.popout_box {
  width: 236px;
  height: 172px;
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
  margin-top: -8px;
  background-image: url('../../assets/images/actvie_no_match_@2x.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;
}

.circle_image {
  width: 20px;
  height: 20px;
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
  color: #0a5669;
  padding-top: 10px;
}

.text_1 {
  color: #0a5669;
  text-align: center;
  font-size: 11px;
  transform: scale(0.8);
  white-space: nowrap;
}

.text_2 {
  color: #fe750a;
  width: 100%;
  text-align: center;
  font-size: 11px;
  transform: scale(0.8);
}

.text_3 {
  color: #0a5669;
  text-align: center;
  font-size: 11px;
  transform: scale(0.8);
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
