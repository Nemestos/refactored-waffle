export type ResponseStructureArray<T> = { object: string; data: T[] }
export type ResponseStructure<T> = T | ResponseStructureArray<T>
