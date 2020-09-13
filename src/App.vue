<template>
  <div id="app">
    <!-- <a-locale-provider :locale="locale"> -->
    <a-locale-provider>
      <router-view/>
    </a-locale-provider>
  </div>
</template>

<script>
// import enquireScreen from './utils/device'
// import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  name: 'App',
  data(){
    return {
      // locale: zhCN,
    }
  },
  created () {
    // let _this = this
    // enquireScreen(isMobile => {
    //   _this.$store.commit('setting/setDevice', isMobile)
    // })
  }
}
</script>
<style>
/* 全局表格样式 */
.ant-table-thead > tr > th {
  padding: 16px 4px !important;
}
.ant-table-tbody > tr > td {
  padding: 5px 4px !important;
  border: 1px solid #cac8c8;
}
</style>
<style lang="less">
  html,body {
    // width: 100%;
    // height: 100%;
  }
  #app{
    min-width: 1366px;
    min-height: 768px;
  }
  :global{
    //拖拽控件全局样式
    .dragable-ghost{
      border: 1px dashed #aaaaaa;
      opacity: 0.65;
    }
    .dragable-chose{
      border: 1px dashed #aaaaaa;
      opacity: 0.65;
    }
    .dragable-drag{
      border: 1px dashed #aaaaaa;
      opacity: 0.65;
    }
    //页面切换动画
    .page-toggle-enter-active{
      transition: all 0.2s ease-in 0.25s;
    }
    .page-toggle-leave-active{
      transition: all 0.2s ease-out 0s;
    }
    .page-toggle-enter, .page-toggle-leave-to{
      opacity: 0;
      padding: 0px;
    }
  }
</style>
