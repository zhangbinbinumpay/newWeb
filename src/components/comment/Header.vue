<template>
  <div style="margin-bottom: 95px">
    <header class="header">
      <nav class="navbar navbar-default" id="navbar">
        <div class="container">
          <div class="header-topbar hidden-xs link-border">
            <ul class="site-nav topmenu">
              <li><a @click="goLabel($event)">标签云</a></li>
              <li><a href="#" rel="nofollow">读者墙</a></li>
              <li><a href="#" title="RSS订阅">
                <i class="fa fa-rss">
                </i> RSS订阅
              </a></li>
            </ul>
            进击的程序之路
          </div>
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#header-navbar" aria-expanded="false"><span class="sr-only"></span> <span
              class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button>
            <h1 class="logo hvr-bounce-in">
              <a href="/" title="KivenBen's博客">
                <img src="../../assets/images/logo.png" alt="KivenBen's博客" height="50" width="180">
              </a>
            </h1>
          </div>
          <div class="collapse navbar-collapse" id="header-navbar">
            <ul class="nav navbar-nav navbar-right">
              <li><a href="/" style="font-size:14px;">首页</a></li>
              <li v-for="(val,index) in categories" :key="index" class="category-li">
                <div class="btn-group">
                  <a class="btn btn-link dropdown-toggle" data-toggle="dropdown"
                     aria-haspopup="true" aria-expanded="false">
                    {{val.name}} <span v-if="val.children.length" class="caret"></span>
                  </a>
                  <ul class="dropdown-menu" v-if="val.children.length">
                    <li v-for="(item,idx) in val.children" :key="idx">
                      <a @click="goListByType(item.id)">{{item.name}}</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        categories: []
      }
    },
    mounted() {
      this.category();
    },
    methods: {
      category() {
        this.$axios.get("/api/font/home/category").then(res => {
          if (res.status) {
            this.categories = res.data.data;
          }
        })
      },
      goListByType(typeId) {
        this.$router.push({path: `/list/type/${typeId}`});
      },
      goLabel() {
        this.$router.push({path: "/label"});
      },
    },
    watch: {
      '$route' (to, from) {
        this.$router.go(0);
      }
    },
  }
</script>

<style scoped>
  .category-li {
    padding: 0 8px;
    margin-top: 12px;
    font-size: 16px;
  }
  .header{
    width: 100%;
    position: fixed;
    top:0;
    z-index: 100;
  }
</style>
