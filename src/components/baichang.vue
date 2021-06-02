<template>
  <div style="background-color: #0B1C8D;">
    <div v-if="isH5Page">
      <div class="model1h5 flex-col">
        <div class="main6-h5" @click="openHomeUrl">
        </div>
      </div>

    </div>
    <div v-else>
      <!--    三重礼-->
      <div class="model1 flex-col">
        <div v-if="latestBonus.length" class="main6 flex-col">
          <!-- 无缝滚动效果 -->
          <div class="marquee-wrap">
            <ul class="marquee-list" :class="{'animate-up': animateUp}">
              <li v-for="(item, index) in latestBonus" :key="index">{{ item }}</li>
            </ul>
          </div>

        </div>
        <div v-if="bonus" class="box1 flex-col">
          <span class="word25">
            {{ bonus }}
          </span>
        </div>
      </div>
      <div class="group2 flex-col">
        <div class="section1 flex-col">
          <div class="block1 flex-col">
            <span class="word1">一份简历·百家名企·快速推荐</span>
          </div>
          <!--岗位介绍-->
          <div class="block2 flex-row">
            <div v-for="(item, index) in zoneList" :key="index">
              <div
                  :class="['section2','flex-col',{marginTop_20 : (parseInt((index/3)) > 0)},{marginLeft_10 : ((index) % 3 > 0)}]"
                  @click="gangweiClick(item.hyperlink)">
                <span class="info1">{{ item.zoneName }}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="group3 flex-col">
        <div v-if="useIsLogin" class="block1 flex-col">
          <span class="word1">精英排行榜</span>
        </div>
        <img class="xingqiu" src="../assets/images/xingqiu@2x.png"/>

        <!--      精英排行榜-->
        <div v-if="useIsLogin" class="section3 flex-col">
          <!--精英排行榜-->
          <div class="block3 flex-row">
            <div class="mod2 flex-row">
              <div class="word11">名次</div>
              <div class="word11">奖品</div>
              <div class="word11 flex-row">
                <span>过筛简历数</span>
                <el-tooltip popper-class="word11_item" effect="dark" content="同一份简历通过多次初筛只被计作一次" placement="bottom">
                  <el-button type="text" plain
                             style="margin:auto 0px auto 10px;"
                             size="small"></el-button>
                  <img
                      class="icon1"
                      referrerpolicy="no-referrer"
                      src="../assets/images/guoshai@2x.png"
                  />
                </el-tooltip>

              </div>
              <div class="word11">用户名</div>
            </div>
          </div>
          <div class="rankList">
            <div class="rankListTable flex-row" v-for="(item, index) in rewardInfos">
              <span class="info9">{{ index + 1 + '' }}</span>
              <span class="word12 size_8">{{ item.name }}</span>
              <span class="word12">{{ item.accomplishCount }}</span>
              <span class="word12">{{ item.userMobile }}</span>
            </div>
          </div>
          <div v-if="rankMsg" class="rankTips">
            <span v-if="rank" class="word23">你的当前排名为{{ rank }} </span>
            <span class="txt11">
              {{ rankMsg }}
            </span>
          </div>
        </div>

      </div>
    </div>
    <!--      规则视图-->
    <div class="rule">
      <img src="../assets/images/guize.png" object-fit="none"/>
      <p>活动规则:</p>
    </div>
    <!--规则明细-->
    <div class="section4">
      <div class="ruleInfo flex-col">
          <span class="ruleInfoDetail">
              1.本活动只限“百厂联动”各职位专区内的职位参与；
              <br/>
              <br/>
            </span>
        <span class="ruleInfoDetail">
              2.简历过筛以候选人为单位计算数量，不以推荐次数计算数量，即每个候选人简历仅计算一次过筛；
              <br/>
              <br/>
            </span>

        <span class="ruleInfoDetail">
              3.京东卡为电子卡，活动结束后10个工作日内发放至个人在禾蛙注册时填写的邮箱中；
              <br/>
              <br/>
            </span>
        <span class="ruleInfoDetail">
              4.排行榜部分实物礼品在活动结束后10个工作日内由第三方电商平台发出；
              <br/>
              <br/>
            </span>
        <span class="ruleInfoDetail">
              5.活动中奖励的职位分成将在职位佣金全部回款成功后发放；
              <br/>
              <br/>
            </span>
        <span class="ruleInfoDetail">
              6.活动期间如遇禾蛙平台调整接单方佣金分成比例，本活动跟随平台调整；
              <br/>
              <br/>
            </span>
        <span class="ruleInfoDetail">
              7.用户推荐的简历必须真实有效，一经发现盲推、虚假简历、重复推荐等舞弊违规行为，禾蛙平台有权取消违规者参与活动资格且奖励不予发放；
              <br/>
              <br/>
            </span>
        <span class="ruleInfoDetail">
              8.本活动不与其它活动同享，如正在参与平台新用户活动的用户不可参与本活动，如有问题请咨询禾蛙工作人员；&nbsp;
              <br/>
              <br/>
            </span>
        <span class="ruleInfoDetail">9.此活动解释权在法律范围内归禾蛙平台所有。</span>
      </div>
    </div>

    <AletPopout style="z-index: 155;" v-show="isPrpout" v-on:cancel="onCancel"/>

  </div>
</template>

<script>
import util from "../util";
import AletPopout from "./comment/AletPopout";

export default {
  name: 'baichang',
  data() {
    return {
      isH5Page: true,
      useIsLogin: false,
      zoneList: [],
      rankList: [],
      rewardInfos: [
        {name: 'Apple iPad 128G WLAN版', accomplishCount: '', userMobile: '虚位以待'},
        {name: '戴森V8 手持无线吸尘器', accomplishCount: '', userMobile: '虚位以待'},
        {name: 'Kindle 经典版四代 32G', accomplishCount: '', userMobile: '虚位以待'},
        {name: '飞利浦咖啡机', accomplishCount: '', userMobile: '虚位以待'},
        {name: '禾蛙定制礼品8件套+200元京东卡', accomplishCount: '', userMobile: '虚位以待'}
      ],
      rank: '',
      bonus: '',
      rankMsg: '',
      latestBonus: [],
      timer: null,
      animateUp: false,
      isPrpout: false
    };
  },
  mounted() {
    let token = util.getUrlParam("token");
    let act_id = util.getUrlParam("act_id");
    let user_id = util.getUrlParam("user_id");
    this.userData = {
      token: token,
      act_id: act_id,
      user_id: user_id
    };
    if (!this.userData.user_id) {
      this.userData = this.$route.params;
    }
    //进行数据转换 userId user_id
    if (!this.userData.user_id) {
      this.userData = this.$route.query;
    }

    // if(trankList){
    //   let ranks = trankList;
    //   for (let i = 0; i < ranks.length; i++) {
    //     let rankItem = ranks[i];
    //     let orignMap = this.rewardInfos[i];
    //     orignMap['userMobile'] = rankItem.userMobile;
    //     orignMap['accomplishCount'] = rankItem.accomplishCount;
    //   }
    // }
    this.home();
    //开启定时
    this.timer = setInterval(this.scrollAnimate, 3000);
  },
  methods: {
    home() {
      // console.log('userData1:' + JSON.stringify(this.userData));
      this.$g_loadingShow('数据加载中');
      let url = "act/api/v1/web/info100";
      let that = this;
      this.getRequest(url, this.userData).then(res => {
        this.$g_loadingHide();
        let bodyData = res.data;
        if (bodyData) {
          if (bodyData.status) {
            this.useIsLogin = bodyData.status.code === 200;
          }

          let responseData = bodyData.data;
          if (responseData.latestBonus) {
            //顶部轮播图
            for (let i = 0; i < responseData.latestBonus.length; i++) {
              let phone = responseData.latestBonus[i];
              that.latestBonus.push('恭喜!' + phone.userMobile + '的用户获一张20元的京东卡');
            }
          }

          if (responseData.rankList) {
            let ranks = responseData.rankList;
            for (let i = 0; i < ranks.length; i++) {
              let rankItem = ranks[i];
              let orignMap = this.rewardInfos[i];
              orignMap['userMobile'] = rankItem.userMobile;
              orignMap['accomplishCount'] = rankItem.accomplishCount;
            }
            that.rankList = responseData.rankList;
          }

          that.rank = responseData.rank;
          that.bonus = responseData.bonus;
          that.rankMsg = responseData.rankMsg;
          //已经参加了新手活动直接提示
          that.isPrpout = (responseData.takeNewUser === 1);
          // that.isPrpout = true;
        }
      }).catch(err => {
        // console.log('err:' + err);
        this.$g_loadingHide();
      });

      let jobZoneUrl = "act/api/v1/web/jobZone";
      this.userData['zone_type'] = '5';
      this.getRequest(jobZoneUrl, this.userData).then(res => {
        this.$g_loadingHide();
        let bodyData = res.data;
        if (bodyData) {
          let responseData = bodyData.data;
          this.zoneList = responseData
        } else {

        }

      }).catch(err => {
        // console.log('err:' + err);
        this.$g_loadingHide();
      });
    },

    gangweiClick(url) {
      // console.log('岗位地址：' + url);
      window.open(url, '_blank') // 在新窗口打开外链接
      // window.location.href =this.indexro;  //在本页面打开外部链接
    },
    scrollAnimate() {
      this.animateUp = true
      setTimeout(() => {
        this.latestBonus.push(this.latestBonus[0])
        this.latestBonus.shift()
        this.animateUp = false
      }, 500)
    },
    onCancel() {
      this.isPrpout = false;
    },
    openHomeUrl(){
      window.open('hewa.cn', '_blank') // 在新窗口打开外链接

    }
  },
  destroyed() {
    clearInterval(this.timer)
  },
  components: {
    AletPopout,
  },
};
</script>
<style src="../assets/css/common.css"/>

<style lang="scss" scoped>
.model1 {
  background-image: url("../assets/images/baichang_model1.png");
  background-repeat: no-repeat;
  overflow: auto;
  display: flex;
  justify-content: center;
  background-size: 100% auto;
  background-position-x: center;
  background-position-y: center;
  z-index: 4;
  height: 45.84vw;
  background-color: rgba(11, 28, 141, 1);
  width: 100vw;
  left: 0;
  top: 0;
  align-items: center;
  position: relative;
}

.model1h5 {
  background-image: url("../assets/images/baichang_h5.png");
  background-repeat: no-repeat;
  overflow: auto;
  display: flex;
  justify-content: center;
  background-size: 100% auto;
  background-position-x: center;
  background-position-y: center;
  z-index: 4;
  height: 45.84vw;
  background-color: rgba(11, 28, 141, 1);
  width: 100vw;
  left: 0;
  top: 0;
  align-items: center;
  position: relative;
}

.main6-h5 {
  //z-index: 147;
  border-radius: 26px;
  //background-color: rgba(7, 55, 221, 1);
  width: 559px;
  height: 117px;
  margin-top: 232px;
  margin-left: 20px;
  cursor: pointer;
}

.main6 {
  z-index: 147;
  height: 2.71vw;
  border-radius: 26px;
  background-color: rgba(7, 55, 221, 1);
  width: 47.97vw;
  margin-top: 259px;
  margin-left: 20px;
}

.word24 {
  z-index: 149;
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 0.83vw;
  line-height: 1.15vw;
  text-align: left;
}

.box1 {
  z-index: 145;
  height: 2.3vw;
  position: absolute;
  border-radius: 22px;
  background-color: rgba(255, 234, 19, 1);
  width: 249px;
  justify-content: center;
  align-items: flex-end;
  /*padding-right: 1.72vw;*/
  margin-left: 26px;
  margin-top: 313px;
  top: 2px;
  left: 220px;
}

.word25 {
  //z-index: 148;
  width: 100%;
  display: block;
  overflow-wrap: break-word;
  color: rgba(43, 43, 43, 1);
  font-size: 0.72vw;
  line-height: 1.05vw;
  text-align: center;
}

.group2 {
  //z-index: 40;
  /*height: 54.48vw;*/
  background-color: rgba(75, 85, 184, 0.46);
  align-self: center;
  /*width: 100vw;*/
  position: relative;
  /*padding: 42px 381px 0 0;*/
}

.group3 {
  //z-index: 40;
  /*height: 54.48vw;*/
  background-color: #0B1C8D;
  align-self: center;
  /*width: 100vw;*/
  position: relative;
  /*padding: 42px 381px 0 0;*/
  align-items: center
}

.block1 {
  z-index: 125;
  height: 5.32vw;
  border-radius: 35px;
  border: 2px solid rgba(51, 51, 51, 1);
  background-color: rgba(98, 165, 255, 1);
  align-self: center;
  /*margin-left: 9.48vw;*/
  width: 36.31vw;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.block2 {
  z-index: auto;
  width: 58.18vw;
  /*height: 6.31vw;*/
  margin-top: 3.16vw;
  flex-wrap: wrap;
  margin-bottom: 3.15vw;
}

.block3 {
  z-index: auto;
  /*width: 58.18vw;*/
  /*height: 6.31vw;*/
  width: 90%;
  margin-top: 1.16vw;
  flex-wrap: wrap;
  border-radius: 8px;

}

.rankList {
  background-color: #6D5EFC;
  height: 185px;
  width: 420px;
  margin-top: 1.16vw;
  padding-top: 1.16vw;
  padding-bottom: 1.16vw;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.xingqiu {
  position: absolute;
  width: 65px;
  height: 82px;
  left: 68px;
  top: 98px;
}

.section1 {
  justify-content: center;
  align-items: center;
  background-color: #4B55B8;
}

.section2 {
  z-index: 64;
  height: 6.05vw;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/images/gangweiback.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 16.5vw;
  display: flex;
  cursor: pointer;
}

.section3 {
  justify-content: center;
  align-items: center;
  width: 469px;
  background-color: #0F23B4;
  margin-top: 20px;
}

.info1 {
  z-index: 83;
  display: block;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333333;
  line-height: 22px;

}

.word1 {
  z-index: 104;
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 9px;
}

.marginLeft_10 {
  margin-left: 10px;
}

.marginTop_20 {
  margin-top: 20px;
}

.mod2 {
  z-index: auto;
  /*width: 46.88vw;*/
  height: 1.93vw;
  width: 100%;
}

.word11 {
  z-index: 112;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 1.35vw;
  font-family: PingFangSC-Medium;
  line-height: 1.93vw;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center
}

.txt8 {
  z-index: 113;
  /*width: 2.71vw;*/
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 1.35vw;
  font-family: PingFangSC-Medium;
  line-height: 1.93vw;
  text-align: left;
  margin-left: 9.38vw;
}

.bd7 {
  z-index: 117;
  height: 1.88vw;
  background-color: rgba(0, 0, 0, 0);
  width: 1.88vw;
  justify-content: center;
  align-items: center;
  /*margin: 1px 0 0 360px;*/
}

.icon1 {
  z-index: 118;
  width: 1.62vw;
  height: 1.62vw;
}

.rankListTable {
  width: 100%;
  justify-content: center;
  flex: 1;
  /*height: 4.50vh;*/
}

.info9 {
  z-index: 97;
  /*width: 1.31vw;*/
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  flex: 1;
  justify-content: center;
  width: 1.1vw;
  font-size: 20px;
  font-family: JCHEadA;
  font-size: 20px;
  color: #FFFFFF;
  line-height: 20px;
  font-family: "微软雅黑";
  font-weight: bold;

}

.word12 {
  z-index: 114;
  /*width: 4.07vw;*/
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  /*font-size: 9px;*/
  text-align: center;
  /*margin-left: 7.4vw;*/
  flex: 1;
  justify-content: center;
  font-size: 9px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 13px;
}

size_8 {
  font-size: 8px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 11px;
}

.rankTips {
  z-index: 64;
  height: 5.05vw;
  /*justify-content: center;*/
  align-items: center;
  background-image: url("../assets/images/rankTips@2x.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 80%;
  display: flex;
  margin-top: 2.15rem;
  margin-bottom: 2.16rem;
  flex-direction: row;
  padding-right: 2.04vw;
  /*padding-left: 18px;*/
}

.word23 {
  z-index: 131;
  display: block;
  text-align: left;
  white-space: nowrap;
  font-size: 9px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #101544;
  line-height: 13px;
  margin-left: 18px;
}

.txt11 {
  z-index: 132;
  overflow-wrap: break-word;
  color: rgba(16, 21, 68, 1);
  text-align: left;
  white-space: nowrap;
  font-size: 6px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #101544;
  line-height: 9px;
  margin-left: 7px;
}

.rule {
  z-index: 64;
  align-items: center;
  width: 100%;
  height: 88px;
  background-color: #0B1C8D;
  display: flex;
  flex-direction: row;
  margin-top: 60px;
}

.rule img {
  height: 56px;
  left: 57px;
  margin-left: 57px;
}

.rule p {
  z-index: 45;
  font-size: 20px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #0B1C8D;
  line-height: 28px;
  margin-left: -112px;
  height: 28px;
}

.section4 {
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #0B1C8D;
  display: flex;
  margin-bottom: 30px;
}

.ruleInfo {
  background-color: #2B36A3;
  width: 90%;
  margin-top: 23px;
  margin-bottom: 22px;
  border-radius: 5px;
  opacity: 0.71;
  padding: 63px 25px 25px 20px;
}

.ruleInfoLeft {
  font-size: 1.04vw;
  font-family: Menlo-Regular;
  color: rgba(255, 255, 255, 1);
  /*line-height: 2.92vw;*/
}

.ruleInfoDetail {
  font-size: 8px;
  font-family: Menlo-Regular, Menlo;
  color: #FFFFFF;
}

.marquee-wrap {
  width: 80%;
  //height: 40px;
  border-radius: 20px;
  background-color: rgba(7, 55, 221, 1);
  margin: 0 auto;
  overflow: hidden;

  .marquee-list {

    li {
      width: 100%;
      height: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding: 0 20px;
      list-style: none;
      line-height: 20px;
      text-align: center;
      color: #fff;
      font-size: 12px;
      font-weight: 400;
    }
  }

  .animate-up {
    transition: all 0.5s ease-in-out;
    transform: translateY(-40px);
  }

}

</style>
