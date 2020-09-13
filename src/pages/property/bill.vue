<style lang="less" scoped>
@import './property.less';
</style>
<template>
  <div>
    <a-card class="board-card">
      <div class="board-card-body">
        <a-row class="board-card-body-row">
          <div class="board-card-body-logo" v-for="(logo,index) in formLogos" :key="index" style="cursor:default;" @click="gotoForm(logo)">
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
        {icon: '/static/img/assc_dues.svg', title: 'Assc Dues', path: 'asscdues'},
        {icon: '/static/img/water.svg', title: 'Water', path: 'water'},
        {icon: '/static/img/internet.svg', title: 'Internet', path: 'internet'},
        {icon: '/static/img/electricity.svg', title: 'Electricity', path: 'electricity'},
        {icon: '/static/img/car_parking.svg', title: 'Car Parking', path: 'carparking'}     
      ],
    }
  },
  watch: {
    currentPath: function(val, oldval) {
      if (val == '/property/bill') {
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
      // if (logo.path) {
      //   this.showMenu = false
      //   let path = '/property/bill/' + logo.path
      //   this.$store.commit('setPath', path)
      //   this.$router.push(path)
      // }
    },
  },
  created() {
    const path = this.$store.state.menu.path
    let subPath = path.split('/property/bill')[1]
    if (subPath) {
      this.showMenu = false
    }
  }
}
</script>

