import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import cases from '@/components/cases'
import function_page from '@/components/function_page'
import acting_choose from '@/components/Job_Study/acting_choose'
import hospitalNav from '@/components/hospitalNav'
import petdoctor_choose from '@/components/Job_Study/petdoctor_choose'
import test from '@/components/test/Test'
import assist_choose from '@/components/Job_Study/assist_choose'
import frontdesk_choose from '@/components/Job_Study/frontdesk_choose'
import fdstudy from '@/components/Study/fdstudy'
import petdoctorstudy from '@/components/Study/petdoctorstudy'
import asstudy from '@/components/Study/asstudy'

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
            path: '/job_studying/action',
            name: 'petdoctor_choose',
            component: petdoctor_choose
        },
    
        {
            path: '/test',
            name: 'Test',
            component: test
        },

        {
            path: '/job_studying/asaction',
            name: 'assist_choose',
            component: assist_choose
        },

        {
            path: '/job_studying/fdaction',
            name: 'frontdesk_choose',
            component: frontdesk_choose
        },

        {
            path: '/fdstudy',
            name: 'fdstudy',
            component: fdstudy
        },

        {
            path: '/petdoctorstudy',
            name: 'petdoctorstudy',
            component: petdoctorstudy
        },

        {
            path: '/asstudy',
            name: 'asstudy',
            component: asstudy
        }
    ]
})
