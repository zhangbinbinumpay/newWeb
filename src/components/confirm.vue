<template>
  <div class="hello_confirm">
    <img
      style="max-width: 100%;max-height: 100%;"
      src="../assets/images/yemian2.png"
    />

    <div class="main-content">
      <p class="task-date">
        你的新用户任务期：<span class="task-date-detail">{{ taskDate }}</span>
      </p>
      <button class="task-button" @click="onClickRule">
        <img src="../assets/images/question-circle-fill@2x.png" />活动规则
      </button>
    </div>
    <div class="reward-view">
      <p class="reward-amount">
        已获得任务奖励 <span>{{ rewardAmount }}</span> 元
      </p>
      <div
        class="confirm_reward_achieve"
        v-show="rewardAchieve"
        @click="rewardClick"
      >
        <p>{{ awardInfoDone ? '查看领奖信息' : '填写领奖信息' }}</p>
      </div>
    </div>

    <div class="schedule-view">
      <div
        v-for="(item, index) in scheduleList"
        style="display: flex;align-items: center"
        :key="index"
      >
        <div class="schedule-item">
          <div class="schedule-item_text1">{{ item.name }}</div>
          <div class="schedule-item_circle"></div>
        </div>
        <div v-show="index != 0" class="schedule-item_line2"></div>

        <div v-show="index != 3" class="schedule-item_line3"></div>

        <!--进度条视图-->
        <div class="progress-view">
          <my-process
            class="progress-item"
            :brd-rs="10"
            :process-dept="item.precent"
            bg-color="#EE4A49"
            :show-striped="true"
            :show-txt="item.precent <= 99.999"
            :txt="item.currentamount"
            :show-act="false"
          />
          <div class="rightImage">
            <img src="../assets/images/redpackge.png" />
            <p>{{ item.allmountStr }}</p>
          </div>
        </div>
      </div>
    </div>
    <RulePopout v-show="isPrpout" v-on:cancel="onCancel" />
    <AwardInfoPopout
      v-show="isAwardInfoAddShow"
      v-on:cancel="onCancel"
      :user-phone="userPhone"
      :token="userData.token"
      :user_id="userData.user_id"
      v-on:click="addUserAccount"
    />
    <AwardInfoEditPopout
      v-show="isAwardInfoLookShow"
      v-on:cancel="onCancel"
      :can-edit-info="isCanEditAccount"
      v-on:click="rewardEditClick"
      :bank-account="userAccount.bankAccount"
      :user-name="userAccount.userName"
      :user-mobile="userAccount.userMobile"
      :identity-card="userAccount.identityCard"
    ></AwardInfoEditPopout>
  </div>
</template>

<script>
import RulePopout from './comment/RulePopout'
import myProcess from './comment/myProgress'
import AwardInfoPopout from './comment/AwardInfoPopout'
import AwardInfoEditPopout from './comment/AwardInfoEditPopout'
import util from '../util'

export default {
  name: 'confirm',
  data() {
    return {
      userPhone: '',
      userData: {},
      userAccount: {},
      taskDate: '', //'2021年6月1日至2021年7月1日',
      isPrpout: false,
      activeButtonState: true /*活动禁用开关*/,
      confirmAactiveSuccess: false,
      rewardAmount: '0',
      scheduleList: [
        //take_job_order 接单,recommend_candidate 推人,resume_pass 过筛,finsh_interview 面试完成,get_offer 获得offer
        {
          name: '接单',
          allmount: '88',
          allmountStr: '88元',
          currentamount: '',
          precent: 0,
          missionId: 'take_job_order',
        },
        {
          name: '简历过筛',
          allmount: '800',
          allmountStr: '800元',
          currentamount: '870',
          precent: 0,
          missionId: 'resume_pass',
        },
        {
          name: '完成面试',
          allmount: '2000',
          allmountStr: '2000元',
          currentamount: '',
          precent: 0,
          missionId: 'finsh_interview',
        },
        {
          name: '发放offer',
          allmount: '3000',
          allmountStr: '3000元',
          currentamount: '',
          precent: 0,
          missionId: 'get_offer',
        },
      ],
      userActBonus: [] /*奖励明细*/,
      rewardAchieve: false /*可以领奖了*/,
      awardInfoDone: false /*领奖信息填写完成*/,
      isAwardInfoAddShow: false /*展示添加领奖信息*/,
      isAwardInfoLookShow: false /*展示领奖信息*/,
      isCanEditAccount: true /*默认可以修改结算底价*/,
    }
  },
  mounted() {
    let token = util.getUrlParam('token')
    let act_id = util.getUrlParam('act_id')
    let user_id = util.getUrlParam('user_id')
    this.userData = {
      token: token,
      act_id: act_id,
      user_id: user_id,
    }
    if (!this.userData.user_id) {
      this.userData = this.$route.params
    }

    //进行数据转换 userId user_id
    if (!this.userData.user_id) {
      this.userData = this.$route.query
    }
    this.userData['userId'] = this.userData.user_id
    this.userData['actId'] = this.userData.act_id
    // console.log('userData1:' + JSON.stringify(this.userData));
    this.queryDetail()
  },
  methods: {
    //获取奖励进度
    queryDetail() {
      let that = this
      this.$g_loadingShow('数据加载中')
      let url = 'act/api/v1/web/currentBonus'
      this.getRequest(url, this.userData)
        .then((res) => {
          this.$g_loadingHide()
          let responseData = res.data
          if (responseData) {
            let status = responseData.status
            if (status.code === 200) {
              let responseData = res.data.data
              let startTime = responseData.startTime
              let endTime = responseData.endTime
              that.taskDate =
                util.dateFormatStr(startTime) +
                '至' +
                util.dateFormatStr(endTime)
              //此处修改结算账户是否可以编辑
              let oDate2 = new Date(endTime)
              that.isCanEditAccount = new Date().getTime() < oDate2.getTime()

              let totalBonus = responseData.totalBonus
              that.rewardAmount = parseInt(totalBonus) / 100
              that.rewardAchieve = this.rewardAmount >= 100
              that.userPhone = responseData.mobile
              //开始转换任务进度数据
              let tuserActBonus = responseData.userActBonus
              let orignActBouns = this.scheduleList
              for (let i = 0; i < tuserActBonus.length; i++) {
                let schedule = tuserActBonus[i]
                let scheduleTarget = {}
                let missionId = schedule.missionId

                for (const scheduleTargetItem in orignActBouns) {
                  if (
                    orignActBouns[scheduleTargetItem].missionId === missionId
                  ) {
                    scheduleTarget = orignActBouns[scheduleTargetItem]
                    break
                  }
                }
                let allmount = scheduleTarget.allmount
                let bonus = schedule.bonus
                let currentAmount = parseInt(bonus) / 100
                scheduleTarget['currentamount'] =
                  currentAmount > 0 ? currentAmount : ''
                // scheduleTarget['allmount'] = parseInt(bonus) / 100 + '元';
                scheduleTarget['precent'] = (currentAmount / allmount) * 100
              }
              if (that.rewardAchieve) {
                //奖励达成，需要获取结算账户信息
                // that.queryUserAccount();
              }
            } else {
              this.$g_toast(status.detail)
            }
          } else {
            this.$g_toast('网络异常，请重试！')
          }
        })
        .catch((err) => {
          this.$g_loadingHide()
          this.activeButtonState = false
        })
    },
    // 点击显示弹框
    onClickRule() {
      this.isPrpout = true
    },
    // 点击取消隐藏
    onCancel() {
      this.isPrpout = false
      this.isAwardInfoLookShow = false
      this.isAwardInfoAddShow = false
    },
    //开启活动
    confimActive() {
      this.confirmAactiveSuccess = true
    },

    //领奖处理
    rewardClick() {
      //先进行账户信息同步
      this.queryUserAccount()

      // this.awardInfoDone = true
      // this.userPhone = '15811378367'
      // if (this.awardInfoDone) {
      //   //已经填写了，进行查看
      //   this.isAwardInfoLookShow = true
      // } else {
      //   //未填写进行填写
      //   this.isAwardInfoAddShow = true
      // }
    },
    addUserAccount(userInfo) {
      // console.log('userInfo:' + userInfo);
      if (this.awardInfoDone) {
        this.updateUserAccount(userInfo)
      } else {
        //全新提交
        this.saveUserAccount(userInfo)
      }
    },
    rewardEditClick() {
      //未填写进行填写
      this.isAwardInfoLookShow = false
      this.isAwardInfoAddShow = true
    },
    //查询结算账户信息
    queryUserAccount() {
      this.$g_loadingShow('数据加载中')
      let url = 'act/api/v1/web/UserAccount'
      this.getRequest(url, this.userData)
        .then((res) => {
          this.$g_loadingHide()
          // console.log('res.data:' + JSON.stringify(res));
          let respnseData = res.data
          if (respnseData) {
            let status = respnseData.status
            if (status.code === 200) {
              let accountData = respnseData.data
              this.awardInfoDone = accountData !== undefined
              this.userAccount = accountData
              this.isAwardInfoLookShow = true
            } else {
              this.$g_toast(status.detail)
            }
          } else {
            //未找到账户信息，直接跳转到详情界面
            this.isAwardInfoAddShow = true
            // this.$g_toast('网络异常，请重试！');
          }
        })
        .catch((err) => {
          // console.log('er1r:' + err);
          this.$g_loadingHide()
        })
    },

    //保存结算账户信息
    saveUserAccount(userInfo) {
      let infoArr = userInfo.split('-')
      var accountMap = this.userData
      accountMap['userMobile'] = this.userPhone
      accountMap['bankAccount'] = infoArr[0]
      accountMap['userName'] = infoArr[1]
      accountMap['identityCard'] = infoArr[2]
      accountMap['authCode'] = infoArr[3]
      // console.log('accountMap:' + JSON.stringify(accountMap));

      let url = 'act/api/v1/web/saveUserAccount'
      this.$g_loadingShow('数据加载中')
      this.postRequest(url, accountMap)
        .then((response) => {
          this.$g_loadingHide()
          let responseData = response.data
          if (responseData) {
            let status = responseData.status
            if (status.code === 200) {
              //保存成功
              this.onCancel()
              this.awardInfoDone = true
            } else {
              let errMsg = '网络异常，请重试！'
              switch (status.code) {
                case -3001:
                  errMsg = '请求发送短信失败'
                  break
                case -3002:
                  errMsg = '验证码错误'
                  break
                case -3003:
                  errMsg = '请求开启活动失败'
                  break
                case -3004:
                  errMsg = '无资格开启活动'
                  break
              }
              this.$g_toast(errMsg)
            }
          } else {
            this.$g_toast('网络异常，请重试！')
          }
        })
        .catch((err) => {
          this.$g_loadingHide()
        })
    },

    //更新结算账户信息
    updateUserAccount(userInfo) {
      let infoArr = userInfo.split('-')
      var accountMap = this.userData
      accountMap['userMobile'] = this.userPhone
      accountMap['bankAccount'] = infoArr[0]
      accountMap['userName'] = infoArr[1]
      accountMap['identityCard'] = infoArr[2]
      accountMap['authCode'] = infoArr[3]
      // console.log('editAccountMap:' + JSON.stringify(accountMap));

      let url = 'act/api/v1/web/updateUserAccount'
      this.$g_loadingShow('数据加载中')

      this.postRequest(url, accountMap)
        .then((response) => {
          this.$g_loadingHide()
          let responseData = response.data
          if (responseData) {
            let status = responseData.status
            if (status.code === 200) {
              //保存成功
              this.onCancel()
            } else {
              this.$g_toast(status.detail)
            }
          } else {
            this.$g_toast('网络异常，请重试！')
          }
        })
        .catch((err) => {
          this.$g_loadingHide()
        })
    },
  },
  components: {
    RulePopout,
    myProcess,
    AwardInfoPopout,
    AwardInfoEditPopout,
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
  background: #14aeab;
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
  color: #004f63;
  text-align: right;
  font-size: 12px;
  transform: scale(0.8);
}

.schedule-item_circle {
  width: 10px;
  height: 10px;
  background: #cbeaee;
  border-radius: 5px;
  margin-left: 4px;
}

.schedule-item_line2 {
  position: absolute;
  width: 2px;
  height: 34px;
  background: rgb(203, 234, 238);
  margin-left: 64px;
  margin-top: -46px;
}

.schedule-item_line3 {
  position: absolute;
  width: 2px;
  height: 34px;
  background: rgb(203, 234, 238);
  margin-left: 64px;
  margin-top: 46px;
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
  color: #feff00;
  overflow: hidden;
  white-space: nowrap;
  /*transform: scale(0.6)*/
}

.confirm_reward_achieve {
  width: 88px;
  height: 23px;
  background: linear-gradient(180deg, #fdd45e 0%, #fdd45e 38%, #fec84f 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
}

.confirm_reward_achieve p {
  font-size: 9px;
  font-family: PingFangSC-Medium, PingFang SC;
  /*font-weight: 500;*/
  color: #ab5700;
  overflow: hidden;
  margin: 0 auto;
}

.task-date {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  /*font-weight: 500;*/
  color: #004f63;
  overflow: hidden;
  white-space: nowrap;
  /*transform: scale(0.8)*/
}

.task-date-detail {
  color: #fe750a;
}

.task-button {
  background-color: #c4e7eb;
  width: 60%;
  font-size: 10px;
  color: #14aeab;
  /*transform: scale(0.6)*/
}

.task-button img {
  width: 10px;
}

.rightImage {
  width: 50px;
  height: 30px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;
  background-position-y: center;
  position: absolute;
  right: 0px;
}

.rightImage img {
  width: 100%;
}

.rightImage p {
  /*bottom: 0px;*/
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  /*font-weight: 500;*/
  color: #004f63;
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
  margin-left: 10px;
}
</style>
