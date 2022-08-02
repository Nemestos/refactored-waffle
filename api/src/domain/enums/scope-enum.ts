export enum Scopes {
  CanGetUsers = 'can_read_users',
  CanUpdateUsers = 'can_update_users',
  CanDeleteUsers = 'can_delete_users',

  CanGetEvents = 'can_read_events',
  CanCreateEvents = 'can_create_events',
  CanUpdateEvents = 'can_update_events',
  CanDeleteEvents = 'can_delete_events',

  CanGetMotos = 'can_read_motos',
  CanCreateMotos = 'can_create_motos',
  CanUpdateMotos = 'can_update_motos',
  CanDeleteMotos = 'can_delete_motos'
}

export const DefaultBasicUserScope = [
  Scopes.CanGetUsers,
  Scopes.CanGetEvents,
  Scopes.CanCreateEvents,
  Scopes.CanGetMotos
]
export const AdminUserScope = [
  ...DefaultBasicUserScope,
  Scopes.CanDeleteUsers,
  Scopes.CanUpdateUsers,

  Scopes.CanDeleteEvents,
  Scopes.CanUpdateEvents,

  Scopes.CanDeleteMotos,
  Scopes.CanUpdateMotos,
  Scopes.CanCreateMotos
]
