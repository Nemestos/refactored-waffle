export default interface AddMotoToUserUseCase {
  execute(userId: string, motoId: string): Promise<void>
}
