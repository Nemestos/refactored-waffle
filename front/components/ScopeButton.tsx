import { Button, SxProps, Theme } from '@mui/material'
import { RootState, useAppSelector } from '../lib/store'
import { IUser } from '../types/user.types'

export interface ScopeButtonProps {
  sx?: SxProps<Theme>
  content: string
  requiredScope: string
  onClick: () => void
}
export const ScopeButton = ({ sx, content, requiredScope, onClick }: ScopeButtonProps) => {
  const me: IUser = useAppSelector((state: RootState) => state.userState.user)

  if (!me.scopes.includes(requiredScope)) {
    return null
  }
  return (
    <Button sx={sx} onClick={onClick} size="small" variant="contained" color="error">
      {content}
    </Button>
  )
}
