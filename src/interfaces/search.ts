export namespace ISearch {
  export interface ISlot {
    name: string
    default: Function
  }
  export interface IProperties {
    [key: string]: unknown
  }
  export interface IConfigItem {
    [key: string]: unknown
    field?: string
    params?: string[] | Function
    value?: unknown
    linkages?: string[] | never[]
    componentName?: string
    properties?: IProperties,
    slots?: ISlot[]
  }
  export interface IConfigureItem {
    label?: string
    uuid: string
    componentName: string
    properties: {
      list: IConfigItem[]
    }
  }
  export interface IConfigure {
    list: IConfigureItem[]
  }
  export interface ISearchConfigure {
    field: string
    properties?: IConfigItem
    componentName?: string
  }

  export interface ISearchForm {
    date?: [string, string];
    [key: string]: any;
  }
}
