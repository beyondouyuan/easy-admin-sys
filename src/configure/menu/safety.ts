export default {
  path: '/safety',
  name: 'safety',
  parentPath: '/',
  redirect: '/safety/mandatory',
  icon: '',
  menu: true,
  order: 70,
  children: [
    {
      path: 'mandatory',
      name: 'mandatory',
      parentPath: '/safety',
      icon: '',
      menu: true,
    },
    {
      path: 'rule',
      name: 'rule',
      parentPath: '/safety',
      icon: '',
      menu: true,
    },
    {
      path: 'secret',
      name: 'secret',
      parentPath: '/safety',
      icon: '',
      menu: true,
    },
  ],
}
