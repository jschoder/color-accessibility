export type Color = {
  r: number,
  g: number,
  b: number
}
export type OpaqueColor =
  string
  | [number, number, number]
  | Color
export type NonOpaqueColor =
  string
  | [number, number, number, number]
  | Color & { a: number }