import Main from '../Main.vue';
import Router from 'vue-router'
import NotFound from '@/pages/exception/404'

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: resolve => {
    require(['@/pages/login/login.vue'], resolve);
  }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const mainRouter = {
  path: '/',
  name: 'mainRouter',
  component: Main
};

export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: NotFound
};

export const appRouter = [
  {
    path: '/other',
    icon: '',
    name: 'other',
    title: '',
    component: Main,
    children: [
      {
        path: '/other/account',
        icon: 'account',
        name: 'account',
        title: 'account',
        meta: {
            parent: '',
            title: 'account'
        },
        component: resolve => { require(['@/pages/other/account.vue'], resolve); }
      },
      { 
        path: '/other/about',
        icon: 'about',
        name: 'about',
        title: 'about',
        meta: {
          parent: '',
          title: 'about'
        },
        component: resolve => { require(['@/pages/other/about.vue'], resolve);},
      }
    ]
  },  
  {
    path: '/company',
    icon: '',
    name: 'company',
    title: '',
    component: Main,
    children: [
      {
        path: '/company/condo',
        icon: 'container',
        name: 'condo',
        title: '管理公寓',
        meta: {
            parent: '',
            title: '管理公寓'
        },
        component: resolve => { require(['@/pages/company/condoManage.vue'], resolve); }
      },
      { 
        path: '/company/addcondo',
        icon: 'container',
        name: 'addcondo',
        title: '添加公寓',
        meta: {
          parent: '',
          title: '添加公寓'
        },
        component: resolve => { require(['@/pages/company/addcondo.vue'], resolve);},
        children: []
      }
    ]
  },
  {
    path: '/property',
    icon: '',
    name: 'property',
    title: '',
    component: Main,
    children: [
      { 
        path: '/property/addtodo',
        icon: '',
        name: 'addtodo',
        title: 'addtodo',
        meta: {
          parent: '',
          title: 'addtodo'
        },
        component: resolve => { require(['@/pages/property/addTodo.vue'], resolve);},
        children: []
      },
      { 
        path: '/property/addnotice',
        icon: '',
        name: 'addnotice',
        title: 'addnotice',
        meta: {
          parent: '',
          title: 'addnotice'
        },
        component: resolve => { require(['@/pages/property/addNotice.vue'], resolve);},
        children: []
      },
      { 
        path: '/property/dashboard',
        icon: 'dashboard',
        name: 'dashboard',
        title: '仪表盘',
        meta: {
          parent: '',
          title: '仪表盘'
        },
        component: resolve => { require(['@/pages/property/dashboard.vue'], resolve);},
        children: []
      },
      { 
        path: '/property/condo',
        icon: 'container',
        name: 'condo',
        title: '物业管理房间',
        meta: {
          parent: '',
          title: '物业管理房间'
        },
        component: resolve => { require(['@/pages/property/condo.vue'], resolve);},
        children: [
          { 
            path: '/property/condo/condodetail',
            icon: '',
            name: 'condoDetail',
            title: 'condoDetail',
            meta: {
              parent: '',
              title: 'condoDetail'
            },
            component: resolve => { require(['@/pages/property/condo/condoDetail.vue'], resolve);},
            children: []
          },
          { 
            path: '/property/condo/condoimport',
            icon: '',
            name: 'condoImport',
            title: 'condoImport',
            meta: {
              parent: '',
              title: 'condoImport'
            },
            component: resolve => { require(['@/pages/property/condo/condoImport.vue'], resolve);},
            children: []
          },
        ]
      },
      { 
        path: '/property/form',
        icon: 'file-text',
        name: 'form',
        title: '表单',
        meta: {
          parent: '',
          title: '表单'
        },
        component: resolve => { require(['@/pages/property/form.vue'], resolve);},
        children: [
          { 
            path: '/property/form/movein',
            icon: '',
            name: 'movein',
            title: 'movein',
            meta: {
              parent: '',
              title: 'movein'
            },
            component: resolve => { require(['@/pages/property/form/moveIn.vue'], resolve);},
            children: []
          },
          { 
            path: '/property/form/moveout',
            icon: '',
            name: 'moveout',
            title: 'moveout',
            meta: {
              parent: '',
              title: 'moveout'
            },
            component: resolve => { require(['@/pages/property/form/moveOut.vue'], resolve);},
            children: []
          },
          { 
            path: '/property/form/maintenance',
            icon: '',
            name: 'maintenance',
            title: 'maintenance',
            meta: {
              parent: '',
              title: 'maintenance'
            },
            component: resolve => { require(['@/pages/property/form/maintenance.vue'], resolve);},
            children: []
          },
          { 
            path: '/property/form/workpermit',
            icon: '',
            name: 'workpermit',
            title: 'workpermit',
            meta: {
              parent: '',
              title: 'workpermit'
            },
            component: resolve => { require(['@/pages/property/form/workPermit.vue'], resolve);},
            children: []
          },
          { 
            path: '/property/form/gatepass',
            icon: '',
            name: 'gatepass',
            title: 'gatepass',
            meta: {
              parent: '',
              title: 'gatepass'
            },
            component: resolve => { require(['@/pages/property/form/gatePass.vue'], resolve);},
            children: []
          },
          { 
            path: '/property/form/complaint',
            icon: '',
            name: 'complaint',
            title: 'complaint',
            meta: {
              parent: '',
              title: 'complaint'
            },
            component: resolve => { require(['@/pages/property/form/complaint.vue'], resolve);},
            children: []
          },
          { 
            path: '/property/form/answer',
            icon: '',
            name: 'answer',
            title: 'answer',
            meta: {
              parent: '',
              title: 'answer'
            },
            component: resolve => { require(['@/pages/property/form/answer.vue'], resolve);},
            children: []
          },
          { 
            path: '/property/form/addcomplaint',
            icon: '',
            name: 'addcomplaint',
            title: 'addcomplaint',
            meta: {
              parent: '',
              title: 'addcomplaint'
            },
            component: resolve => { require(['@/pages/property/form/addComplaint.vue'], resolve);},
            children: []
          }
        ]
      },
      { 
        path: '/property/bill',
        icon: 'calculator',
        name: 'bill',
        title: '账单',
        meta: {
          parent: '',
          title: '账单'
        },
        component: resolve => { require(['@/pages/property/bill.vue'], resolve);},
        children: [
          { 
            path: '/property/bill/internet',
            icon: '',
            name: 'internet',
            title: 'internet',
            meta: {
              parent: '',
              title: 'internet'
            },
            component: resolve => { require(['@/pages/property/bill/internet.vue'], resolve);},
            children: []
          },
          { 
            path: '/property/bill/electricity',
            icon: '',
            name: 'electricity',
            title: 'electricity',
            meta: {
              parent: '',
              title: 'electricity'
            },
            component: resolve => { require(['@/pages/property/bill/electricity.vue'], resolve);},
            children: []
          },
          { 
            path: '/property/bill/carparking',
            icon: '',
            name: 'carparking',
            title: 'carparking',
            meta: {
              parent: '',
              title: 'carparking'
            },
            component: resolve => { require(['@/pages/property/bill/carParking.vue'], resolve);},
            children: []
          },
          { 
            path: '/property/bill/water',
            icon: '',
            name: 'water',
            title: 'water',
            meta: {
              parent: '',
              title: 'water'
            },
            component: resolve => { require(['@/pages/property/bill/water.vue'], resolve);},
            children: []
          },
          { 
            path: '/property/bill/asscdues',
            icon: '',
            name: 'asscdues',
            title: 'asscdues',
            meta: {
              parent: '',
              title: 'asscdues'
            },
            component: resolve => { require(['@/pages/property/bill/asscDues.vue'], resolve);},
            children: []
          },
        ]
      },
      { 
        path: '/property/personnel',
        icon: 'usergroup-add',
        name: 'personnel',
        title: '个人管理',
        meta: {
          parent: '',
          title: '个人管理'
        },
        component: resolve => { require(['@/pages/property/personnel.vue'], resolve);},
        children: [
          { 
            path: '/property/personnel/reception',
            icon: '',
            name: 'reception',
            title: 'reception',
            meta: {
              parent: '',
              title: 'reception'
            },
            component: resolve => { require(['@/pages/property/personnel/reception.vue'], resolve);},
            children: []
          },
          { 
            path: '/property/personnel/blacklist',
            icon: '',
            name: 'blacklist',
            title: 'blacklist',
            meta: {
              parent: '',
              title: 'blacklist'
            },
            component: resolve => { require(['@/pages/property/personnel/blacklist.vue'], resolve);},
            children: []
          },
          { 
            path: '/property/personnel/addreception',
            icon: '',
            name: 'addreception',
            title: 'addreception',
            meta: {
              parent: '',
              title: 'addreception'
            },
            component: resolve => { require(['@/pages/property/personnel/addReception.vue'], resolve);},
            children: []
          },
          { 
            path: '/property/personnel/addblacklist',
            icon: '',
            name: 'addblacklist',
            title: 'addblacklist',
            meta: {
              parent: '',
              title: 'addblacklist'
            },
            component: resolve => { require(['@/pages/property/personnel/addBlacklist.vue'], resolve);},
            children: []
          },
        ]
      }
    ]
  },
  {
    path: '/owner',
    icon: '',
    name: 'owner',
    title: '',
    component: Main,
    children: [
      { 
        path: '/owner/condo',
        icon: '',
        name: 'condo',
        title: 'condo',
        meta: {
          parent: '',
          title: 'condo'
        },
        component: resolve => { require(['@/pages/owner/condo.vue'], resolve);},
        children: [
          { 
            path: '/owner/condo/ownerdetail',
            icon: '',
            name: 'ownerDetail',
            title: 'ownerDetail',
            meta: {
              parent: '',
              title: 'ownerDetail'
            },
            component: resolve => { require(['@/pages/owner/ownerDetail.vue'], resolve);},
            children: []
          },
          { 
            path: '/owner/condo/tenantdetail',
            icon: '',
            name: 'tenantDetail',
            title: 'tenantDetail',
            meta: {
              parent: '',
              title: 'tenantDetail'
            },
            component: resolve => { require(['@/pages/owner/tenantDetail.vue'], resolve);},
            children: []
          },
        ]
      }
    ]
  }
]

// 所有上面定义的路由都要写在下面的routers里
export const constantRoutes = [
  loginRouter,
  mainRouter,
  ...appRouter,
  page404
];
// export const routers = new Router({
//   routes: constantRoutes
// })
