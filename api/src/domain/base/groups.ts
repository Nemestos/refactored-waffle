export class Groups {
  public static readonly CREATE = 'create'
  public static readonly READ = 'read'
  public static readonly UPDATE = 'update'
  public static readonly AUTH = 'auth'

  public static basicAll() {
    return [this.CREATE, this.READ, this.UPDATE]
  }

  public static authAll() {
    const basic = this.basicAll()
    basic.push(...[this.AUTH])
    return basic
  }
}
