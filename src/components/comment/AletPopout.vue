<template>
  <div class="popout">    <!-- 弹框组件 -->

    <div class="popout_box">
      <div class="popout_close" @click="onCancel">
        <img class="popout_close_image"
             src="../../assets/images/alet_close@2x.png">
      </div>
      <div class="content_main">
        <span>  你已参加新手活动  </span>
        <span> 先去完成任务领取奖励吧!</span>
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
      this.$emit('confirm', "确定111")
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
  /*background-color: rgba(0, 0, 0, 0.5);*/
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.popout_close {
  z-index: 8;
  height: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 7px;
  margin-right: 17px;
}

.popout_close_image {
  width: 20px;
  height: 20px
}

.popout_box {
  width: 273px;
  height: 136px;
  background-color: #262626;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position-x: center;
  background-position-y: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 6px;
  /*opacity: 0.85;*/
  /*justify-content: center;*/
}
.content_main{
  width: 223px;
  height: 136px;
  /*margin-top: 30px;*/
  position: absolute;
  background-color: #262626;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position-x: center;
  background-position-y: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.content_main span {
  width: 120px;
  /*height: 27px;*/
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 14px;
  text-align: center;
}
</style>
