<template>
  <div>
    <aside class="sidebar">
      <div class="fixed">
        <div class="widget widget-tabs">
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active">
              <a href="#contact" aria-controls="contact" role="tab" data-toggle="tab">联系站长</a>
            </li>
            <li role="presentation">
              <a href="#notice" aria-controls="notice" role="tab" data-toggle="tab">统计信息</a>
            </li>
          </ul>
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane contact" id="notice">
              <h2>
                日志总数:888篇
              </h2>
              <h2>
                网站运行:
                <span id="sitetime">88天 </span>
              </h2>
            </div>
            <div role="tabpanel" class="tab-pane contact active" id="contact">
              <ul class="blog-list">
                <li><a href="https://github.com/ghostxbh" target="_blank">GitHub</a></li>
                <li><a href="https://blog.csdn.net/ghostxbh" target="_blank">CSDN</a></li>
                <li><a href="https://www.jianshu.com/u/acfc657ed3e4" target="_blank">简书</a></li>
                <li><a href="https://www.cnblogs.com/ghostxbh/" target="_blank">博客园</a></li>
                <li><a href="#">知乎</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="widget widget_search">
          <form class="navbar-form" action="#">
            <div class="input-group">
              <input type="text" name="keyword" class="form-control" size="35" placeholder="请输入关键字"
                     maxlength="15" autocomplete="off" v-model="keyword">
              <span class="input-group-btn">
		            <button class="btn btn-default btn-search" @click="goListByKeyword()" type="submit">搜索</button>
		            </span>
            </div>
          </form>
        </div>
      </div>
      <div class="widget widget_hot" v-if="specials.length">
        <h3>专栏列表</h3>
        <ul>
          <li v-for="(item,key) in specials" :key="key">
            <a :title="item.name" @click="goListBySpecial(item.id)">
                <span class="thumbnail">
				          <img class="thumb" :src="item.image" :alt="item.name" style="display: block;">
			          </span>
              <span class="text">{{item.name}}</span>
              <span class="muted">
                  <i class="glyphicon glyphicon-time"></i>
				          {{item.createTime}}
			          </span>
              <span class="muted">
                  <i class="glyphicon glyphicon-eye-open"></i>
                  {{item.readNum}}
                </span>
            </a>
          </li>
        </ul>
      </div>
      <div class="widget widget_hot" v-if="remarks.length">
        <h3>最新评论文章</h3>
        <ul>
          <li v-for="(item,key) in remarks" :key="key">
            <a :title="item.title" @click="goContent(item.id,$event)">
                <span class="thumbnail">
				          <img class="thumb" :src="item.images" style="display: block;">
			          </span>
              <span class="text">{{item.title}}</span>
              <span class="muted">
                  <i class="glyphicon glyphicon-time"></i>
				          {{item.createTime}}
			          </span>
              <span class="muted">
                  <i class="glyphicon glyphicon-eye-open"></i>
                  {{item.readNum}}
                </span>
            </a>
          </li>
        </ul>
      </div>
      <div class="widget widget_sentence" v-if="links.length">
        <h3>友情链接</h3>
        <ul class="link-ul">
          <li v-for="(item,key) in links" :key="key" class="link-li">
            <a :href="item.url" target="_blank">{{item.name}}</a>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script>
  export default {
    name: "RightSidebar",
    data() {
      return {
        remarks: [],
        labels: [],
        links: [],
        specials: [],
        keyword: '',
      }
    },
    mounted() {
      this.rightSidebar();
    },
    methods: {
      rightSidebar() {
        this.$axios.get("/api/font/home/right").then(res => {
          if (res.status) {
            console.log(res.data.data);
            let {remarks, labels, links, specials} = res.data.data;
            this.remarks = remarks;
            this.labels = labels;
            this.links = links;
            this.specials = specials;
          }
        })
      },
      goContent(cid, e) {
        this.$router.push({path: `/content/detail/${cid}`});
      },
      goListBySpecial(specialId) {
        this.$router.push({path: `/list/special/${specialId}`});
      },
      goListByKeyword() {
        let keyword = this.keyword;
        this.$router.push({path: `/list/search/${keyword}`});
      }
    },
  }
</script>

<style scoped>
  .link-ul{
    margin-left: 2%;
  }
  .link-li{
    float: left;
    font-size: 14px;
    padding: 14px 8px 10px;
    margin: 0;
    cursor: default;
  }
  .blog-list li {
    font-size: 16px;
    font-family: "Microsoft YaHei", "微软雅黑", Helvetica, Tahoma, STXihei, "华文细黑", STHeiti, "Helvetica Neue", Helvetica, Tahoma, "Droid Sans", "wenquanyi micro hei", FreeSans, Arimo, Arial, SimSun, "宋体", Heiti, "黑体", sans-serif;
    float: left;
    list-style: none;
    padding: 45px 11px;
  }
</style>
