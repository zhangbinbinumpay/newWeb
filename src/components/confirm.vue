<template>
  <div class="hello_confirm">
    <div class="main-content">

      <p class="task-date">你的新用户任务期：<span class="task-date-detail">{{ taskDate }}</span></p>
      <button class="task-button" @click="onClickRule"><img style="width: 10px"
                                                            src="../assets/images/question-circle-fill@2x.png">活动规则
      </button>
    </div>
    <div class="reward-view">
      <p class="reward-amount">已获得任务奖励
        <span>{{ rewardAmount }}</span>元</p>
      <div class="confirm_reward_achieve" v-show="rewardAchieve" @click="rewardClick">
        <p>{{ awardInfoDone ? '查看领奖信息' : '填写领奖信息' }}
        </p>
      </div>
    </div>

    <div class="schedule-view">
      <div v-for="(item, index) in scheduleList" style="display: flex;align-items: center">
        <div style="height: 45px;margin-left: 1px;display: flex;
    flex-direction: row;align-items: center;">
          <div style="width: 55px;color: #004F63;text-align: right;font-size: 10px;transform: scale(0.8)">{{
              item.name
            }}
          </div>
          <div style="width: 10px;height: 10px;background: #CBEAEE;border-radius: 5px;margin-left: 4px"></div>
        </div>
        <!--        <div style="position: relative;background-color: red">-->
        <div v-show="index != 0"
             style="position: absolute; width: 2px;height: 13px;background: rgb(203, 234, 238);margin-left: 64px;margin-top:-32px;"></div>

        <div v-show="index != 3"
             style="position: absolute;width: 2px;height: 13px;background: rgb(203, 234, 238);margin-left: 64px;margin-top: 32px;"></div>
        <!--        </div>-->

        <!--进度条视图-->
        <div
            style="width: 80%;height: 100%;text-align: center; margin: 0 auto;display: flex;flex-direction: row;align-items: center;    padding-left: 10px;
    padding-right: 20px;">
          <my-process style="width: 75px;" :brd-rs="10" :pcs-height="14" :process-dept=30 bg-color="#E6A23C"
                      :show-striped="true"
                      :show-act="true"/>
          <div class="rightImage">
            <img style="width: 20px"
                 src="../assets/images/redpackge.png">
            <p> 2000元</p>
          </div>
        </div>
      </div>

    </div>
    <RulePopout v-show="isPrpout" v-on:cancel="onCancel"/>
    <AwardInfoPopout v-show="isAwardInfoAddShow" v-on:cancel="onCancel"/>
    <AwardInfoEditPopout v-show="isAwardInfoLookShow" v-on:cancel="onCancel" :can-edit-info="true" v-on:click="rewardEditClick"></AwardInfoEditPopout>
  </div>
</template>

<script>
import RulePopout from "./comment/RulePopout";
import myProcess from './comment/myProgress';
import AwardInfoPopout from "./comment/AwardInfoPopout";
import AwardInfoEditPopout from "./comment/AwardInfoEditPopout";

export default {
  name: 'Confirm',
  data() {
    return {
      contents: {},
      recommends: {},
      taskDate: '2021年6月1日至2021年7月1日',
      isPrpout: false,
      activeButtonState: true,/*活动禁用开关*/
      confirmAactiveSuccess: false,
      rewardAmount: '1000',
      scheduleList: [
        {name: '接单', allmount: '1000', currentamount: '50'},
        {name: '简历过筛', allmount: '1000', currentamount: '50'},
        {name: '完成面试', allmount: '1000', currentamount: '50'},
        {name: '发放offer', allmount: '1000', currentamount: '50'},
      ],
      rewardAchieve: true,/*可以领奖了*/
      awardInfoDone: true,/*领奖信息填写完成*/
      isAwardInfoAddShow: false,/*展示添加领奖信息*/
      isAwardInfoLookShow: false,/*展示领奖信息*/
    }
  },
  mounted() {
    this.home();
  },
  methods: {
    home() {
      this.$axios.get("/api/font/home").then(res => {
        if (res.status) {
          console.log(res.data);
          let {contents, recommends} = res.data.data;
          this.recommends = recommends;
          this.contents = contents;
        }
      })
    },
    goContent(cid, e) {
      this.$router.push({path: `/content/detail/${cid}`});
    },
    // 点击显示弹框
    onClickRule() {
      this.isPrpout = true
    },
    // 点击取消隐藏
    onCancel() {
      this.isPrpout = false
      this.isAwardInfoLookShow = false;
      this.isAwardInfoAddShow = false;
    },
    //开启活动
    confimActive() {
      this.confirmAactiveSuccess = true;
    },
    //领奖处理
    rewardClick() {
      if (this.awardInfoDone) {
        //已经填写了，进行查看
        this.isAwardInfoLookShow = true;
      } else {
        //未填写进行填写
        this.isAwardInfoAddShow = true;
      }
    },
    rewardEditClick(){
      //未填写进行填写
      this.isAwardInfoLookShow = false;
      this.isAwardInfoAddShow = true;
    }

  },
  components: {
    RulePopout,
    myProcess,
    AwardInfoPopout,
    AwardInfoEditPopout
  },
}
</script>

<style scoped>
.hello_confirm {
  background-image: url("../assets/images/yemian2.png");
  background-repeat: no-repeat;
  min-height: 780px;
  overflow: scroll;
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  background-size: auto 100%;
}

.main-content {
  position: absolute;
  margin-top: 37rem;
  height: 68px;
  width: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.reward-view {
  position: absolute;
  margin-top: 45rem;
  height: 36px;
  width: 50%;
  background: #14AEAB;
  border-radius: 6px 6px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.schedule-view {
  position: absolute;
  margin-top: 49rem;
  height: 180px;
  width: 50%;
  /*background: red;*/
}

.content-image p {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  /*font-weight: 500;*/
  /*color: #AB5700;*/
  line-height: 46px;
}

.reward-amount {
  font-size: 8px;
  font-family: PingFangSC-Medium, PingFang SC;
  /*font-weight: 500;*/
  color: white;
  overflow: hidden;
  white-space: nowrap;
  /*transform: scale(0.6)*/
}

.reward-amount span {
  font-size: 8px;
  font-family: PingFangSC-Medium, PingFang SC;
  /*font-weight: 500;*/
  color: #FEFF00;
  overflow: hidden;
  white-space: nowrap;
  /*transform: scale(0.6)*/
}

.confirm_reward_achieve {
  width: 56px;
  height: 15px;
  background: linear-gradient(180deg, #FDD45E 0%, #FDD45E 38%, #FEC84F 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.confirm_reward_achieve p {
  font-size: 8px;
  font-family: PingFangSC-Medium, PingFang SC;
  /*font-weight: 500;*/
  color: #AB5700;
  overflow: hidden;
  margin: 0 auto;
  transform: scale(0.8)
}

.task-date {
  font-size: 8px;
  font-family: PingFangSC-Medium, PingFang SC;
  /*font-weight: 500;*/
  color: #004F63;
  overflow: hidden;
  white-space: nowrap;
  transform: scale(0.6)
}

.task-date-detail {
  color: #FE750A;
}

.task-button {
  background-color: #CBEAEE;
  width: 60%;
  font-size: 8px;
  color: #14AEAB;
  transform: scale(0.6)
}

.rightImage {
  width: 50px;
  height: 30px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;
  background-position-y: center;
  position: relative;
}

.rightImage p {
  bottom: 0px;
  font-size: 8px;
  font-family: PingFangSC-Medium, PingFang SC;
  /*font-weight: 500;*/
  color: #004F63;
  /*overflow: hidden;*/
  white-space: nowrap;
  position: absolute;
  width: 100%;
  transform: scale(0.6);

}
</style>
