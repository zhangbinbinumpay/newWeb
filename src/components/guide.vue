<template>
  <div class="hello_guide">
    <div class="main-content">
      <div class="content-image">
        <p>
          开启新任务
        </p></div>
      <p class="task-date">任务需在<span class="task-date-detail">{{taskDate}}</span>之间开启哦</p>
      <button class="task-button" @click="onClickRule"><img style="width: 10px" src="../assets/images/question-circle-fill@2x.png">活动规则
      </button>
    </div>
    <RulePopout v-show="isPrpout" v-on:confirm="onConfirm" v-on:cancel="onCancel"/>
  </div>
</template>

<script>
    import RulePopout from "./comment/RulePopout";

    export default {
        name: 'Guide',
        data() {
            return {
                contents: {},
                recommends: {},
                taskDate: '2021年6月1日至2021年7月1日',
                isPrpout: false
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
            onClickRule () {
                this.isPrpout = true
            },
            // 点击确定隐藏
            onConfirm (val) {
                console.log(val)
                this.isPrpout = false
            },

            // 点击取消隐藏
            onCancel () {
                this.isPrpout = false
            }
        },
        components: {
            RulePopout
        },
    }
</script>

<style scoped>
  .hello_guide {
    background-image: url("../assets/images/yemian1.png");
    background-position-x: center;
    background-position-y: center;
    background-size: contain;
    background-repeat: no-repeat;
    min-height: 780px;
    overflow: scroll;
    position: relative
  }

  .main-content {
    position: absolute;
    /*background-color: red;*/
    margin-top: 78%;
    height: 68px;
    /*z-index: 100;*/
    width: 180px;
    margin-left: 26%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .content-image {
    background-image: url("../assets/images/button.png");
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

  .content-image p {
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    /*font-weight: 500;*/
    color: #AB5700;
    line-height: 46px;
  }

  .task-date {
    font-size: 8px;
    font-family: PingFangSC-Medium, PingFang SC;
    /*font-weight: 500;*/
    color: #004F63;
    /*line-height: 42px;*/
  }

  .task-date-detail {
    color: #FE750A;
  }

  .task-button {
    background-color: #CBEAEE;
    width: 60%;
    font-size: 8px;
    color: #14AEAB;
  }
</style>
