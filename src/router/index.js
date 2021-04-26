import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import cases from '@/components/cases'
import function_page from '@/components/function_page'
import acting_choose from '@/components/Job_Study/acting_choose'
import hospitalNav from '@/components/hospitalNav'
import check from '@/components/rooms/check'
import deal from '@/components/rooms/deal'
import diagnose from '@/components/rooms/diagnose'
import document from '@/components/rooms/document'
import drug from '@/components/rooms/drug'
import examine from '@/components/rooms/examine'
import film from '@/components/rooms/film'
import frontdesk from '@/components/rooms/frontdesk'
import immusion from '@/components/rooms/immusion'
import inject from '@/components/rooms/inject'
import operation from '@/components/rooms/operation'
import prepare from '@/components/rooms/prepare'
import speciality from '@/components/rooms/speciality'
import stay from '@/components/rooms/stay'

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
    },

    {
        path: '/hospitalNav',
        name: 'hospital_nav',
        component: hospitalNav
    },
    
    {
        path: '/rooms/check',
        name: 'check',
        component: check
    },
    
    {
        path: '/rooms/deal',
        name: 'deal',
        component: deal
    },
    
    {
        path: '/rooms/diagnose',
        name: 'diagnose',
        component: diagnose
    },
    
    {
        path: '/rooms/document',
        name: 'document',
        component: document
    },
    
    {
        path: '/rooms/drug',
        name: 'drug',
        component: drug
    },
    
    {
        path: '/rooms/examine',
        name: 'examine',
        component: examine
    },
    
    {
        path: '/rooms/film',
        name: 'film',
        component: film
    },
    
    {
        path: '/rooms/frontdesk',
        name: 'frontdesk',
        component: frontdesk
    },
    
    {
        path: '/rooms/immusion',
        name: 'immusion',
        component: immusion
    },
    
    {
        path: '/rooms/inject',
        name: 'inject',
        component: inject
    },
    
    {
        path: '/rooms/operation',
        name: 'operation',
        component: operation
    },
    
    {
        path: '/rooms/prepare',
        name: 'prepare',
        component: prepare
    },
    
    {
        path: '/rooms/speciality',
        name: 'speciality',
        component: speciality
    },
    
    {
        path: '/rooms/stay',
        name: 'stay',
        component: stay
    }
  ]
})
