export default interface RefreshUseCase {
  execute(refresh: string): Promise<[string, string]>
}
