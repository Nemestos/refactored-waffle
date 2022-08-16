import React from 'react'
import { useSelector } from 'react-redux'
import { OurStore } from '../lib/store'

type Props = {
  readonly customText?: React.ReactNode
  children: React.ReactNode
}

export const AuthGuard: React.FC<Props> = ({ children, customText }) => {
  const { loading, me } = useSelector((state: OurStore) => state.authReducer)

  if (loading === 'loading') {
    return <h3>loading...</h3>
  }

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
