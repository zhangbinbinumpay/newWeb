<template>
  <div class="hello_guide">
    <div class="main-content">
      <div :class="[content_image,activeButtonState?content_image_background:content_disable_image_background]"
           @click="activeButtonState?confimActive:''">
        <p>
          开启新任务
        </p></div>
      <p class="task-date">任务需在<span class="task-date-detail">{{ taskDate }}</span>之间开启哦</p>
      <button class="task-button" @click="onClickRule"><img style="width: 10px"
                                                            src="../assets/images/question-circle-fill@2x.png">活动规则
      </button>
    </div>
    <RulePopout v-show="isPrpout" v-on:cancel="onCancel"/>
    <NoMatchPopout v-show="isActviveNoMatch" v-on:cancel="onCancel"></NoMatchPopout>
    <SecondConfirmPopout v-show="isSecondConfirmViewShow" v-on:cancel="onCancel"
                         v-on:click="secondConfirmActive"></SecondConfirmPopout>
  </div>
</template>

<script>
    import RulePopout from "./comment/RulePopout";
    import NoMatchPopout from "./comment/NoMatchPopout";
    import SecondConfirmPopout from "./comment/SecondConfirmPopout";
    import util from '../util'

    export default {
        name: 'guide',
        data() {
            return {
                userData: {},
                taskDate: '2021年6月1日至2021年7月1日',
                isPrpout: false,
                isActviveNoMatch: false,
                activeButtonState: true,/*活动禁用开关*/
                content_image: 'content-image',
                content_image_background: 'content-image-background',
                content_disable_image_background: 'content-disable-image-background',
                isSecondConfirmViewShow: false/*开启二次确认*/
            }
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
            this.getActOpenStatus();
        },
        methods: {
            getActOpenStatus() {
                console.log('userData:' + JSON.stringify(this.userData));
                this.$g_loadingShow('数据加载中');
                let url = "/act/api/v1/web/getActOpenStatus";
                this.getRequest(url, this.userData).then(res => {
                    // console.log(res.data.data);
                    this.$g_loadingHide();
                    let responseData = res.data.data;
                    let openStatus = responseData.openStatus;
                    //0 未开启 1 已开启 2 未绑定活动
                    if (openStatus === 0) {
                        this.activeButtonState = false;

                    } else if (openStatus === 1) {
                        this.activeButtonState = false;

                    } else if (openStatus === 2) {
                        this.activeButtonState = false;

                    }
                }).catch(err => {
                    this.$g_loadingHide();
                    this.activeButtonState = false;
                });
            },
            goContent(cid, e) {
                // this.$router.push({path: `/content/detail/${cid}`});
            },
            // 点击显示弹框
            onClickRule() {
                this.isPrpout = true
            },
            // 点击取消隐藏
            onCancel() {
                this.isPrpout = false;
                this.isActviveNoMatch = false;
                this.isSecondConfirmViewShow = false;
            },
            //开启活动
            confimActive() {
                this.isSecondConfirmViewShow = true;
            },
            //二次确认活动开启
            secondConfirmActive() {
                //成功后再关闭视图
                let url = "act/api/v1/web/OpenActStatus";
                this.$g_loadingShow('数据加载中');
                this.getRequest(url, this.userData).then(res => {
                    this.$g_loadingHide();
                    let responseData = res.data.data;
                    let openStatus = responseData.openStatus;
                    //0 未开启 1 已开启 2 未绑定活动
                    if (openStatus === 0) {
                        this.activeButtonState = false;
                        this.$g_toast("活动开启失败！");
                    } else if (openStatus === 1) {
                        //活动开启成功
                        this.isSecondConfirmViewShow = true;
                        this.activeButtonState = true;
                    } else if (openStatus === 2) {
                        this.activeButtonState = false;
                        this.$g_toast("活动开启失败！");
                    }
                }).catch(err => {
                    this.$g_loadingHide();
                });
            }

        },
        components: {
            RulePopout,
            NoMatchPopout,
            SecondConfirmPopout
        },
    }
</script>

<style scoped>
  .hello_guide {
    background-image: url("../assets/images/yemian1.png");
    background-repeat: no-repeat;
    min-height: 780px;
    overflow: scroll;
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    /*background-size: contain;*/
    background-size: auto 100%;
    background-position-x: center;
    background-position-y: center;
  }

  .main-content {
    position: absolute;
    margin-top: 29rem;
    height: 68px;
    width: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .content-image {
    width: 100%;
    height: 30px;
    margin-top: 5px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position-x: center;
    background-position-y: center;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .content-image-background {
    background-image: url("../assets/images/button.png");
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    /*font-weight: 500;*/
    color: #AB5700;
    line-height: 46px;
  }

  .content-disable-image-background {
    background-image: url("../assets/images/button_disable@2x.png");
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    /*font-weight: 500;*/
    color: #8C8C8C;
    line-height: 46px;
  }

  .content-image p {
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    /*font-weight: 500;*/
    /*color: #AB5700;*/
    line-height: 46px;
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
</style>
