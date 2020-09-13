<!--
 * @Author: your name
 * @Date: 2020-07-07 17:58:20
 * @LastEditTime: 2020-07-15 19:34:42
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \asocloud-web-customer\src\pages\property\form.vue
--> 
<style lang="less" scoped>
@import './property.less';
</style>
<template>
  <div>
    <a-card class="board-card">
      <div class="board-card-body">
        <a-row class="board-card-body-row">
          <div class="board-card-body-logo" v-for="(logo,index) in formLogos" :key="index" @click="gotoForm(logo)">
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
  data () {
    return {
      showMenu: true,
      formLogos: [
        {icon: '/static/img/move_in.png', title: 'Move In', path: 'movein'},
        {icon: '/static/img/move_out.svg', title: 'Move Out', path: 'moveout'},
        {icon: '/static/img/maintenance.svg', title: 'Maintenance', path: 'maintenance'},
        {icon: '/static/img/work_permit.svg', title: 'Work Permit', path: 'workpermit'},
        {icon: '/static/img/gate_pass.svg', title: 'Gate Pass', path: 'gatepass'},
        {icon: '/static/img/complaint.svg', title: 'Complaint', path: 'complaint'},
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
    gotoForm(logo) {
      if (logo.path) {
        this.showMenu = false
        let path = '/property/form/' + logo.path
        this.$store.commit('setPath', path)
        this.$router.push(path)
      }
    },
  },
  created() {
    const path = this.$store.state.menu.path
    let subPath = path.split('/property/form')[1]
    if (subPath) {
      this.showMenu = false
    }
  }
}
</script>
