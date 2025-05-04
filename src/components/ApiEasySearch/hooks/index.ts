import { reactive, nextTick } from 'vue'

export default function useApiSearcher(namespace: string) {
  const compRefs = reactive<any>({})
  async function schedulerJobs(target: any) {
    if (target?.linkages?.length) {
      const refs = compRefs[namespace].refs
      const queue = []
      for (const linkage of target.linkages) {
        if (refs[linkage] && refs[linkage].dispatch) {
          queue.push(refs[linkage])
        }
      }
      await nextTick()
      for (const que of queue) {
        await que.dispatch()
      }
    }
  }

  function setRefs(e: HTMLElement) {
    compRefs[namespace] = e
  }

  return {
    schedulerJobs,
    setRefs,
  }
}
