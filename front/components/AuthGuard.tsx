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
    <section>
      <h2 className="text-center">Unauthorized</h2>
      <div className="text-center">{customText || "Vous n'avez pas la permission d'accéder à cette ressource."}</div>
    </section>
  )
}
