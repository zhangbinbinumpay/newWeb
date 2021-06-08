<template>
	<div class="escorts">
		<div id="demo" class="carousel slide" data-ride="carousel">
			<div class="carousel-inner">
				<div class="carousel-item active">
					<img src="../assets/images/escorts_main_head.png">
					<div class="carousel-caption">
						<div class="row escorts_main_button">

							<div class="col-lg-12 col-md-12 col-xs-12">
								<div class="col-lg-6 col-md-6 col-xs-12">
									<button @click="gotoUrl('1')">我是VC</button>
								</div>
								<div class="col-lg-6 col-md-6 col-xs-12">
									<button @click="gotoUrl('2')">我是被投公司</button>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>

		</div>

		<div class="container escorts_main_head">
			<img class="m-show_img" style="width:100%;height: calc(1);" src="../assets/images/m_mian1.png" />
			<div class="row escorts_main_button">
				<div class="col-lg-12 col-md-12 col-xs-12 m-show ">
					禾蛙VC渠道联盟
				</div>
				<div class="col-lg-12 col-md-12 col-xs-12 m-show m-show1">
					助力被投企业发展，高效引进优选人才
				</div>
				<div class="col-lg-12 col-md-12 col-xs-12">
					<div class="col-lg-6 col-md-6 col-xs-12">
						<button @click="gotoUrl('1')">我是VC</button>
					</div>
					<div class="col-lg-6 col-md-6 col-xs-12">
						<button @click="gotoUrl('2')">我是被投公司</button>
					</div>
				</div>
			</div>
		</div>
		<div class="mian_body_back">
			<div class="container">
				<div class="row">
					<div class="col-lg-4 col-md-4 col-xs-12 imgdiv">
						<img class="" src="../assets/images/body2.png" />
						<p class="imgP">
							智能化产业互联网平台打破传统猎企与客户单点合作模式通过产业互联构建全新猎企生态圈。
						</p>
					</div>
					<div class="col-lg-4 col-md-4 col-xs-12 imgdiv">
						<img class="" src="../assets/images/body3.png" />
						<p class="imgP">
							采用人工智能+大数据精准匹配合作<br>商与候选人。
						</p>
					</div>
					<div class="col-lg-4 col-md-4 col-xs-12 imgdiv">
						<img class="" src="../assets/images/body1.png" />
						<p class="imgP">
							百家猎企供应商齐头并进协作交付，
							资源共享，提升交付速率与交付能力。
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="mian_body_back2">
			<div class="container">
				<div class="row">
					<div class="col-lg-6 col-md-6 col-xs-12 mian_body_back2Img">
						<img class="" src="../assets/images/footer_1.png" />
					</div>
					<div class="col-lg-6 col-md-6 col-xs-12  main_footr">

						<div class="col-lg-6 col-md-6 col-xs-6 span6">
							<div>
								<p><span>800</span> 余家</p>
								<p>猎头机构</p>
							</div>


						</div>

						<div class="col-lg-6 col-md-6 col-xs-6 span6">
							<div>
								<p><span>5100</span> 余名</p>
								<p>顾问</p>
							</div>
						</div>
					</div>
					<div class="col-lg-6 col-md-6 col-xs-12  main_footr">
						<div class="col-lg-6 col-md-6 col-xs-6 span6">
							<div>
								<p><span>5000</span> 余家</p>
								<p>协作服务企业</p>
							</div>
						</div>
						<div class="col-lg-6 col-md-6 col-xs-6 span6">
							<div>
								<p><span>23800</span> 余个</p>
								<p>协作服务岗位</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="footer">
			<div class="container">
				<div class="col-lg-1 col-md-1 footlogbody  m-hide">
					<img class="footlog" src="../assets/images/footlog.png" />
				</div>
				<div class="col-lg-8 col-md-8  col-xs-12 footlogMide">
					<div class="col-lg-9 col-md-9 col-xs-12">
						<p class="m-color">关于禾蛙</p>
						<p class="footlogMide_p2">致力于连接更多招聘专家，最大化利用优质活跃的大数据人才库、促成更多职位成功交付的职位共享平台。</p>

					</div>
					<div class="col-lg-3 col-md-3 col-xs-6 text-center footlogMide2 m-hide">
						<p>联系禾蛙</p>
						<p class="footlogMide_p2">禾蛙官方客服<br> 400-777-5125</p>
					</div>
				</div>
				<div class="col-lg-3 col-md-3 col-xs-12 footer_weichat">
					<div class="col-lg-3 col-md-3 col-xs-4 text-center footlogMide footlogMide2 m-show_footer">
						<p class="m-color">联系禾蛙</p>
						<p class="footlogMide_p2">禾蛙官方客服<br> 400-777-5125</p>
					</div>
					<div class="col-lg-6 col-md-6  col-xs-4 text-right-weichat">
						<img src="../assets/images/wchat.png" alt="">
						<p>禾蛙微信公众号</p>
					</div>
					<div class="col-lg-6 col-md-6  col-xs-4 text-right-weichat">
						<img src="../assets/images/wchat2.png" alt="">
						<p>禾蛙VC专属对接人</p>
					</div>
				</div>
				<div class="col-lg-1 col-md-1 footlogbody">

				</div>
				<div class="col-lg-8 col-md-8 col-xs-12  footlogMide_m">
					<div class="col-lg-12 col-md-12 text-left">
						<p class="footlogMide_p3">苏ICP备14059286号-12 科锐数字科技（苏州）有限公司 Copyright 2020-2022 www.hewa.cn</p>

					</div>

				</div>
			</div>
		</div>

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
	
	/* Make the image fully responsive */
	.carousel-inner img {
		width: 100%;
		height: 100%;
	}

	.carousel-inner {
		max-height: inherit;
	}

	.carousel {
		margin-bottom: 0;
	}

	@media screen and (min-width: 1200px) {
		.m-show_img {
			display: none;
		}

		.m-show_footer {
			display: none;
		}

		.m-show {
			display: none;
		}

		.escorts_main_head {

			background-image: url("../assets/images/escorts_main_head.png");
			background-repeat: no-repeat;
			min-height: 650px;
			overflow: auto;
			height: 650px;
			display: flex;
			justify-content: center;
			width: 100%;
			background-size: 100%;

			width: 100%;
			max-width: 100%;
			position: relative;
			display: none;

		}

		.escorts_main_button div:nth-child(1) {
			text-align: right;
			padding-right: 15px;
		}

		.escorts_main_button div:nth-child(2) {
			text-align: left;
			padding-left: 15px;
		}

		.mian_body_back {
			width: 100%;

			background: #ffffff;
			padding-top: 50px;
			padding-bottom: 75px;
		}


		.imgdiv {
			padding: 40px;
			text-align: center;

			height: 380px;


		}

		.imgdiv img {
			width: 95%;
		}

		.imgP {
			font-size: 28px;
			padding: 0 10px;
			margin-top: 25px;
			line-height: 45px;
		}


		.mian_body_back2 {
			background: #F6F6F8;
			padding: 75px 0;
		}

		.mian_body_back2 img {
			width: 95%;
		}

		.main_footr {
			padding-top: 2.5px;
		}

		.main_footr div div {
			border: 1px solid #53BDB3;
			height: 135px;
			text-align: center;
			font-size: 35px;
			margin-bottom: 25px;
			padding-top: 35px;
			color: #666666;



		}

		.main_footr div div p {
			line-height: 50px;
		}

		.main_footr div div p span {
			color: #333333;
			font-weight: 600;
		}

		.main_footr div:nth-child(2),
		.main_footr div:nth-child(4) {
			float: right;
		}

		.footer {
			width: 100%;
			background: #444444;
			padding: 50px 0;
		}

		.footlogbody {
			text-align: left;
			padding-left: 0px;
		}

		.footlog {
			width: 80px;
		}

		.footlogMide {
			height: 105px;

			border-right: 1px solid #CCCCCC;
			font-size: 25px;
			line-height: 30px;
			color: #fff;
			text-align: left;

		}

		.footlogMid p {}

		.footlogMide2 {
			padding-left: 30px;
		}

		.footlogMide_p2 {
			padding-top: 20px;
			font-size: 22px;
			line-height: 40px;
		}

		.footlogMide_p3 {
			padding-top: 10px;
			font-size: 22px;
			line-height: 40px
		}

		.footer_weichat {
			padding-left: 40px;
		}

		.footer_weichat img {
			height: 80px;
		}

		.footer_weichat p {
			text-align: center;
			color: #ffffff;
			font-size: 0.75rem;
			display: block;
			height: 30px;

			width: 114%;
			text-align: center;
			line-height: 1.9375rem;
			padding: 0px;
			padding-top: 10px;
		}

		.footlogMide_m {
			border: none;
		}

		.footer_weichat .text-right-weichat {
			text-align: right;

		}

	}


	@media screen and (max-width: 1440px) {
		.escorts_main_button {

			width: 1200px;
			max-width: 100%;
			height: 100px;
			margin: 0 auto;
			text-align: center;
			position: absolute;
			bottom: 65px;
		}

	}

	@media screen and (min-width:1680px) {
		.escorts_main_button {
			width: 80%;
			max-width: 100%;
			height: 250px;
			margin: 0 auto;
			text-align: center;

			bottom: 65px;

		}
	}

	@media (min-width: 1440px)and (max-width: 1680px) {
		.escorts_main_button {

			width: 80%;
			max-width: 100%;
			height: 200px;
			margin: 0 auto;
			text-align: center;

			bottom: 65px;


		}
	}

	@media (min-width: 1200px)and (max-width: 1440px) {

		.escorts_main_button {

			width: 1200px;
			max-width: 100%;
			height: 100px;
			margin: 0 auto;
			text-align: center;
			position: absolute;
			bottom: 95px;


		}


		.escorts_main_head {
			background-image: url("../assets/images/escorts_main_head.png");
			background-repeat: no-repeat;
			min-height: 500px;
			overflow: auto;
			height: 500px;
			display: flex;
			justify-content: center;
			width: 100%;
			background-size: 100%;

			width: 100%;
			max-width: 100%;
			position: relative;
			display: none
		}
	}

	@media screen and (max-width: 768px) {

		.escorts_main_head {

			background-repeat: no-repeat;

			overflow: auto;

			display: flex;
			justify-content: center;
			width: 100%;
			background-size: 100%;

			width: 100%;
			max-width: 100%;
			position: relative;
			margin: 0;

		}

		.escorts_main_button {
			width: 100%;
			max-width: 100%;
			/* height: 650px; */
			margin: 0 auto;
			text-align: center;
			/* position: initial; */

			position: absolute;
			top: 2rem;

		}

		.escorts_main_button div:nth-child(1) {
			text-align: center;

			margin-bottom: 15px;

		}

		.escorts_main_button div:nth-child(2) {
			text-align: center;

		}

		.m-show {
			font-size: 45px;
			color: #ffffff;
			margin-bottom: 18.5rem;
			margin-top: 70px;
			font-weight: bold;
			
		}

		.m-show1 {
			font-weight: inherit;
			font-size: 28px;
			margin-top: 0px;
		}

		.mian_body_back {
			width: 100%;

			background: #ffffff;
			padding-top: 50px;
		}


		.imgdiv {
			padding: 30px;
			text-align: center;




		}

		.imgdiv img {
			width: 70%;
		}

		.imgP {
			font-size: 1.5rem;
			padding: 0 10px;
			margin-top: 20px;
			color: #333333;
			line-height: 44px;
		}


		.mian_body_back2 {
			background: #F6F6F8;
			padding: 50px 0;
		}

		.mian_body_back2Img {
			padding: 0;
		}

		.mian_body_back2 img {
			width: 100%;
		}

		.main_footr {
			padding-top: 2.5px;
		}

		.main_footr div div {
			border: 1px solid #53BDB3;
			height: 103px;
			text-align: center;
			font-size: 28px;
			padding-top: 19px;
			color: #666666;


		}

		.main_footr div div p {
			line-height: 50px;
		}

		.main_footr div div p span {
			color: #333333;
			font-weight: 600;
		}

		.main_footr div:nth-child(2),
		.main_footr div:nth-child(4) {
			float: right;
		}

		.main_footr {
			margin-top: 35px;
			margin-bottom: -16px;
			padding-left: 15px;
			padding-right: 15px;
		}

		.main_footr div {
			padding-left: 10px;
			padding-right: 10px;
		}


	}

	@media screen and (max-width: 414px) {
		.escorts_main_button {
			width: 100%;
			max-width: 100%;
			/* height: 650px; */
			margin: 0 auto;
			text-align: center;
			/* position: initial; */

			position: absolute;
			top: 4rem;

		}

		.m-hide {
			display: none;
		}

		.footer {
			background: #444444;
			padding: 0;
			padding: 25px 0;
		}

		.footlogMide {
			font-size: 1.5625rem;
			line-height: 1.875rem;
			color: #fff;
			text-align: left;
			margin-bottom: 25px;
		}

		.footlogMide_p2 {
			padding-top: 10px;
			font-size: 1.25rem;
			line-height: 2rem;
			margin-bottom: 15px;
		}

		.footer_weichat img {
			height: 75px;
		}

		.footer_weichat p {

			color: #ffffff;
			font-size: 1.25rem;
			display: block;
			height: 30px;
			width: 100%;

			line-height: 1.9375rem;
			padding: 0px;
			padding-top: 10px;


		}

		.text-right-weichat p {
			font-size: 1rem;
		}

		.footer {
			padding: 20px;
			padding-bottom: 45px;
		}

		.footer div {
			padding-left: 0;
			padding-right: 0;
			margin: 0;
		}

		.footer .footer_weichat {
			margin: 15px 0px;

		}

		.footlogMide_p3 {
			padding-top: 10px;
			font-size: 1.375rem;
			line-height: 2rem;
		}

		.m-color {
			color: #53BDB3;
			font-size: 30px
		}

		.footer_weichat .m-color {
			color: #53BDB3;
			font-size: 30px;
		}

		.text-right-weichat {
			text-align: center;
		}

	}

	@media screen and (max-width:375px) {
		.escorts_main_button {
			width: 100%;
			max-width: 100%;
			/* height: 650px; */
			margin: 0 auto;
			text-align: center;
			/* position: initial; */

			position: absolute;
			top: 2rem;

		}
	}

	@media screen and (max-width:320px) {
		.escorts_main_button {
			width: 100%;
			max-width: 100%;
			/* height: 650px; */
			margin: 0 auto;
			text-align: center;
			/* position: initial; */

			position: absolute;
			top: -3rem;

		}
	}

	.escorts_main_button button {
		width: 160px;
		height: 45px;
		font-size: 26px;
		background: #53BDB3;
		color: #ffffff;
		line-height: 23px;
		border-radius: 2px;
	}
</style>
