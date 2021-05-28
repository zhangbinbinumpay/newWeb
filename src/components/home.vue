<template>
  <div>

  </div>
</template>

<script>
    import util from "../util";

    export default {
        name: "home",
        data() {
            return {
                userData: {},
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
            this.home();
        },
        methods: {
            home() {
                // console.log('userData1:' + JSON.stringify(this.userData));
                this.$g_loadingShow('数据加载中');
                let url = "act/api/v1/web/getActOpenStatus";
                this.getRequest(url, this.userData).then(res => {
                    this.$g_loadingHide();
                    let bodyData = res.data;
                    if (bodyData) {
                        let responseData = bodyData.data;
                        let openStatus = responseData.openStatus;
                        //0 未开启 1 已开启 2 未绑定活动
                        if (openStatus === 0) {
                            this.$router.push({name: 'guide', params: this.userData})
                        } else if (openStatus === 1) {
                            this.$router.push({name: 'confirm', params: this.userData})
                        } else if (openStatus === 2) {
                            this.$g_toast("未绑定活动");
                        }
                    } else {
                        //此处认为是有异常
                        this.$router.push({name: 'guide', params: this.userData})
                        // this.$router.push({name: 'confirm', params: this.userData})
                    }

                }).catch(err => {
                    console.log('err:' + err);
                    this.$g_loadingHide();
                });
            },
        }
    }

</script>

<style scoped>

</style>