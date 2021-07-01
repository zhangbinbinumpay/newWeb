<template>
	<div class="escorts">
   <el-form :inline="true" :model="dataForm"  size="mini" >
      <el-row class="el-row" type="flex">
        <inputBox inputName='编码:'>
          <el-input class="input" size="mini" v-model="dataForm.code" placeholder="请输入" clearable></el-input>
        </inputBox>
      </el-row>
      <el-form-item  style="float:right;">
        <el-button @click="Query()" type="primary">查询</el-button>
      </el-form-item>
    </el-form>
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
				dataForm:{
					"code":"000"
				},
				imagUrl: '',
				userData: {},
				taskDate: '2021年6月1日至2021年9月30日',
				isPrpout: false,
				isActviveNoMatch: false,
				content_image: 'content-image',
				content_image_background: 'content-image-background',
				content_disable_image_background: 'content-disable-image-background',
				isSecondConfirmViewShow: false /*开启二次确认*/ ,
				isUserDataValid: true,
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
			/* 	if (!this.userData.user_id || !this.userData.token || !this.userData.act_id) {
					this.isUserDataValid = false;
					this.$g_toast('小蛙发现你暂不具备活动资格哦~');
				}
				if (this.$route.params && this.$route.params.openStatus) {
					this.isUserDataValid = this.$route.params.openStatus !== '2';
				} */
		},
		// created() {
		//
		// },
		methods: {

			gotoUrl(a) {

				if (a == "1") {
					window.location.href = "https://hewa.mike-x.com/HG0Wc"
				} else {
					window.location.href = "https://hewa.mike-x.com/xawU8"
				}
			},
			goContent(cid, e) {
				// this.$router.push({path: `/content/detail/${cid}`});
			},
			// 点击显示弹框
			onClickRule() {
				this.isPrpout = true
				// this.isActviveNoMatch = true;
				// this.isSecondConfirmViewShow = true;
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
	

</style>
