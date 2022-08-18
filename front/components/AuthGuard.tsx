import { Container, Typography } from '@mui/material'
import React from 'react'
import { RootState, useAppSelector } from '../lib/store'
import { IUser } from '../types/user.types'

type Props = {
  readonly customText?: React.ReactNode
  children: React.ReactNode
}

export const AuthGuard: React.FC<Props> = ({ children, customText }) => {
  const me: IUser = useAppSelector((state: RootState) => state.userState.user)

  if (me) {
    return <>{children}</>
  }

  return (
    <Container>
      <Typography variant="h2" color={'whitesmoke'} align="center">
        Unauthorized
      </Typography>
      <Typography variant="h4" color={'gray'} align="center">
        {customText || "Vous n'avez pas la permission d'accéder à cette ressource."}
      </Typography>
    </Container>
  )
}
