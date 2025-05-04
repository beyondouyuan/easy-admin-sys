import type { TMethod } from "@/types";

export const API_TABLE_DEFAULT_PROPS = {
  api: () => '',
  immediate: true,
  columns: () => ([]),
  params: () => ({}),
  method: 'post' as TMethod,
  columnsConfig: () => ({}),
  toolbarConfig: () => ({}),
  sizes: () => [10, 20, 50, 100],
  size: 10
}