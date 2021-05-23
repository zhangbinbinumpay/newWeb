<template>
  <div class="label-body">
    <my-header></my-header>
    <section class="container">
      <div class="content-wrap">
        <div class="title-div">
          <h3 style="line-height: 1.3">标签分类</h3>
          <p>目前共计&ensp;{{labelCount}}&ensp;个标签</p>
        </div>
        <div class="label-list">
          <ul class="label-ul">
            <li v-for="(item,key) in labels" :key="key">
              <a @click="goListByLabel(item.name)" :title="'共有'+item.num+'篇文章'">{{item.name}}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <br>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import Footer from "./comment/Footer";
  import Header from "./comment/Header";

  export default {
    name: "Label",
    data() {
      return {
        labels: [],
        labelCount: 0,
      }
    },
    mounted() {
      this.label();
    },
    methods: {
      label() {
        this.$axios.get("/api/font/label/all").then(res => {
          if (res.status) {
            console.log(res.data.data);
            let labels = res.data.data;
            this.labels = labels;
            this.labelCount = labels.length;
          }
        })
      },
      goListByLabel(label) {
        this.$router.push({path: `/list/label/${label}`});
      },
    },
    components: {
      'my-header': Header,
      'my-footer': Footer,
    },
  }
</script>

<style scoped>
  .label-body {
    background-image: url("../assets/images/yulong.jpeg");
    position: relative;
    min-width: 1000px;
    min-height: 650px;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .content-wrap {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .title-div {
    text-align: center;
  }

  .title-div h3 {
    font-family: 'LiHei Pro Medium', serif;
  }

  .title-div p {
    font-size: 16px;
    line-height: 4;
    color: black;
  }

  .label-list {
    padding: 10px 10px;
  }

  .label-ul {
    display: inline-block;
    margin: 10px;
  }

  .label-ul li {
    float: left;
    text-align: center;
  }

  .label-ul li a {
    font-size: 18px;
    font-family: "Microsoft YaHei", "微软雅黑", "Lantinghei SC", "Open Sans", Arial, "Hiragino Sans GB", "STHeiti", "WenQuanYi Micro Hei", SimSun, sans-serif;
    color: chartreuse;
    padding: 20px 15px;
    background-color: transparent;
    text-decoration: none;
    word-wrap: break-word;
  }
</style>
