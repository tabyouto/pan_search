<template>
  <div class="index-page">
    <div class="col-md-12">
      <form class="cus-form">
        <div class="pull-left">
          <router-link to="/" class="logo">网盘搜索</router-link>
        </div>
        <div class="col-md-4 block-center">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search for..." v-model="content">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button" v-on:click="search">　搜索　</button>
            </span>
          </div><!-- /input-group -->
        </div>
      </form>
    </div>
    <div class="result">
      <p v-show="!result" class="text-center no-result">{{msg}}</p>
      <ol v-html="result">
      </ol>
    </div>
    <div class="page" id="pageintaion">
      <div v-html="page"></div>
    </div>
    <div class="page">
      <!--<nav aria-label="Page navigation">-->
      <!--<ul class="pagination">-->
      <!--<li v-bind:class="{disabled:nextPage==1}">-->
      <!--<a href="javascript:;" aria-label="Previous" v-on:click="goto('prev')">-->
      <!--<span aria-hidden="true">&laquo;</span>-->
      <!--</a>-->
      <!--</li>-->
      <!--<li v-bind:class="{active: index==nextPage}" v-for="{item,index} in pages"><a href="javascript:;"-->
      <!--v-on:click="goto(index)">{{index}}</a>-->
      <!--</li>-->
      <!--<li v-bind:class="{disabled:nextPage==pages.length || pages.length==0}">-->
      <!--<a href="javascript:;" aria-label="Next" v-on:click="goto('next')">-->
      <!--<span aria-hidden="true">&raquo;</span>-->
      <!--</a>-->
      <!--</li>-->
      <!--</ul>-->
      <!--</nav>-->
    </div>
  </div>
</template>

<script>
  import {search, specific} from '../common/commonAjax';
  import $ from 'jquery';
  export default {
    name: 'search',
    data () {
      return {
        content: sessionStorage.getItem('s'),
        storeContent: '', //保存查询目标
        result: '',
        nextPage: 1,
        page: '',
        pages: [],
        msg: '查询中...',
      }
    },
    methods: {
//      goto: function (index) {
//        let that = this;
//        var flag = false;
//        if (index != 'prev' && index != 'next') {
//          this.nextPage = index;
//          flag = true;
//        } else {
//          if (index == 'prev') {
//            if (this.nextPage !== 1) {
//              this.nextPage--;
//              flag = true;
//            } else {
//              flag = false;
//            }
//          } else {
//            if (this.pages.length > 0 && this.nextPage < this.pages.length) {
//              this.nextPage++;
//              flag = true;
//            } else {
//              flag = false;
//            }
//          }
//        }
//        flag && specific({
//          s: this.storeContent,
//          page: this.nextPage
//        }).then(function (res) {
//          if (res.data) {
//            that.result = res.data;
//            that.pages = [];
//            for (let i = 1; i <= res.page - 1; i++) {
//              that.pages.push({
//                index: i,
//              })
//            }
//            console.log(that.pages)
//          }
//        })
//      },
      search: function () {
        var that = this;
        that.storeContent = this.content;
        search({
          s: this.content
        }).then(function (res) {
          if (res.data) {
            that.result = res.data;
            that.page = res.pageH;
          }
        })
      }
    },
    mounted() {
      let that = this;
      let s = sessionStorage.getItem('s');
      if(!s) {
        this.$router.replace('/');
      }else {
        search({
          s: s
        }).then(function (res) {
          if (res.data) {
            that.result = res.data;
            that.page = res.pageH;
          }else {
            that.msg = '内容都被你看光啦，木有啦';
          }
        })
      }
      $(document).ready(function () {
        $('#pageintaion').on('click', 'a', function (e) {
          e.preventDefault();
//          that.result = $(this).attr('href').split('&');
          var arr = $(this).attr('href') && $(this).attr('href').split('&');
          var obj = {};
          var tmp = '';
          arr && arr.forEach(function (item) {
            tmp = item.split('=');
            obj[tmp[0]] = tmp[1];
          });
          arr && specific({
            s: that.storeContent,
            page: obj.first
          }).then(function (res) {
              that.result = res.data;
              that.page = res.pageH;
              res.data || (that.msg = '内容都被你看光啦，木有啦');
        });
      });
    }
  )


  }
  }
</script>

<style lang="less">
  .logo {
    padding: 7px 0;
    display: inline-block;
  }
  .b_hide {
    display: none;
  }
  h2 {
     font-size: 18px!important;
     a {

     }
   }

  .result {
    width: 588px;
    padding-top: 74px;
    margin-left: 20px;
    li {
      list-style: none;
    }
    .b_algo {
      padding: 12px 20px 0;
    }
    p,cite {
      word-wrap: break-word;
    }
    cite {
      font-style: normal;
      font-size: 14px;
      color: #006d21;
    }
  }
  #pageintaion {
    list-style: none;
    overflow: hidden;
    padding: 35px 48px;
    margin-left: 20px;
    li {
      display: inline-block;
      margin-right: 5px;
      a {
        text-decoration: none;
        border-radius: 50%;
        text-align: center;
        width: 45px;
        height: 45px;
        line-height: 45px;
        display: inline-block;
        &:hover {
          background-color: rgba(221, 221, 221, 0.52);
        }
      }
      .sb_pagS {
        border: 2px solid #ddd;
      }
      .sb_pagP,
      .sb_pagN{
        border:none;
        padding: 0;
        &:hover {
          background-color: transparent;
        }
      }
    }
  }
  .index-page {
    .col-md-12 {
      padding: 0;
    }
  }
  .cus-form {
    overflow: hidden;
    background-color: #fafafa;
    padding: 20px 10px;
    input {
      box-shadow: none;
      &:focus {
        box-shadow: none;
      }
    }
  }
  .no-result {
    padding-top: 20px;
  }

</style>
