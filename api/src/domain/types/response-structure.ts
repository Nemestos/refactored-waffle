export type ResponseStructureArray<T> = { object: string; data: T[] }
export type ResponseStructureSingle<T> = T
export type ResponseStructure<T> = ResponseStructureSingle<T> | ResponseStructureArray<T>
