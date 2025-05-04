export default {
  path: '/signboard',
  name: 'signboard',
  parentPath: '/',
  redirect: '/signboard/system',
  order: 10,
  children: [
    {
      path: 'system',
      name: 'system',
      parentPath: '/signboard',
    },
    {
      path: 'cockpit',
      name: 'cockpit',
      parentPath: '/signboard',
    },
    {
      path: 'printed',
      name: 'printed',
      parentPath: '/signboard',
    },
    {
      path: 'device',
      name: 'device',
      parentPath: '/signboard',
    },
  ],
}
