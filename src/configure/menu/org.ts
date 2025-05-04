export default {
  path: '/org',
  name: 'org',
  parentPath: '/',
  redirect: '/org/department',
  icon: '',
  order: 40,
  children: [
    {
      path: 'department',
      name: 'department',
      parentPath: '/org',
      icon: '',
    },
    {
      path: 'role',
      name: 'role',
      parentPath: '/org',
      icon: '',
    },
    {
      path: 'enterprise',
      name: 'enterprise',
      parentPath: '/org',
      icon: '',
    },
    {
      path: 'sync',
      name: 'sync',
      parentPath: '/org',
      redirect: '/org/sync/ad',
      icon: '',
      children: [
        {
          path: 'ad',
          name: 'ad',
          parentPath: '/org/sync',
          icon: '',
        },
      ],
    },
  ],
}
