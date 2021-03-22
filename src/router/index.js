import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import cases from '@/components/cases'
import function_page from '@/components/function_page'
import acting_choose from '@/components/Job_Study/acting_choose'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },

    {
        path: '/cases',
        name: 'cases',
        component: cases
    },

    {
        path: '/function_page',
        name: 'function_page',
        component: function_page
    },

    {
        path: '/job_studying',
        name: 'acting_choose',
        component: acting_choose
    }
  ]
})
