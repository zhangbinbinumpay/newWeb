<template>
  <div class="popout">    <!-- 弹框组件 -->
    <div class="popout_box">
      <div class="popout_box_top">
      </div>

      <div class="popout_box_bot">
        <div style="width: 100%;display: flex;justify-content: center">
          <img style="width: 26px;height: 26px"
               src="../../assets/images/info-circle@2x.png">
        </div>
        <div style="width: 100%;display: flex;justify-content: center;flex-direction: column">
          <p style="color: #0A5669;width: 100%;text-align: center;font-size: 12px">
            小蛙发现你不具备参与活动的资格哦~
          </p>
          <p style="color: #FE750A;width: 100%;text-align: center;font-size: 12px">
            所在猎企需要有3名以上顾问
          </p>
          <p style="color: #0A5669;text-align: center;font-size: 12px">
            且本人<span style="color: #FE750A">从未接过单</span>才可开启新用户任务
          </p>
        </div>
        <div
            style="width: 100%;display: flex;justify-content: center;flex-direction: column;align-items: center;margin-top: 20px">
          <div class="reward_achieve" @click="onCancel">
            <p>我知道了
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
    /*width: 60%;*/
    height: 22rem;
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
    width: 90%;
    height: 12%;
    margin-top: -0.2rem;
    background-image: url("../../assets/images/actvie_no_match_@2x.png");
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
