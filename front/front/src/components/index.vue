<template>
  <div class="index-page">
    <div class="center-block center-s">
      <h1 class="text-center">网盘搜</h1>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Search for..." v-model="content">
        <span class="input-group-btn"><button class="btn btn-default" type="button" v-on:click="search">　搜索　</button></span>
      </div><!-- /input-group -->
    </div>
  </div>
</template>

<script>
  import {search, specific} from '../common/commonAjax';
  import $ from 'jquery';
  export default {
    name: 'index',
    data () {
      return {
        content: '',
        storeContent: '', //保存查询目标
        result: '',
        nextPage: 1,
        page: '',
        pages: [],
      }
    },
    methods: {
      search: function () {
        sessionStorage.setItem('s',this.content);
        this.$router.push({'path': '/s'});
      }
    },
    mounted() {
      let that = this;
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
        });
      });
    }
  )


  }
  }
</script>

<style lang="less">
  .center-s{
    margin-top: 200px;
    width: 632px;
    max-width: 632px;
    h1 {
      font-size: 24px;
      font-style: normal;
      font-weight: normal;
    }
  }

</style>
