/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import News from '~/pages/News'
import About from '~/pages/About'
import Detail from '~/pages/Detail'
import Home from '~/pages/Home'
import Contact from '~/pages/Contact'
import Login from '~/pages/Login'
import Layout from '~/pages/Layout'
import Profile from '~/pages/private/Profile'
import ProtectedLayout from '~/pages/private/ProtectedLayout'
import FilmManagement from '~/pages/private/FilmManagement'

export const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/detail/:id',
        component: Detail
      },
      {
        path: '/about',
        component: About
      },
      {
        path: '/news',
        component: News
      },
      {
        path: '/contact',
        component: Contact
      },
      {
        path: '/profile',
        component: ProtectedLayout,
        childrens: [
          {
            path: '/profile',
            component: Profile
          }
        ]
      },
      {
        path: '/management',
        component: ProtectedLayout,
        childrens: [
          {
            path: '/management',
            component: FilmManagement
          }
        ]
      }
    ]
  }
]
