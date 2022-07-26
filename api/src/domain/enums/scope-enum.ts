export enum Scopes {
  CanGetUsers = 'can_read_users',
  CanDeleteUsers = 'can_delete_users'
}

export const DefaultBasicUserScope = [Scopes.CanGetUsers]
export const AdminUserScope = [...DefaultBasicUserScope, Scopes.CanDeleteUsers]
