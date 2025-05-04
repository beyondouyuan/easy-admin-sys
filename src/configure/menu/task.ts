export default {
  path: '/task',
  name: 'task',
  view: 'task',
  parentPath: '/',
  redirect: '/task/personal',
  icon: '',
  order: 20,
  children: [
    {
      path: 'personal',
      name: 'personal',
      parentPath: '/task',
      icon: '',
    },
    {
      path: 'scan',
      name: 'scan',
      parentPath: '/task',
      icon: '',
    },
    {
      path: 'history',
      name: 'history',
      parentPath: '/task',
      icon: '',
    },
    {
      path: 'profile',
      name: 'profile',
      parentPath: '/task',
      icon: '',
    },
  ],
}
