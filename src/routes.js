import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('./pages/Dashboard'),
  loading: Loading,
});

const Plans = Loadable({
  loader: () => import('./pages/Plans'),
  loading: Loading,
});

const Offers = Loadable({
  loader: () => import('./pages/Offers'),
  loading: Loading,
});

const Requests = Loadable({
  loader: () => import('./pages/Requests'),
  loading: Loading,
});

const Request = Loadable({
  loader: () => import('./pages/Request/index'),
  loading: Loading,
});

const Operator = Loadable({
  loader: () => import('./pages/Operator'),
  loading: Loading,
});

const Profile = Loadable({
  loader: () => import('./pages/Profile'),
  loading: Loading,
});

const Chat = Loadable({
  loader: () => import('./pages/Chat'),
  loading: Loading,
});

const Logout = Loadable({
  loader: () => import('./pages/Logout'),
  loading: Loading,
});

const routes = [
  { path: '/', exact: true, name: 'Home', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/plans', name: 'Plans', component: Plans },
  { path: '/offers', name: 'Offers', component: Offers },
  { path: '/requests', name: 'Requests', component: Requests },
  { path: '/request/:id?', name: 'Request', component: Request },
  { path: '/operator', name: 'Operator', component: Operator },
  { path: '/chat', name: 'Chat', component: Chat },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/logout', name: 'Logout', component: Logout },
];

export default routes;
