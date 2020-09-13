<style lang="less" scoped>
@import './Main.less';
@import './pages/property/addTodoNotice.less';
</style>
<style lang="less">
.notice-modal {
	width: 1000px !important;
}
</style>

<template>
  <div>
		<a-layout>
			<!-- 头部 -->
			<a-layout-header class="header" style="background:red;">
				<div class="head-left"><span @click="gotoHome()">HOMEX</span></div>
				<div class="head-center">
					<div class="head-center-back"><img src="../static/img/home.jpg"></div>
				</div>
				<div class="head-right">
					<div v-if="userInfo.userRole < 4 || userInfo.userRole > 5 " style="position:relative;float:left;padding-top:8px;" @click="isShowNotice = !isShowNotice">
						<a-badge :count="noticeTotal" :overflow-count="99" style="font-size:30px;">
							<a-icon type="bell" />
						</a-badge>
					</div>
					<div v-if="isShowNotice" class="head-right-icon-action">
						<div class="head-right-icon-message" @mouseleave="isShowNotice = false">
							<a-menu slot="overlay">
								<a-menu-item v-for="(notice, index) in noticeList" :key="index">
									<a href="javascript:;" @click="showNotice(notice)">
										<a-badge status="error" class="todo-list-badge" />
										<div class="todo-list-content">
											<div>{{ notice.time }}</div>
											<div :title="notice.content">{{ notice.subject }}</div>
										</div>
									</a>
								</a-menu-item>
							</a-menu>
						</div>
					</div>
					<!-- <img src="../static/img/message.jpg"> -->
					<img :src="userInfo.userAvtar || '../static/img/head_icon.png'" @click="isShow=!isShow">
					<div v-if="isShow" class="head-right-icon-action">
						<div class="head-right-icon-action-top">
							<div class="head-right-icon-action-top-left">
								<img v-if="userInfo.userAvtar" :src="userInfo.userAvtar">
								<img v-else src="../static/img/head_icon_black.svg">
							</div>
							<div class="head-right-icon-action-top-right">
								<p>{{ userInfo.userName }}</p>
								<p>{{ userInfo.userEmail }}</p>
								<a @click="gotoAccount()">Edit profile</a>
							</div>
						</div>
						<div class="head-right-icon-action-body">
							<a-menu slot="overlay">
								<a-menu-item v-if="userInfo.userRole == 4">
									<a href="javascript:;" @click="gotoAbout()">About condo</a>
								</a-menu-item>
								<a-menu-item>
									<a href="javascript:;" @click="singout">Sing out</a>
								</a-menu-item>
							</a-menu>
						</div>
					</div>
				</div>
			</a-layout-header>
			<a-layout class="bodyer">
				<a-layout-sider class="sider" width="100" style="background:red;">
				<a-menu theme="dark" style="background:red;" :defaultSelectedKeys="['1']" :selectedKeys="selectMenu" mode="inline" @click="onSelect">
					<a-menu-item v-for="menu in newMenus" :key="menu.key" class="sider-menu">
          	<!-- <a-icon v-if="menu.icon" :type="menu.icon" class="sider-menu-icon" /> -->
						<img v-if="menu.icon" v-bind:src="menu.icon" class="sider-menu-icon" />
						<p v-else>{{menu.name}}</p>
        	</a-menu-item>
				</a-menu>
      </a-layout-sider>
				<a-layout-content class="content">
					<router-view />
				</a-layout-content>
			</a-layout>
			<a-layout-footer class="footer">Copyright © 2019-2020 Want Home Inc. All rights reserved.</a-layout-footer>
		</a-layout>
		<a-modal class="notice-modal" v-model="isShowModal" title="Notice" :footer="null" @cancel="cancelShowNotice">
			<div class="add-back" style="padding:0">
				<div class="add-title">Notice</div>
				<a-row class="add-search">
					<a-col :span="11">
						<span class="add-search-label">Date:</span>
						<span class="add-search-content">{{ chooseNotice.time }}</span>
					</a-col>
					<a-col :span="1"></a-col>
					<a-col :span="12">
						<span class="add-search-label">To:</span>
						<div class="add-search-content" style="display:flex;align-items:center;">
							{{ chooseNotice.toTower || ' ' }} - {{ chooseNotice.toUnit || ' ' }}
						</div>
					</a-col>
				</a-row>
				<a-row class="add-search">
					<a-col :span="24">
						<span class="add-search-label">Subject:</span>
						<span class="add-search-content">{{ chooseNotice.subject }}</span>
					</a-col>
				</a-row>
				<div class="add-title">Content</div>
				<span class="add-content">{{ chooseNotice.content }}</span>
				<a-row class="add-search" style="margin-top:10px;">
					<a-col :span="24" :style="{ textAlign: 'right' }">
						<a-button type="primary" @click="cancelShowNotice">Close</a-button>
					</a-col>
				</a-row>
			</div>
		</a-modal>
  </div>
</template>

<script>
export default {
	data () {
		return {
			isShow: false,
      selectMenu: ['1'],
			newMenus: [],
      userInfo: {},
			isShowNotice: false,
			noticeList: [],
			noticeTotal: 0,

			isShowModal: false,
			chooseNotice: {},
		}
	},
	computed: {
		userInfo() {
			return JSON.parse(localStorage.getItem('userInfo'))
		},
		siderMenus() {
			let menus = JSON.parse(localStorage.getItem('siderMenus'))
			// let menus = this.$store.state.menu.siderMenus
			if (menus.length == 0) {
				this.$store.commit('setPath', '/login')
				this.$router.push('/login')
			} else {
				this.$store.commit('setPath', menus[0].path)
				this.$router.push(menus[0].path)
			}
			this.newMenus = JSON.parse(localStorage.getItem('siderMenus'))
			return JSON.parse(localStorage.getItem('siderMenus'))
		}
	},
	methods: {
		onSelect (obj, params) {
			this.newMenus.forEach((menu)=>{
				if (menu.key == obj.key) {
					this.selectMenu = [obj.key]
					if (params) {
						this.$router.push({'path': menu.path, query: {condo: params}})
					} else {
						this.$router.push(menu.path)
					}
          this.$store.commit('setPath', menu.path)
				}
			})
		},
		gotoHome() {
			// this.siderMenus = JSON.parse(localStorage.getItem('siderMenus'))
			// this.siderMenus = this.$store.state.menu.siderMenus
			this.newMenus = this.siderMenus
			this.onSelect(this.siderMenus[0])
		},
		gotoAccount() {
      let routerlist = []
      if (this.userInfo.userRole != 4) {
        routerlist = [
          {
            key: '1',
            path: '/other/account',
            icon: '',
            name: 'Account',
            meta: null,
            component: resolve => { require(['@/pages/other/account.vue'], resolve);},
            children: []
          },
        ]
      } else {
        routerlist = [
          {
            key: '1',
            path: '/other/account',
            icon: '',
            name: 'Account',
            meta: null,
            component: resolve => { require(['@/pages/other/account.vue'], resolve);},
            children: []
          },
          {
            key: '2',
            path: '/other/about',
            icon: '',
            name: 'About',
            meta: null,
            component: resolve => { require(['@/pages/other/about.vue'], resolve);},
            children: []
          }
        ]
      }
			this.isShow = false
			// localStorage.setItem('siderMenus', JSON.stringify(routerlist))
			this.newMenus = routerlist
			this.onSelect(routerlist[0])
			// this.$store.commit('setPath', '/other/account')
			// this.selectMenu = ['1']
			// this.$router.push('/other/account')
		},
		gotoAbout() {
      let routerlist = []
      if (this.userInfo.userRole > 5) {
        routerlist = [
          {
            key: '1',
            path: '/other/account',
            icon: '',
            name: 'Account',
            meta: null,
            component: resolve => { require(['@/pages/other/account.vue'], resolve);},
            children: []
          },
        ]
      } else {
        routerlist = [
          {
            key: '1',
            path: '/other/account',
            icon: '',
            name: 'Account',
            meta: null,
            component: resolve => { require(['@/pages/other/account.vue'], resolve);},
            children: []
          },
          {
            key: '2',
            path: '/other/about',
            icon: '',
            name: 'about',
            meta: null,
            component: resolve => { require(['@/pages/other/about.vue'], resolve);},
            children: []
          }
        ]
      }
			this.isShow = false
			this.newMenus = routerlist
			this.onSelect(routerlist[1])
			// this.$store.commit('setPath', '/other/about')
			// this.selectMenu = ['2']
			// this.$router.push('/other/about')
		},
		singout() {
			this.$cookie.set('userInfo', {
				userName: '',
				userAvtar: '',
				userEmail: '',
				userPhone: '',
				password: '',
				userRole: '',
			})
      this.$cookie.set('token', '')
      this.$store.commit('setPath', '/login')
			this.$router.push('/login')
		},
		// 获取notice
		getNoticeList() {
			let params = {
				userID: this.userInfo.userID
			}
			this.$http({
        url: this.$http.adornUrl('/dev-api/notice/getNotice'),
        method: 'get',
        params: this.$http.adornParams({...params})
      }).then((res) => {
        if (res.status == 200) {
          debugger;
					this.noticeList = []
					this.noticeTotal = res.data.result.noticeTotal
					this.noticeList = res.data.result.noticeList
        } else {
          this.logging = false
          this.$message.error(res.data.message)
        }
      })
		},
		showNotice(notice) {
			this.chooseNotice = notice
			this.isShowModal = true
		},
		cancelShowNotice() {
			this.chooseNotice = {}
			this.isShowModal = false
		},
	},
	created() {
		this.newMenus = this.siderMenus
  },
  mounted() {
		let _that = this
		this.getNoticeList()
    this.$bus.on('changeMenu', (path)=>{
      let currentRouters = path.split('/')
      let currentSelect = currentRouters[0] + '/' + currentRouters[1] + '/' + currentRouters[2]
      _that.siderMenus.forEach((menu)=>{
				if (menu.path == currentSelect) {
          _that.selectMenu = [menu.key]
					_that.$router.push(path)
				}
			})
		})
		this.$bus.on('gotoAbout', (condo)=>{
      let routerlist = [
				{
					key: '2',
					path: '/other/about',
					icon: '',
					name: 'about',
					meta: null,
					component: resolve => { require(['@/pages/other/about.vue'], resolve);},
					children: []
				}
			]
			this.isShow = false
			this.newMenus = routerlist
			this.onSelect(routerlist[0], condo)
		})
  },
  beforeDestroy() {
		this.$bus.off('changeMenu')
		this.$bus.off('gotoAbout')
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  },
}
</script>

