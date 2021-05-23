<template>
  <div>
    <my-header></my-header>
    <section class="container">
      <div class="content-wrap">
        <div class="content">
          <header class="article-header">
            <h1 class="article-title">
              <a href="#" :title="contentDetail.title">{{contentDetail.title}}</a>
            </h1>
            <div class="article-meta">
              <span class="item article-meta-time">
                <time class="time" data-toggle="tooltip" data-placement="bottom" title=""
                      :data-original-title="contentDetail.createTime">
                  <i class="glyphicon glyphicon-time"></i>{{contentDetail.createTime}}
                </time>
              </span>
              <span class="item article-meta-source" data-toggle="tooltip" data-placement="bottom" title=""
                    :data-original-title="contentDetail.source">
                <i class="glyphicon glyphicon-globe"></i>{{contentDetail.source}}
              </span>
              <span class="item article-meta-category" data-toggle="tooltip" data-placement="bottom" title=""
                    :data-original-title="contentDetail.typeName">
                <i class="glyphicon glyphicon-list"></i>
                <a href="#" title="MZ-NetBlog主题">{{contentDetail.typeName}}</a>
              </span>
              <span class="item article-meta-views" data-toggle="tooltip" data-placement="bottom" title=""
                    :data-original-title="contentDetail.readNum">
                <i class="glyphicon glyphicon-eye-open"></i>{{contentDetail.readNum}}
              </span>
              <span class="item article-meta-comment" data-toggle="tooltip" data-placement="bottom" title=""
                    :data-original-title="contentDetail.remarkNum">
                <i class="glyphicon glyphicon-comment"></i>{{contentDetail.remarkNum}}
              </span>
            </div>
          </header>
          <article class="markdown-body">
            <p>
              <img :data-original="contentDetail.images" :src="contentDetail.images" alt=""/>
            </p>
            <div v-html="contentDetail.content"></div>
            <div class="bdsharebuttonbox">
              <a href="#" class="bds_more" data-cmd="more"></a>
              <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
              <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
              <a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
              <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
              <a href="#" class="bds_tieba" data-cmd="tieba" title="分享到百度贴吧"></a>
              <a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>
            </div>
          </article>
          <div class="article-tags">
            <ul class="labels-ul">
              <span>标签：</span>
              <li v-for="(item,key) in labels" :key="key">
                <a href="#" rel="tag">{{item}}</a>
              </li>
            </ul>
          </div>
          <br><br>
          <div class="title" id="comment">
            <h3>评论</h3>
          </div>
          <div id="respond">
            <form id="comment-form" name="comment-form" action="#">
              <div class="comment">
                <input v-model="remark.nickname" class="form-control" size="22" placeholder="您的昵称（必填）" maxlength="15"
                       autocomplete="off" tabindex="1" type="text">
                <input v-model="remark.url" class="form-control" size="22" placeholder="您的网址（非必填）" maxlength="58"
                       autocomplete="off" tabindex="2" type="text">
                <input v-model="remark.email" class="form-control" size="22" placeholder="您的邮箱（非必填）" maxlength="58"
                       autocomplete="off" tabindex="2" type="text">
                <div class="comment-box">
                <textarea v-model="remark.comment" placeholder="您的评论或留言（必填）" name="comment-textarea"
                          id="comment-textarea" cols="100%" rows="3"
                          tabindex="3"></textarea>
                  <div class="comment-ctrl">
                    <div class="comment-prompt" style="display: none;" ref="commentPrompt">
                      <i class="fa fa-spin fa-circle-o-notch"></i>
                      <span class="comment-prompt-text">评论正在提交中...请稍后</span>
                    </div>
                    <div class="comment-success" style="display: none;" ref="commentSuccess">
                      <i class="fa fa-check"></i>
                      <span class="comment-prompt-text">评论提交成功...</span>
                    </div>
                    <button @click="getRemark(contentDetail.id)" name="comment-submit" id="comment-submit" tabindex="4">
                      评论
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div id="postcomments">
            <ol id="comment_list" class="commentlist">
              <li class="comment-content" v-for="(item,key) in remarks" :key="key">
                <span class="comment-f">#{{key+1}}</span>
                <div class="comment-main">
                  <p>
                    <a class="address" :href="'mailto:'+item.email" rel="nofollow" target="_blank">{{item.nickname}}</a>
                    <span class="time">{{item.create_time}}</span>
                    <br> {{item.comment}}
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <my-right></my-right>
    </section>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import Header from "./comment/Header";
  import Footer from "./comment/Footer";
  import RightSidebar from "./comment/RightSidebar";

  export default {
    name: "Content",
    data() {
      return {
        contentDetail: {},
        remarks: [],
        labels: [],
        remark: {
          nickname: '',
          email: '',
          url: '',
          comment: '',
        }
      }
    },
    mounted() {
      this.content();
    },
    methods: {
      content(contentId) {
        let cid = this.$route.params.cid || contentId;
        this.$axios.get("/api/font/content/" + cid).then(res => {
          if (res.status) {
            console.log(res.data.data);
            let {content, remarks} = res.data.data;
            this.contentDetail = content;
            this.remarks = remarks;
            if (content.labels.indexOf(';') > -1) this.labels = content.labels.split(';');
          }
        })
      },
      getRemark(cid) {
        let remark = this.remark;
        remark.contentId = cid;
        this.$axios.post("/api/font/remark/create", remark).then(res => {
          this.content(cid);
        });
      },
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
  .content {
    padding: 0 20px;
    background-color: #fff;
    border: 1px solid #EAEAEA;
    border-radius: 4px;
  }

  .labels-ul {
    margin-left: 20%;
  }

  .labels-ul span {
    float: left;
  }

  .labels-ul li {
    float: left;
  }
</style>
