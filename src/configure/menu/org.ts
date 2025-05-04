export default {
  path: '/org',
  name: 'org',
  parentPath: '/',
  redirect: '/org/department',
  icon: '',
  menu: true,
  order: 40,
  children: [
    {
      path: 'department',
      name: 'department',
      parentPath: '/org',
      icon: '',
      menu: true,
    },
    {
      path: 'role',
      name: 'role',
      parentPath: '/org',
      icon: '',
      menu: true,
    },
    {
      path: 'enterprise',
      name: 'enterprise',
      parentPath: '/org',
      icon: '',
      menu: true,
    },
    {
      path: 'sync',
      name: 'sync',
      parentPath: '/org',
      redirect: '/org/sync/ad',
      icon: '',
      menu: true,
      children: [
        {
          path: 'ad',
          name: 'ad',
          parentPath: '/org/sync',
          icon: '',
          menu: true,
        },
      ],
    },
  ],
}
