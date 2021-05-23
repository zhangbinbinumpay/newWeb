<template>
  <div class="hello">
    <my-header></my-header>
    <section class="container">
      <div class="content-wrap">
        <div class="content">
          <div class="title">
            <h3><span class="red">精选推荐</span></h3>
          </div>
          <article class="excerpt-minic excerpt-minic-index">
            <ul>
              <li v-for="(item,key) in recommends" :key="key">
                <h2>
                  <span class="red">【推荐】</span>
                  <a @click="goContent(item.id,$event)" :title="item.title">{{item.title}}</a>
                </h2>
                <p class="note">{{item.introduction}}</p>
                <hr>
              </li>
            </ul>
          </article>
          <div class="title">
            <h3>最新发布</h3>
          </div>
          <ul>
            <li v-for="(item,key) in contents.list" :key="key">
              <article class="excerpt excerpt-1" style="">
                <a class="focus" :title="item.title" @click="goContent(item.id,$event)">
                  <img class="thumb" :data-original="item.images" :src="item.images"
                       alt="item.title" style="display: inline;">
                </a>
                <header>
                  <a class="cat" href="#" :title="item.typeName">{{item.typeName}}<i></i></a>
                  <h2><a href="#" @click="goContent(item.id,$event)" :title="item.title">{{item.title}}</a>
                  </h2>
                </header>
                <p class="meta">
                  <time class="time"><i class="glyphicon glyphicon-time"></i>{{item.createTime}}</time>
                  <span class="views"><i class="glyphicon glyphicon-eye-open"></i>{{item.readNum}}</span> <a
                  class="comment"><i
                  class="glyphicon glyphicon-comment"></i>{{item.remarkNum}}</a>
                </p>
                <p class="note">{{item.introduction}}</p>
              </article>
            </li>
          </ul>
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
    name: 'Home',
    data() {
      return {
        contents: {},
        recommends: {},
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
    },
    components: {
      'my-header': Header,
      'my-footer': Footer,
      'my-right': RightSidebar,
    },
  }
</script>

<style scoped>
  .hello {
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
