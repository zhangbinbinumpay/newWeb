<template>
  <div>
	  <Header></Header>
	  <keep-alive>
	    <router-view />
	   </keep-alive>
	<Footer></Footer>
  </div>
</template>

<script>
    import util from "../util";
	import Header from './comment/Header.vue'
	import Footer from './comment/Footer.vue'
  import NavMenu from './comment/viwe/NavMenu.vue'
   import helpList from './comment/viwe/helpList.vue'
    export default {
        name: "home",
		 metaInfo:{
			 title:'dfdfd',
		      meta:[
		        {
		          name:'keywords',
		          content:'.....'
		        },
		        {
		          name:'discription',
		          content:'.....'
		        }
		      ]
		    },
			
		components:{
		      Footer,
			  Header,
			  NavMenu,
			  helpList
			
		  },
        data() {
            return {
                userData: {},
			activeIndex:"mian",
			helpList: [{
				            //一级
				            entity: {
							index:0,
				              id: 0,
				              name: "mian",
				              icon: "el-icon-message",
				              alias: "一级菜单"
				            }
				          },
				          {
				            //一级
				            entity: {
									index:1,
				              id: 1,
				              name: "systemManage",
				              icon: "el-icon-message",
				              alias: "两级菜单d"
				            },
				            //二级
				            childs: [
				              {
				                entity: {
				                  id: 3,
				                  name: "authManage",
				                  icon: "el-icon-loading",
				                  alias: "权限管理",
				                  value: { path: "/hello" }
				                }
				              },
				              {
				                entity: {
				                  id: 4,
				                  name: "roleManage",
				                  icon: "el-icon-bell",
				                  alias: "角色管理",
				                  value: "/system/role"
				                }
				              },
				              {
				                entity: {
				                  id: 2,
				                  name: "menuManage",
				                  icon: "el-icon-edit",
				                  alias: "菜单管理",
				                  value: "/system/menu"
				                }
				              },
				              {
				                entity: {
				                  id: 5,
				                  name: "groupManage",
				                  icon: "el-icon-mobile-phone\r\n",
				                  alias: "分组管理",
				                  value: "/system/group"
				                }
				              }
				            ]
				          },
				          {
				            //一级
				            entity: {
				              id: 6,
				              name: "userManage",
				              icon: "el-icon-news",
				              alias: "三级菜单"
				            },
				            //二级
				            childs: [
				              {
				                entity: {
				                  id: 7,
				                  name: "accountManage",
				                  icon: "el-icon-phone-outline\r\n",
				                  alias: "帐号管理",
				                  value: ""
				                },
				                //三级
				                childs: [
				                  {
				                    entity: {
				                      id: 14,
				                      name: "emailManage",
				                      icon: "el-icon-sold-out\r\n",
				                      alias: "邮箱管理",
				                      value: "/content/email"
				                    }
				                  },
				                  {
				                    entity: {
				                      id: 13,
				                      name: "passManage",
				                      icon: "el-icon-service\r\n",
				                      alias: "密码管理",
				                      value: "/content/pass"
				                    }
				                  }
				                ]
				              },
				              {
				                entity: {
				                  id: 8,
				                  name: "integralManage",
				                  icon: "el-icon-picture",
				                  alias: "积分管理",
				  
				                  value: "/user/integral"
				                }
				              }
				            ]
				          },
				          {
				            //一级
				            entity: {
				              id: 40,
				  
				              name: "contentManage",
				              icon: "el-icon-rank",
				              alias: "四级菜单"
				            },
				            //er级
				            childs: [
				              {
				                entity: {
				                  id: 41,
				                  name: "classifyManage2",
				                  icon: "el-icon-printer",
				                  alias: "分类管理"
				                },
				                //三级
				                childs: [
				                  {
				                    entity: {
				                      id: 42,
				                      name: "classifyManage3",
				                      icon: "el-icon-printer",
				                      alias: "分类管理"
				                    },
				                    //四级
				                    childs: [
				                      {
				                        entity: {
				                          id: 43,
				                          name: "classifyManage4",
				                          icon: "el-icon-printer",
				                          alias: "分类管理",
				                          value: "/content/classify"
				                        }
				                      }
				                    ]
				                  }
				                ]
				              }
				            ]
				          }
				        ],
				
			
				    menuData: [
				          {
				            //一级
				            entity: {
							index:0,
				              id: 0,
				              name: "home",
				              icon: "el-icon-message",
				              alias: "一级菜单"
				            }
				          },
				          {
				            //一级
				            entity: {
									index:1,
				              id: 1,
				              name: "systemManage",
				              icon: "el-icon-message",
				              alias: "两级菜单d"
				            },
				            //二级
				            childs: [
				              {
				                entity: {
				                  id: 3,
				                  name: "authManage",
				                  icon: "el-icon-loading",
				                  alias: "权限管理",
				                  value: { path: "/hello" }
				                }
				              },
				              {
				                entity: {
				                  id: 4,
				                  name: "roleManage",
				                  icon: "el-icon-bell",
				                  alias: "角色管理",
				                  value: "/system/role"
				                }
				              },
				              {
				                entity: {
				                  id: 2,
				                  name: "menuManage",
				                  icon: "el-icon-edit",
				                  alias: "菜单管理",
				                  value: "/system/menu"
				                }
				              },
				              {
				                entity: {
				                  id: 5,
				                  name: "groupManage",
				                  icon: "el-icon-mobile-phone\r\n",
				                  alias: "分组管理",
				                  value: "/system/group"
				                }
				              }
				            ]
				          },
				          {
				            //一级
				            entity: {
				              id: 6,
				              name: "userManage",
				              icon: "el-icon-news",
				              alias: "三级菜单"
				            },
				            //二级
				            childs: [
				              {
				                entity: {
				                  id: 7,
				                  name: "accountManage",
				                  icon: "el-icon-phone-outline\r\n",
				                  alias: "帐号管理",
				                  value: ""
				                },
				                //三级
				                childs: [
				                  {
				                    entity: {
				                      id: 14,
				                      name: "emailManage",
				                      icon: "el-icon-sold-out\r\n",
				                      alias: "邮箱管理",
				                      value: "/content/email"
				                    }
				                  },
				                  {
				                    entity: {
				                      id: 13,
				                      name: "passManage",
				                      icon: "el-icon-service\r\n",
				                      alias: "密码管理",
				                      value: "/content/pass"
				                    }
				                  }
				                ]
				              },
				              {
				                entity: {
				                  id: 8,
				                  name: "integralManage",
				                  icon: "el-icon-picture",
				                  alias: "积分管理",
				  
				                  value: "/user/integral"
				                }
				              }
				            ]
				          },
				          {
				            //一级
				            entity: {
				              id: 40,
				  
				              name: "contentManage",
				              icon: "el-icon-rank",
				              alias: "四级菜单"
				            },
				            //er级
				            childs: [
				              {
				                entity: {
				                  id: 41,
				                  name: "classifyManage2",
				                  icon: "el-icon-printer",
				                  alias: "分类管理"
				                },
				                //三级
				                childs: [
				                  {
				                    entity: {
				                      id: 42,
				                      name: "classifyManage3",
				                      icon: "el-icon-printer",
				                      alias: "分类管理"
				                    },
				                    //四级
				                    childs: [
				                      {
				                        entity: {
				                          id: 43,
				                          name: "classifyManage4",
				                          icon: "el-icon-printer",
				                          alias: "分类管理",
				                          value: "/content/classify"
				                        }
				                      }
				                    ]
				                  }
				                ]
				              }
				            ]
				          }
				        ],
				
			
			
            }
			
        },
        mounted() {
       	let start = window.location.href.lastIndexOf('/');
       	let path = window.location.href.slice(start+1);
       	this.activeIndex = path;
        },
        methods: {
			selectItems(id){
		
			console.log(id)
			//按钮选中之后设置当前的index为store里的值。
			},
            home() {
             /*   // console.log('userData1:' + JSON.stringify(this.userData));
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
                            // this.$g_toast("未绑定活动");
                            this.userData['openStatus'] = '2';
                            this.$router.push({name: 'guide', params: this.userData})
                        }
                    } else {
                        //此处认为是有异常
                        this.$router.push({name: 'escorts', params: this.userData})
                        // this.$router.push({name: 'confirm', params: this.userData})
                    }

                }).catch(err => {
                    console.log('err:' + err);
                    this.$g_loadingHide();
                }); */
            },
			 setCurrentRoute() {
			      this.activeIndex= this.$route.path; // 通过他就可以监听到当前路由状态并激活当前菜单
			    }
        },
		created() {
		    this.setCurrentRoute();
		  },
		watch: {
		      $route() {
		        this.setCurrentRoute();
		      }
		    },
		
		  
	}
	

</script>

<style scoped>

</style>