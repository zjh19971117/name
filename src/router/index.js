import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import login from '@/components/login'
import citylist from '@/components/citylist'
import insertOrUpdate from '@/components/insertOrUpdate'
import userlist from '@/components/userlist'
import insertOrUpdatePerson from '@/components/insertOrUpdatePerson'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
    path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children:[
        {
          path:'/citylist',
          name:'citylist',
          component:citylist
        },
        {
          path:'/insertOrUpdate',
          name: 'insertOrUpdate',
          component:insertOrUpdate
        },
        {
          path:'/userlist',
          name: 'userlist',
          component:userlist
        },
        {
          path:'/insertOrUpdatePerson',
          name: 'insertOrUpdatePerson',
          component:insertOrUpdatePerson
        },
      ]
    },

  ]
})
