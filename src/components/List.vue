<template>
  <div>
    <my-header></my-header>
    <section class="container">
      <div class="content-wrap">
        <div class="content">
          <div class="title-div">
            <h3>{{title}}</h3>
            <p>目前共计&ensp;{{contents.total}}&ensp;篇文章</p>
          </div>
          <div v-if="!listCount">
            没有数据
          </div>
          <ul>
            <li v-for="(item,key) in contents.list" :key="key">
              <article class="excerpt excerpt-5">
                <a class="focus" title="" @click="goContent(item.id,$event)">
                  <img class="thumb" :src="item.images" alt="" style="display: inline;">
                </a>
                <header>
                  <a class="cat" href="#">{{item.typeName}}<i></i></a>
                  <h2>
                    <a href="#" :title="item.title" @click="goContent(item.id,$event)">{{item.title}}</a>
                  </h2>
                </header>
                <p class="meta">
                  <time class="time">
                    <i class="glyphicon glyphicon-time"></i>{{item.createTime.split('T')[0]}}
                  </time>
                  <span class="views">
                    <i class="glyphicon glyphicon-eye-open"></i>{{item.readNum}}
                  </span>
                  <a class="comment" href="#" title="评论" target="_blank">
                    <i class="glyphicon glyphicon-comment"></i>{{item.remarkNum}}
                  </a>
                </p>
                <p class="note">{{item.introduction}}</p>
              </article>
            </li>
          </ul>
          <nav>
            <ul class="pager">
              <li><a @click="pageList(1)" v-if="pageNum>1">上一页</a></li>
              <li><a @click="pageList(0)" v-if="pageCount>9">下一页</a></li>
            </ul>
          </nav>
        </div>
      </div>
      <my-right></my-right>
    </section>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import Footer from "./comment/Footer";
  import Header from "./comment/Header";
  import RightSidebar from "./comment/RightSidebar";

  export default {
    name: "List",
    data() {
      return {
        title: '',
        contents: {},
        listCount: 0,
        pageCount: 0,
        keyword: '',
        typeId: 0,
        specialId: 0,
        label: '',
        pageNum: 0,
        pageSize: 0
      }
    },
    mounted() {
      this.list();
    },
    methods: {
      list() {
        let keyword = this.$route.params.keyword || '';
        let typeId = this.$route.params.typeId || '';
        let specialId = this.$route.params.specialId || '';
        let label = this.$route.params.label || '';
        let pageNum = this.$route.query.pageNum || 1;
        let pageSize = this.$route.query.pageSize || 10;
        console.log('keyword:' + keyword + ",typeId:" + typeId + ",specialId:" + specialId + ',label:' + label + ',page:' + pageNum + ',size:' + pageSize);
        this.$axios.get("/api/font/content/list?keyword=" + keyword + "&typeId=" + typeId + "&specialId=" + specialId + "&label=" + label + "&pageNum=" + pageNum + "&pageSize=" + pageSize).then(res => {
          console.log(res.data);
          if (res.status) {
            let {title, contents} = res.data.data;
            this.title = title;
            this.contents = contents;
            this.listCount = contents.total;
            this.pageCount = contents.list.length;
            this.pageNum = contents.pageNum;
            this.pageSize = contents.pageSize;
          }
        })
      },
      pageList(status) {
        let keyword = this.$route.params.keyword || '';
        let typeId = this.$route.params.typeId || '';
        let specialId = this.$route.params.specialId || '';
        let label = this.$route.params.label || '';
        let pageNum = this.pageNum;
        if (pageNum >= 1) {
          pageNum = status > 0 ? pageNum - 1 : pageNum + 1;
        }
        let pageSize = this.pageSize;
        console.log('keyword:' + keyword + ",typeId:" + typeId + ",specialId:" + specialId + ',label:' + label + ',page:' + pageNum + ',size:' + pageSize);
        this.$axios.get("/api/font/content/list?keyword=" + keyword + "&typeId=" + typeId + "&specialId=" + specialId + "&label=" + label + "&pageNum=" + pageNum + "&pageSize=" + pageSize).then(res => {
          console.log(res.data);
          if (res.status) {
            let {title, contents} = res.data.data;
            this.title = title;
            this.contents = contents;
            this.listCount = contents.total;
            this.pageCount = contents.list.length;
            this.pageNum = contents.pageNum;
            this.pageSize = contents.pageSize;
          }
        })
      },
      goContent(cid, e) {
        this.$router.push({path: `/content/detail/${cid}`});
      }
    },
    components: {
      'my-header': Header,
      'my-footer': Footer,
      'my-right': RightSidebar,
    },
    watch: {
      '$route'(to, from) {
        this.$router.go(0);
      }
    },
  }
</script>

<style scoped>
  .title-div {
    text-align: center;
  }

  .title-div h3 {
    line-height: 1.3;
    font-family: 'LiHei Pro Medium', serif;
  }

  .title-div p {
    font-size: 16px;
    line-height: 3;
    color: black;
  }
</style>
