<style lang="less" scoped>
@import './property.less';
</style>
<template>
  <div>
    <a-card class="board-card">
      <div class="board-card-body">
        <a-row class="board-card-body-row">
          <div class="board-card-body-logo" v-for="(logo,index) in personnelLogos" :key="index" @click="gotoPersonnel(logo)" :style="{cursor:(logo.path)?'pointer':'default'}">
            <img v-bind:src="logo.icon">
            <p>{{ logo.title }}</p>
          </div>
        </a-row>
      </div>
    </a-card>
    <router-view v-if="!showMenu" style="position:absolute;top:64px;left:100px;right:0px;bottom:64px;background:white;overflow:auto;"></router-view>
  </div>
</template>

<script>
export default {
  name: 'personnel',
  data () {
    return {
      showMenu: true,
      personnelLogos: [
        {icon: '/static/img/reception.jpg', title: 'Reception', path: 'reception'},
        {icon: '/static/img/janitor.png', title: 'Janitor', path: ''},
        {icon: '/static/img/security.png', title: 'Security', path: ''},
        {icon: '/static/img/blacklist.svg', title: 'Blacklist', path: 'blacklist'},
      ],
    }
  },
  watch: {
    currentPath: function(val, oldval) {
      if (val == '/property/form') {
        this.showMenu = true
      }
    }
  },
  computed: {
    currentPath() {
      return this.$store.state.menu.path
    }
  },
  methods: {
    gotoPersonnel(logo) {
      if (logo.path) {
        this.showMenu = false
        let path = '/property/personnel/' + logo.path
        this.$store.commit('setPath', path)
        this.$router.push(path)
      }
    },
  },
  created() {

  }
}
</script>
