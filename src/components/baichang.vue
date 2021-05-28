<template>
    <div>
        <!--    三重礼-->
        <div class="model1 flex-col">
            <div v-if="useIsLogin" class="main6 flex-col">
          <span class="word24">
            恭喜!&nbsp;138****8371的用户获得一张20元的京东卡
          </span>
            </div>
            <div v-if="useIsLogin" class="box1 flex-col">
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
                                :class="['section2','flex-col',{marginTop_20 : (parseInt((index/3)) > 0)},{marginLeft_10 : ((index) % 3 > 0)}]">
                            <span class="info1">{{ item.zoneName }}</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="group3 flex-col">
            <div v-if="useIsLogin" class="block1 flex-col">
                <span class="word1">精英排行榜</span>
            </div>
            <!--      精英排行榜-->
            <div v-if="useIsLogin" class="section3 flex-col">
                <!--精英排行榜-->
                <div class="block3 flex-row">
                    <div class="mod2 flex-row">
                        <div class="word11">名次</div>
                        <div class="word11">奖品</div>
                        <div class="word11 flex-row">
                            <span>过筛简历数</span>
                            <img
                                    class="icon1"
                                    referrerpolicy="no-referrer"
                                    src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPnge10882e8c09f0834e5dd28f89738505b0fe84ed75ab6d59f46fd630b752ac218"
                            />
                        </div>
                        <div class="word11">用户名</div>
                    </div>
                </div>
                <div class="rankList">
                    <div v-for="(item, index) in rankList">
                        <div class="rankListTable flex-row">
                            <span class="info9">{{ index + 1 + '' }}</span>
                            <span class="word12">{{ rewardInfos[index] }}</span>
                            <span class="word12">{{ item.accomplishCount }}</span>
                            <span class="word12">{{ item.userMobile }}</span>
                        </div>
                    </div>
                </div>
                <div class="rankTips">
                    <span class="word23">你的当前排名为{{ rank }} </span>
                    <span class="txt11">
              {{ rankMsg }}
            </span>
                </div>
            </div>
            <!--      规则视图-->
            <div class="rule">
                <span class="info18">活动规则:</span>
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
              3.京东卡为电子卡，活动结束后7个工作日内发放至个人在禾蛙注册时填写的邮箱中；
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
        </div>
    </div>
</template>

<script>
    import util from "../util";

    export default {
        name: 'baichang',
        data() {
            return {
                useIsLogin: false,
                zoneList: [],
                rankList: [],
                rewardInfos: ['Apple iPad 128G WLAN版', '戴森V8 手持无线吸尘器', 'Kindle 经典版四代 32G', '飞利浦咖啡机', '禾蛙定制礼品8件套+200元京东卡'],
                rank: '',
                bonus: '',
                rankMsg: '',
                latestBonus: []
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
            this.home();
        },
        methods: {
            home() {
                // console.log('userData1:' + JSON.stringify(this.userData));
                this.$g_loadingShow('数据加载中');
                let url = "act/api/v1/web/info100";
                this.getRequest(url, this.userData).then(res => {
                    this.$g_loadingHide();
                    let bodyData = res.data;
                    if (bodyData) {
                        this.useIsLogin = true;
                        let responseData = bodyData.data;
                        this.latestBonus = responseData.latestBonus;
                        this.rankList = responseData.rankList;
                        this.rank = responseData.rank;
                        this.bonus = responseData.bonus;
                        this.rankMsg = responseData.rankMsg;
                    }
                }).catch(err => {
                    console.log('err:' + err);
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
                    console.log('err:' + err);
                    this.$g_loadingHide();
                });
            },
        }
    };
</script>
<style src="../assets/css/common.css"/>
<style>
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
        align-items: center
    }

    .main6 {
        z-index: 147;
        height: 2.71vw;
        border-radius: 26px;
        background-color: rgba(7, 55, 221, 1);
        width: 47.97vw;
        justify-content: center;
        align-items: center;
        margin-top: 36.2%;
        margin-left: 20px;
    }

    .word24 {
        z-index: 149;
        width: 18.08vw;
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
        border-radius: 22px;
        background-color: rgba(255, 234, 19, 1);
        width: 19.9vw;
        justify-content: center;
        align-items: flex-end;
        /*padding-right: 1.72vw;*/
        margin-left: 26px;
        margin-top: 8px;
    }

    .word25 {
        z-index: 148;
        width: 16.05vw;
        display: block;
        overflow-wrap: break-word;
        color: rgba(43, 43, 43, 1);
        font-size: 0.72vw;
        line-height: 1.05vw;
        text-align: left;
    }

    .group2 {
        z-index: 40;
        /*height: 54.48vw;*/
        background-color: rgba(75, 85, 184, 0.46);
        align-self: center;
        /*width: 100vw;*/
        position: relative;
        /*padding: 42px 381px 0 0;*/
    }

    .group3 {
        z-index: 40;
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
        /*height: 100px;*/
        width: 90%;
        margin-top: 1.16vw;
        padding-top: 1.16vw;
        padding-bottom: 1.16vw;
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
    }

    .section3 {
        justify-content: center;
        align-items: center;
        width: 60%;
        background-color: #0F23B4;
        margin-top: 20px;
    }

    .info1 {
        z-index: 83;
        /*width: 6.25vw;*/
        display: block;
        overflow-wrap: break-word;
        color: rgba(51, 51, 51, 1);
        font-size: 2.08vw;
        font-family: PingFangSC-Semibold;
        line-height: 2.92vw;
        /*text-align: center;*/
    }

    .word1 {
        z-index: 104;
        display: block;
        overflow-wrap: break-word;
        color: rgba(255, 255, 255, 1);
        font-size: 1.25vw;
        line-height: 1.72vw;
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
        /*width: 2.71vw;*/
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
        height: 5.50vh;
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
        font-size: 2.6vw;
        font-family: JCHEadA;
        line-height: 2.61vw;
    }

    .word12 {
        z-index: 114;
        width: 4.07vw;
        display: block;
        overflow-wrap: break-word;
        color: rgba(255, 255, 255, 1);
        font-size: 1.35vw;
        font-family: PingFangSC-Medium;
        line-height: 1.93vw;
        text-align: center;
        /*margin-left: 7.4vw;*/
        flex: 1;
        justify-content: center
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
        padding-left: 2.04vw;
    }

    .word23 {
        z-index: 131;
        /*width: 10.06vw;*/
        display: block;
        /*overflow-wrap: ;*/
        color: rgba(16, 21, 68, 1);
        font-size: 1.25vw;
        line-height: 1.72vw;
        text-align: left;
        /*margin-top: -10px;*/
        transform: scale(0.8);
        white-space: nowrap;
    }

    .txt11 {
        z-index: 132;
        /*width: 35.32vw;*/
        /*display: block;*/
        overflow-wrap: break-word;
        color: rgba(16, 21, 68, 1);
        font-size: 0.83vw;
        /*line-height: 1.15vw;*/
        text-align: left;
        /*margin-top: 0.42vw;*/
        white-space: nowrap;
        /*transform: scale(0.8);*/
    }

    .rule {
        z-index: 64;
        height: 5.05vw;
        /*justify-content: center;*/
        align-items: center;
        background-image: url("../assets/images/guize.png");
        background-repeat: no-repeat;
        background-size: contain;
        width: 74%;
        display: flex;
        margin-top: 2.15rem;
        margin-bottom: 2.16rem;
        flex-direction: row;
        padding-right: 2.04vw;
        padding-left: 2.04vw;
    }

    .info18 {
        z-index: 45;
        /*width: 8.03vw;*/
        display: block;
        overflow-wrap: break-word;
        color: rgba(11, 28, 141, 1);
        font-size: 1.87vw;
        font-family: PingFangSC-Semibold;
        line-height: 2.61vw;
        text-align: left;
    }

    .section4 {
        justify-content: center;
        align-items: center;
        width: 60%;
        background-color: #2B36A3;
        margin-top: 20px;
        display: flex;
        margin-bottom: 30px;
    }

    .ruleInfo {
        /*height: 100px;*/
        width: 90%;
        margin-top: 2.16vw;
        margin-bottom: 2.16vw;
    }

    .ruleInfoLeft {
        font-size: 1.04vw;
        font-family: Menlo-Regular;
        color: rgba(255, 255, 255, 1);
        /*line-height: 2.92vw;*/
    }

    .ruleInfoDetail {
        font-size: 1.04vw;
        color: rgba(255, 255, 255, 1);
        line-height: 1.52vw;
        /*background-color: orangered;*/
    }
</style>
