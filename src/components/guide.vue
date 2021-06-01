<template>
  <div class="hello_guide">
    <img
      style="max-width: 100%;max-height: 100%;width:100%;height:100%"
      src="../assets/images/yemian1.png"
    />

    <div class="main-content">
      <div
        :class="[
          content_image,
          activeButtonState
            ? content_image_background
            : content_disable_image_background,
        ]"
        @click="confirmActive"
      >
        <p style="cursor: pointer;">
          开启新任务
        </p>
      </div>
      <p class="task-date">
        任务需在<span class="task-date-detail">{{ taskDate }}</span
        >之间开启哦
      </p>
      <button class="task-button" @click="onClickRule">
        <img src="../assets/images/question-circle-fill@2x.png" /><span
          >活动规则</span
        >
      </button>
    </div>
    <RulePopout v-show="isPrpout" v-on:cancel="onCancel" />
    <NoMatchPopout
      v-show="isActviveNoMatch"
      v-on:cancel="onCancel"
    ></NoMatchPopout>
    <SecondConfirmPopout
      v-show="isSecondConfirmViewShow"
      v-on:cancel="onCancel"
      v-on:click="secondConfirmActive"
    ></SecondConfirmPopout>
  </div>
</template>

<script>
import RulePopout from './comment/RulePopout'
import NoMatchPopout from './comment/NoMatchPopout'
import SecondConfirmPopout from './comment/SecondConfirmPopout'
import util from '../util'

export default {
  name: 'guide',
  props: {
    /*活动是否开启开关*/
    activeButtonState: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      imagUrl: '',
      userData: {},
      taskDate: '2021年6月1日至2021年9月30日',
      isPrpout: false,
      isActviveNoMatch: false,
      content_image: 'content-image',
      content_image_background: 'content-image-background',
      content_disable_image_background: 'content-disable-image-background',
      isSecondConfirmViewShow: false /*开启二次确认*/,
      isUserDataValid:true,
      // main_content:{
      //   marginTop:'288px'
      // }
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
    // this.main_content.marginTop = 1500 * window.innerWidth / 1920 + 'px';
    // console.log('this.main_content:' + JSON.stringify(this.main_content));
      if (!this.userData.user_id || !this.userData.token || !this.userData.act_id) {
          this.isUserDataValid = false;
          this.$g_toast('小蛙发现你暂不具备活动资格哦~');
      }
      if (this.$route.params && this.$route.params.openStatus){
          this.isUserDataValid = this.$route.params.openStatus !== '2';
      }
  },
  // created() {
  //
  // },
  methods: {
    goContent(cid, e) {
      // this.$router.push({path: `/content/detail/${cid}`});
    },
    // 点击显示弹框
    onClickRule() {
      this.isPrpout = true
      // this.isActviveNoMatch = true;
      // this.isSecondConfirmViewShow = true;
    },
    // 点击取消隐藏
    onCancel() {
      this.isPrpout = false
      this.isActviveNoMatch = false
      this.isSecondConfirmViewShow = false
    },
    //开启活动
    confirmActive() {
        if (this.isUserDataValid){
            if (this.activeButtonState) {
                this.isSecondConfirmViewShow = true
            } else {
                this.$g_toast('小蛙发现你暂不具备活动资格哦~')
            }
        }else {
            this.$g_toast('小蛙发现你暂不具备活动资格哦~')
        }

    },
    //二次确认活动开启
    secondConfirmActive() {
      //成功后再关闭视图
      let url = 'act/api/v1/web/OpenActStatus'
      this.$g_loadingShow('数据加载中')
      this.postRequest(url, this.userData)
        .then((res) => {
          this.$g_loadingHide()
          let responseData = res.data
          if (responseData) {
            let statusCode = responseData.status.code
            //200 开启成功 其他异常
            if (statusCode === 200) {
              //活动开启成功
              this.isSecondConfirmViewShow = false
              this.activeButtonState = false
              //跳转到成功页
              this.$router.push({ name: 'confirm', params: this.userData })
            } else {
              this.isSecondConfirmViewShow = false
              this.activeButtonState = false
              this.isActviveNoMatch = true
              // this.$g_toast("活动开启失败！");
            }
          } else {
            // this.$g_toast("活动开启失败！");
            this.isActviveNoMatch = true
            this.isSecondConfirmViewShow = false
          }
        })
        .catch((err) => {
          this.$g_loadingHide()
        })
    },
  },
  components: {
    RulePopout,
    NoMatchPopout,
    SecondConfirmPopout,
  },
}
</script>

<style scoped>
.hello_guide {
  /*background-image: url("../assets/images/yemian1.png");*/
  background-repeat: no-repeat;
  /*min-height: 780px;*/
  overflow: auto;
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  background-size: auto 100%;
  background-position-x: center;
  background-position-y: center;
}

.main-content {
  position: absolute;
  /*margin-top: 288px;*/
  margin-top: 76.84%;
  /*height: 73px;*/
  /*width: 182px;*/
  height: 9.39%;
  width: 48.53%;
  display: flex;
  flex-direction: column;
  /*justify-content: center;*/
  align-items: center;
  /*background-color: red;*/
}

.content-image {
  width: 46.15%;
  height: 28.76%;
  margin-top: 12px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: center;
  /*background-position-y: center;*/
  justify-content: center;
  align-items: center;
  display: flex;
}

.content-image-background {
  background-image: url('../assets/images/button.png');
  font-family: PingFangSC-Medium, PingFang SC;
  color: #ab5700;
  line-height: 46px;
  background-size: auto 100%;
}

.content-disable-image-background {
  background-image: url('../assets/images/button_disable@2x.png');
  font-family: PingFangSC-Medium, PingFang SC;
  /*font-weight: 500;*/
  color: #8c8c8c;
  line-height: 46px;
}

.content-image p {
  font-size: 13px;
  font-family: PingFangSC-Medium, PingFang SC;
  /* line-height: 9px; */
}

.task-date {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  /*font-weight: 500;*/
  color: #004f63;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 10px;
  /*transform: scale(0.6)*/
}

.task-date-detail {
  color: #fe750a;
}

.task-button {
  background-color: #cbeaee;
  width: 60%;
  font-size: 10px;
  color: #14aeab;
  margin-top: 10px;
  /*transform: scale(0.6)*/
}
.task-button img {
  width: 10px;
  vertical-align: middle;
  display: inline-block;
  margin-right: 2px;
}
.task-button span {
  vertical-align: middle;
  display: inline-block;
}
</style>
