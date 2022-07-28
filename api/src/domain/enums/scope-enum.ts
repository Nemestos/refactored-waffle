export enum Scopes {
  CanGetUsers = 'can_read_users',
  CanUpdateUsers = 'can_update_users',
  CanDeleteUsers = 'can_delete_users',

  CanGetEvents = 'can_read_events',
  CanCreateEvents = 'can_create_events',
  CanUpdateEvents = 'can_update_events',
  CanDeleteEvents = 'can_delete_events'
}

export const DefaultBasicUserScope = [Scopes.CanGetUsers, Scopes.CanGetEvents, Scopes.CanCreateEvents]
export const AdminUserScope = [
  ...DefaultBasicUserScope,
  Scopes.CanDeleteUsers,
  Scopes.CanDeleteEvents,
  Scopes.CanUpdateEvents,
  Scopes.CanUpdateUsers
]
