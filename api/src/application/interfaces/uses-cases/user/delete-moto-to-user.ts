export default interface DeleteMotoToUserUseCase {
  execute(userId: string, motoId: string): Promise<void>
}
