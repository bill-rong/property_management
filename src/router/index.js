import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import AdminHome from '../views/AdminHome.vue'
import Personal from '../views/components/user/personal/PersonalCenter.vue'
import AdminPersonal from '../views/components/admin/personal/PersonalCenter.vue'
import index from '../views/components/user/index.vue'
import ReportRepair from '../views/components/user/repair/Report.vue'
import RepairInfo from '../views/components/user/repair/Info.vue'
import Payment from '../views/components/user/pay/Payment.vue'
import PaymentInfo from '../views/components/user/pay/PaymentInfo.vue'
import Initiate from '../views/components/user/complaint/Initiate.vue'
import ComplaintInfo from '../views/components/user/complaint/ComplaintInfo.vue'
import AdminIndex from '../views/components/admin/index.vue'
import CommunityManage from '../views/components/admin/community/CommunityManage.vue'
import RoomManage from '../views/components/admin/community/RoomManage.vue'
import ParkingManage from '../views/components/admin/community/ParkingManage.vue'
import RepairManage from '../views/components/admin/business/RepairManage.vue'
import ComplaintManage from '../views/components/admin/business/ComplaintManage.vue'
import PaymentManage from '../views/components/admin/business/payment.vue'
import ResidentList from '../views/components/admin/resident/ResidentList.vue'
import PetList from '../views/components/admin/resident/PetList.vue'
import Announcement from '../views/components/admin/affairs/Announcement.vue'
import Healthy from '../views/components/admin/affairs/Healthy.vue'
import Visitor from '../views/components/admin/affairs/Visitor.vue'
import UserManage from '../views/components/admin/system/UserManage.vue'
import AdminManage from '../views/components/admin/system/AdminManage.vue'
import PetCommit from '../views/components/user/PersonalBusiness/PetCommit.vue'
import VisitorCommit from '../views/components/user/PersonalBusiness/VisitorCommit.vue'
import HealthCommit from '../views/components/user/PersonalBusiness/HealthCommit.vue'
import Family from '../views/components/user/PersonalBusiness/Family.vue'


Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        name: 'index',
        component: index
      },
      {
        path: 'reportRepair',
        name: 'reportRepair',
        component: ReportRepair
      },
      {
        path: 'repairInfo',
        name: 'repairInfo',
        component: RepairInfo
      },
      {
        path: 'payment',
        name: 'payment',
        component: Payment
      },
      {
        path: 'paymentInfo',
        name: 'paymentInfo',
        component: PaymentInfo
      },
      {
        path: 'initiate',
        name: 'initiate',
        component: Initiate
      },
      {
        path: 'complaintInfo',
        name: 'complaintInfo',
        component: ComplaintInfo
      },
      {
        path: 'personal',
        name: 'personal',
        component: Personal
      },
      {
        path: 'petCommit',
        name: 'petCommit',
        component: PetCommit
      },
      {
        path: 'healthCommit',
        name: 'healthCommit',
        component: HealthCommit
      },
      {
        path: 'visitorCommit',
        name: 'visitorCommit',
        component: VisitorCommit
      },
      {
        path: 'family',
        name: 'family',
        component: Family
      }
    ]
  },
  {
    path: '/adminHome',
    name: 'adminHome',
    component: AdminHome,
    children: [
      {
        path: '',
        name: 'adminIndex',
        component: AdminIndex
      },
      {
        path: 'adminPersonal',
        name: 'adminPersonal',
        component: AdminPersonal
      },
      {
        path: 'communityManage',
        name: 'communityManage',
        component: CommunityManage
      },
      {
        path: 'roomManage',
        name: 'roomManage',
        component: RoomManage
      },
      {
        path: 'parkingManage',
        name: 'parkingManage',
        component: ParkingManage
      },
      {
        path: 'repairManage',
        name: 'repairManage',
        component: RepairManage
      },
      {
        path: 'complaintManage',
        name: 'complaintManage',
        component: ComplaintManage
      },
      {
        path: 'paymentManage',
        name: 'paymentManage',
        component: PaymentManage
      },
      // {
      //   path: 'paymentList',
      //   name: 'paymentList',
      //   component: PaymentList
      // },
      {
        path: 'residentList',
        name: 'residentList',
        component: ResidentList
      },
      {
        path: 'petList',
        name: 'petList',
        component: PetList
      },
      {
        path: 'announcement',
        name: 'announcement',
        component: Announcement
      },
      {
        path: 'visitor',
        name: 'visitor',
        component: Visitor
      },
      {
        path: 'healthy',
        name: 'healthy',
        component: Healthy
      },
      {
        path: 'userManage',
        name: 'userManage',
        component: UserManage
      },
      {
        path: 'adminManage',
        name: 'adminManage',
        component: AdminManage
      },
    ]
  },
  {
    path: '/test',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
