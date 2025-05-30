// 路由
export default {
  dashboard: '首页',
  demo: {
    title: '示例',
    table: 'EasyTable',
    'api-table': 'ApiEasyTable',
    form: 'EasyFrom',
    search: 'EasySearch',
    'api-search': 'ApiEasySearch',
  },
  signboard: {
    title: '看板',
    system: '系统看板',
    cockpit: '大屏展示',
    printed: '印量看板',
    device: '设备看板',
    deviceDetail: '设备看板详情',
  },
  task: {
    title: '我的作业',
    personal: '个人任务',
    scan: '我的扫描',
    history: '历史任务',
    profile: '用户信息',
  },
  devices: {
    title: '设备管理',
    list: '设备列表',
    group: '设备组',
    model: '设备型号',
    auth: '认证设备',
  },
  org: {
    title: '用户管理',
    department: '部门管理',
    role: '角色管理',
    enterprise: '用户管理',
    sync: {
      title: '三方同步',
      ad: 'AD域同步',
    },
  },
  statistical: {
    title: '报表管理',
    reconciliation: '作业记录',
    environment: '环境报表',
    anomaly: '异常分析',
    speed: '速印机报',
    bill: {
      title: '作业分账',
      user: '用户分账',
      department: '部门分账',
      device: '设备分账',
      project: '项目分账',
    },
    analysis: {
      title: '分析报表',
      colour: '色彩比例',
      quota: '成本分析',
      double: '双面分析',
      compare: '同比环比',
      cancel: '印量节约',
    },
    device: {
      title: '设备分析',
      use: '设备负载',
    },
  },
  billing: {
    title: '配额管理',
    standard: '计费标准',
    rule: '配额规则',
  },
  safety: {
    title: '安全管理',
    mandatory: '强制标识',
    rule: '规则打印',
    secret: '密级设置',
  },
  system: {
    title: '系统管理',
    log: '操作日志',
    params: '参数配置',
    menu: '菜单管理',
    mail: '邮箱管理',
    customization: '定制化',
    authorization: '授权',
  },
}
