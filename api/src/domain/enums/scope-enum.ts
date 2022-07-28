export enum Scopes {
  CanGetUsers = 'can_read_users',
  CanDeleteUsers = 'can_delete_users',

  CanGetEvents = 'can_read_events',
  CanDeleteEvents = 'can_delete_events'
}

export const DefaultBasicUserScope = [Scopes.CanGetUsers, Scopes.CanGetEvents]
export const AdminUserScope = [...DefaultBasicUserScope, Scopes.CanDeleteUsers, Scopes.CanDeleteEvents]
