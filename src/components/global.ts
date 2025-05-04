import { type App } from 'vue'
// only register components start with Easy or Api
const components = import.meta.glob('@/components/@(Easy[A-Z]|Api[A-Z])*/index.vue', {
  eager: true,
})

export default {
  install(app: App) {
    for (const [path, value] of Object.entries(components) as Array<[string, any]>) {
      const name = path!
        .split('/')!
        .at(-2)!
        .replace(/\.\w+$/, '')
      app.component(name, value.default)
    }
  },
}
