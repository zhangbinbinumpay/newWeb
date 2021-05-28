<template>
  <div class="hello_confirm">

    <img style="max-width: 100%;max-height: 100%;" src="../assets/images/yemian2.png"/>

    <div class="main-content">

      <p class="task-date">你的新用户任务期：<span class="task-date-detail">{{ taskDate }}</span></p>
      <button class="task-button" @click="onClickRule"><img style="width: 10px"
                                                            src="../assets/images/question-circle-fill@2x.png">活动规则
      </button>
    </div>
    <div class="reward-view">
      <p class="reward-amount">已获得任务奖励
        <span>{{ rewardAmount }}</span> 元</p>
      <div class="confirm_reward_achieve" v-show="rewardAchieve" @click="rewardClick">
        <p>{{ awardInfoDone ? '查看领奖信息' : '填写领奖信息' }}
        </p>
      </div>
    </div>

    <div class="schedule-view">
      <div v-for="(item, index) in scheduleList" style="display: flex;align-items: center">
        <div class="schedule-item">
          <div class="schedule-item_text1">{{
              item.name
            }}
          </div>
          <div class="schedule-item_circle"></div>
        </div>
        <div v-show="index != 0"
             class="schedule-item_line2"></div>

        <div v-show="index != 3"
             class="schedule-item_line3"></div>

        <!--进度条视图-->
        <div
            class="progress-view">
          <my-process class="progress-item" :brd-rs="10" :pcs-height="8" :process-dept='item.precent'
                      bg-color="#EE4A49"
                      :show-striped="true"
                      :show-txt="true"
                      :txt="item.currentamount"
                      :show-act="false"/>
          <div class="rightImage">
            <img src="../assets/images/redpackge.png">
            <p> {{ item.allmount }}</p>
          </div>
        </div>
      </div>

    </div>
    <RulePopout v-show="isPrpout" v-on:cancel="onCancel"/>
    <AwardInfoPopout v-show="isAwardInfoAddShow" v-on:cancel="onCancel"
                     :user-phone="userPhone"
                     :token="userData.token"
                     :user_id="userData.user_id"
                     v-on:click="addUserAccount"/>
    <AwardInfoEditPopout v-show="isAwardInfoLookShow" v-on:cancel="onCancel" :can-edit-info="true"
                         v-on:click="rewardEditClick"
                         :bank-account="userAccount.bankAccount"
                         :user-name="userAccount.userName"
                         :user-mobile="userAccount.userMobile"
                         :identity-card="userAccount.identityCard"
    ></AwardInfoEditPopout>
  </div>
</template>

<script>
import RulePopout from "./comment/RulePopout";
import myProcess from './comment/myProgress';
import AwardInfoPopout from "./comment/AwardInfoPopout";
import AwardInfoEditPopout from "./comment/AwardInfoEditPopout";
import util from '../util'

export default {
  name: 'confirm',
  data() {
    return {
      userPhone: '',
      userData: {},
      userAccount: {},
      taskDate: '',//'2021年6月1日至2021年7月1日',
      isPrpout: false,
      activeButtonState: true,/*活动禁用开关*/
      confirmAactiveSuccess: false,
      rewardAmount: '0',
      scheduleList: [
        {name: '接单', allmount: '1000', currentamount: '', precent: 0},
        {name: '简历过筛', allmount: '1000', currentamount: '20元', precent: 20},
        {name: '完成面试', allmount: '1000', currentamount: '', precent: 40},
        {name: '发放offer', allmount: '1000', currentamount: '', precent: 50},
      ],
      userActBonus: [],/*奖励明细*/
      rewardAchieve: false,/*可以领奖了*/
      awardInfoDone: false,/*领奖信息填写完成*/
      isAwardInfoAddShow: false,/*展示添加领奖信息*/
      isAwardInfoLookShow: false,/*展示领奖信息*/
    }
  },
  mounted() {
    this.userData = this.$route.params;
    //进行数据转换 userId user_id
    if (!this.userData.user_id) {
      this.userData = this.$route.query;
    }
    this.userData['userId'] = this.userData.user_id;
    this.userData['actId'] = this.userData.act_id;
    // console.log('userData1:' + JSON.stringify(this.userData));

    //TODO
    this.queryDetail();
  },
  methods: {
    //获取奖励进度
    queryDetail() {
      let that = this;
      this.$g_loadingShow('数据加载中');
      let url = "act/api/v1/web/currentBonus";
      this.getRequest(url, this.userData).then(res => {
        this.$g_loadingHide();
        let responseData = res.data;
        if (responseData) {
          let status = responseData.status;
          if (status.code === 200) {
            let responseData = res.data.data;
            let startTime = responseData.startTime;
            let endTime = responseData.endTime;
            this.taskDate = util.dateFormatStr(startTime) + '至' + util.dateFormatStr(endTime);
            let totalBonus = responseData.totalBonus;
            this.rewardAmount = parseInt(totalBonus) / 100;
            this.rewardAchieve = this.rewardAmount > 100;
            this.userPhone = responseData.mobile;
            //开始转换任务进度数据
            let tuserActBonus = responseData.userActBonus;
            let targetArr = [];
            for (let i = 0; i < tuserActBonus.length; i++) {
              let schedule = tuserActBonus[i];
              var scheduleTarget = {};
              let missionId = schedule.missionId;
              let name = '';
              //take_job_order 接单,recommend_candidate 推人,resume_pass 过筛,finsh_interview 面试完成,get_offer 获得offer
              if (missionId === 'take_job_order') {
                name = '接单';
              } else if (missionId === 'recommend_candidate') {
                name = '推人';
              } else if (missionId === 'resume_pass') {
                name = '过筛';
              } else if (missionId === 'finsh_interview') {
                name = '面试完成';
              } else if (missionId === 'get_offer') {
                name = '获得offer';
              }
              let accomplishCount = schedule.accomplishCount;
              let bonus = schedule.bonus;
              scheduleTarget['name'] = name;
              let currentAmount = parseInt(accomplishCount) / 100;
              scheduleTarget['currentamount'] = currentAmount > 0 ? currentAmount + '元' : '';
              scheduleTarget['allmount'] = parseInt(bonus) / 100 + '元';
              scheduleTarget['precent'] = accomplishCount / bonus * 100;
              targetArr.push(scheduleTarget);
            }
            this.scheduleList = targetArr;
            if (this.rewardAchieve) {
              //奖励达成，需要获取结算账户信息
              that.queryUserAccount();
            }
          } else {
            this.$g_toast(status.detail);
          }
        } else {
          this.$g_toast('网络异常，请重试！');
        }

      }).catch(err => {
        this.$g_loadingHide();
        this.activeButtonState = false;
      });
    },
    // 点击显示弹框
    onClickRule() {
      this.isPrpout = true
    },
    // 点击取消隐藏
    onCancel() {
      this.isPrpout = false;
      this.isAwardInfoLookShow = false;
      this.isAwardInfoAddShow = false;
    },
    //开启活动
    confimActive() {
      this.confirmAactiveSuccess = true;
    },

    //领奖处理
    rewardClick() {
      //先进行账户信息同步
      this.queryUserAccount();

      // this.awardInfoDone = true;
      // this.userPhone = '15811378367';
      // if (this.awardInfoDone) {
      //     //已经填写了，进行查看
      //     this.isAwardInfoLookShow = true;
      // } else {
      //     //未填写进行填写
      //     this.isAwardInfoAddShow = true;
      // }
    },
    addUserAccount(userInfo) {
      console.log('userInfo:' + userInfo);
      if (this.awardInfoDone) {
        this.updateUserAccount(userInfo);
      } else {
        //全新提交
        this.saveUserAccount(userInfo);
      }
    },
    rewardEditClick() {
      //未填写进行填写
      this.isAwardInfoLookShow = false;
      this.isAwardInfoAddShow = true;
    },
    //查询结算账户信息
    queryUserAccount() {
      this.$g_loadingShow('数据加载中');
      let url = "act/api/v1/web/UserAccount";
      this.getRequest(url, this.userData).then(res => {
        this.$g_loadingHide();
        // console.log('res.data:' + JSON.stringify(res));
        let respnseData = res.data;
        if (respnseData) {
          let status = respnseData.status;
          if (status.code === 200) {
            let accountData = respnseData.data;
            this.awardInfoDone = accountData !== undefined;
            this.userAccount = accountData;
          } else {
            this.$g_toast(status.detail);
          }
        } else {
          //请求错误
          this.$g_toast('网络异常，请重试！');
        }

      }).catch(err => {
        console.log('er1r:' + err);
        this.$g_loadingHide();
      });
    },

    //保存结算账户信息
    saveUserAccount(userInfo) {
      let infoArr = userInfo.split('-');
      var accountMap = this.userData;
      accountMap['userMobile'] = this.userPhone;
      accountMap['bankAccount'] = infoArr[0];
      accountMap['userName'] = infoArr[1];
      accountMap['identityCard'] = infoArr[2];
      accountMap['authCode'] = infoArr[3];
      console.log('accountMap:' + JSON.stringify(accountMap));

      let url = 'act/api/v1/web/saveUserAccount';
      this.$g_loadingShow('数据加载中');
      this.postRequest(url, accountMap).then(response => {
        this.$g_loadingHide();
        let responseData = res.data;
        if (responseData) {
          let status = responseData.status;
          if (status.code === 200) {
            //保存成功
            this.onCancel();
            this.awardInfoDone = true;
          } else {
            this.$g_toast(status.detail);
          }
        } else {
          this.$g_toast('网络异常，请重试！');
        }
      }).catch(err => {
        this.$g_loadingHide();
      });
    },

    //更新结算账户信息
    updateUserAccount(userInfo) {
      let infoArr = userInfo.split('-');
      var accountMap = this.userData;
      accountMap['userMobile'] = this.userPhone;
      accountMap['bankAccount'] = infoArr[0];
      accountMap['userName'] = infoArr[1];
      accountMap['identityCard'] = infoArr[2];
      accountMap['authCode'] = infoArr[3];
      console.log('editAccountMap:' + JSON.stringify(accountMap));

      let url = 'act/api/v1/web/updateUserAccount';
      this.$g_loadingShow('数据加载中');

      this.postRequest(url, accountMap).then(response => {
        this.$g_loadingHide();
        let responseData = res.data;
        if (responseData) {
          let status = responseData.status;
          if (status.code === 200) {
            //保存成功
            this.onCancel();
          } else {
            this.$g_toast(status.detail);
          }
        } else {
          this.$g_toast('网络异常，请重试！');
        }
      }).catch(err => {
        this.$g_loadingHide();
      });
    },

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
  /*background-image: url("../assets/images/yemian2.png");*/
  background-repeat: no-repeat;
  min-height: 780px;
  overflow: scroll;
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  background-size: auto 100%;
  background-position-x: center;
  background-position-y: center;
  /*background-position: center center;*/
}

.main-content {
  position: absolute;
  margin-top: 550px;
  height: 68px;
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.reward-view {
  position: absolute;
  margin-top: 665px;
  height: 47px;
  width: 363px;
  background: #14AEAB;
  border-radius: 6px 6px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.schedule-view {
  position: absolute;
  margin-top: 716px;
  height: 280px;
  width: 363px;
}

.schedule-item {
  height: 70px;
  margin-left: 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.schedule-item_text1 {
  width: 55px;
  color: #004F63;
  text-align: right;
  font-size: 12px;
  transform: scale(0.8)
}

.schedule-item_circle {
  width: 10px;
  height: 10px;
  background: #CBEAEE;
  border-radius: 5px;
  margin-left: 4px
}

.schedule-item_line2 {
  position: absolute;
  width: 2px;
  height: 34px;
  background: rgb(203, 234, 238);
  margin-left: 64px;
  margin-top: -36px;
}

.schedule-item_line3 {
  position: absolute;
  width: 2px;
  height: 34px;
  background: rgb(203, 234, 238);
  margin-left: 64px;
  margin-top: 36px;
}

.content-image p {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  /*font-weight: 500;*/
  /*color: #AB5700;*/
  line-height: 46px;
}

.reward-amount {
  font-size: 17px;
  font-family: PingFangSC-Medium, PingFang SC;
  /*font-weight: 500;*/
  color: white;
  overflow: hidden;
  white-space: nowrap;
}

.reward-amount span {
  font-size: 17px;
  font-family: PingFangSC-Medium, PingFang SC;
  /*font-weight: 500;*/
  color: #FEFF00;
  overflow: hidden;
  white-space: nowrap;
  /*transform: scale(0.6)*/
}

.confirm_reward_achieve {
  width: 88px;
  height: 23px;
  background: linear-gradient(180deg, #FDD45E 0%, #FDD45E 38%, #FEC84F 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.confirm_reward_achieve p {
  font-size: 9px;
  font-family: PingFangSC-Medium, PingFang SC;
  /*font-weight: 500;*/
  color: #AB5700;
  overflow: hidden;
  margin: 0 auto;
}

.task-date {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  /*font-weight: 500;*/
  color: #004F63;
  overflow: hidden;
  white-space: nowrap;
  /*transform: scale(0.8)*/
}

.task-date-detail {
  color: #FE750A;
}

.task-button {
  background-color: #CBEAEE;
  width: 60%;
  font-size: 10px;
  color: #14AEAB;
  /*transform: scale(0.6)*/

}

.rightImage {
  width: 50px;
  height: 30px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;
  background-position-y: center;
  position: absolute;
  right: 10px;
}

.rightImage img {
  width: 30px
}

.rightImage p {
  /*bottom: 0px;*/
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  /*font-weight: 500;*/
  color: #004F63;
  /*overflow: hidden;*/
  white-space: nowrap;
  position: absolute;
  width: 100%;
}

.progress-view {
  width: 100%;
  height: 100%;
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.progress-item {
  width: 90%;
  margin-left: 10px
}
</style>
