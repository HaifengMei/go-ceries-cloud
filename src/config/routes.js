import Home from '../pages/Home'
import Pricing from '../pages/Pricing'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/pricing',
    component: Pricing
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/signup',
    component: Signup
  },
]
