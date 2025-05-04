interface IOptions {
  label: string
  command: string,
  disabled?: boolean
}

export interface IDropdown {
  options: IOptions[],
  text?: string
}