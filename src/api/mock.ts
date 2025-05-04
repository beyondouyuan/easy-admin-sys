function genRes(size: number = 10) {
  const res = []
  for (let i = 0; i < size; i++) {
    const target = {
      id: i + 1,
      name: `name${i + 1}`,
    }
    res.push(target)
  }
  return res
}
const reportRes = {
  code: 0,
  msg: 'success',
  data: {
    total: 100,
    page: 1,
    size: 10,
    list: genRes(10),
    header: [
      {
        label: 'id',
        prop: 'id',
      },
      {
        label: 'name',
        prop: 'name',
      },
    ],
  },
}
export function getReport(params: any = {}) {
  console.log('request params', params)
  return new Promise((resolve) => {
    resolve(reportRes)
  })
}
