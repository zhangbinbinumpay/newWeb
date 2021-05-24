<template>
  <div class="popout">    <!-- 弹框组件 -->
    <div style="height: 40px;width: 80%;display: flex;justify-content: flex-end" @click="onCancel">
      <img style="width: 26px;height: 26px"
           src="../../assets/images/close@2x.png">
    </div>
    <div class="popout_box">
      <div class="popout_box_top">
      </div>

      <ul class="popout_box_bot">
        <li>本活动为禾蛙新用户专享，即在禾蛙平台没有接单记录的用户，已有接单记录的用户不可参与此活动；</li>
        <li>新用户只有一次参与本活动的机会，新人任务期限过期后不能再参与此活动；</li>
        <li>禾蛙新用户任务期为自开启新用户任务之日起50天；</li>
        <li>用户在新用户任务期间推荐候选人且候选人在新用户任务期内完成面试、收到offer，猎头顾问可获得面试奖励、offer奖励；</li>
        <li>活动奖励需在新用户任务期间累计获得金额大于100元后发放，否则不予发放；</li>
        <li>活动奖励累计满100元时需填写个人账户收款信息，以便发放活动奖励；</li>
        <li>活动奖励在新用户任务期结束后10个工作日内发放至个人账户；</li>
        <li>归属同一猎企的猎头顾问发布的职位互相接单推荐不计算在新手任务中；</li>
        <li>用户推荐的简历必须真实有效，一经发现盲推、虚假简历、重复推荐等舞弊违规行为，禾蛙平台有权取消违规者参与活动资格且奖励不予发放；</li>
        <li>本活动不与其它活动同享，如有问题请咨询禾蛙工作人员；</li>
        <li>此活动解释权在法律范围内归禾蛙平台所有。</li>
      </ul>
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
    width: 80%;
    height: 55%;
    /*background-color: red;*/
    background-image: url("../../assets/images/rule_background@2x.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position-x: center;
    background-position-y: center;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .popout_box_top {
    width: 90%;
    height: 12%;
    margin-top: -2px;
    background-image: url("../../assets/images/rule_header.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position-x: center;
  }

  .popout_box_bot {
    width: 85%;
    height: 80%;
    padding-top: 10px;
    /*display: flex;*/
    /*justify-content: space-evenly;*/
    /*align-items: center;*/
    overflow: scroll;
  }

  .popout_box_bot li {
    /*width: 85%;*/
    /*height: 75%;*/
    list-style-type:disc;
    list-style-position: inside;
    /*background-color: #E6E6E6;*/
    width: 100%;
    color: #0A5669;
    padding-top: 10px;
    /*line-height: 30px;*/
    /*border: 1px solid #dddddd;*/
  }
</style>
