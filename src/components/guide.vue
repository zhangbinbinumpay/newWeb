<template>
  <div class="hello_guide">
    <div class="main-content">
      <div :class="[content_image,activeButtonState?content_image_background:content_disable_image_background]"
           @click="confimActive">
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
  </div>
</template>

<script>
    import RulePopout from "./comment/RulePopout";
    import NoMatchPopout from "./comment/NoMatchPopout";

    export default {
        name: 'Guide',
        data() {
            return {
                contents: {},
                recommends: {},
                taskDate: '2021年6月1日至2021年7月1日',
                isPrpout: false,
                isActviveNoMatch: false,
                activeButtonState: true,/*活动禁用开关*/
                content_image: 'content-image',
                content_image_background: 'content-image-background',
                content_disable_image_background: 'content-disable-image-background',
                confirmAactiveSuccess: false

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
                this.isPrpout = false;
                this.isActviveNoMatch = false;
            },
            //开启活动
            confimActive() {
                //TODO
                // this.confirmAactiveSuccess = true;
                // this.$router.push({path: `/confirm`});
                this.isActviveNoMatch = true;
            },


        },
        components: {
            RulePopout,
            NoMatchPopout
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
    background-size: 100% 100%;
    /*background-position-x: center;*/
    /*background-position-y: center;*/
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
