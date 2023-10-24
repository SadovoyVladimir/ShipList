interface INation {
  color: string
  name: string
  title: string
  icons: IICons
  __typename: string
}

interface IICons {
  small?: string
  medium?: string
  large?: string
  __typename: string
}

interface IType {
  name: string
  title: string
  icons: { default: string; __typename: string }
  __typename: string
}

export interface IShip {
  title: string
  level: number
  description: string
  nation: INation
  icons: IICons
  type: IType
  __typename: string
}
