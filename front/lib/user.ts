import { authorize, Callback, ContextWithStore } from './authorize'
import { fetchMe } from './slices/auth'
import { MyThunkDispatch, wrapper } from './store'

interface UserProps {
  callback: Callback
}

export const user = ({ callback }: UserProps) => {
  wrapper.getServerSideProps(async (context: ContextWithStore) => {
    const { dispatch }: { dispatch: MyThunkDispatch } = context.store
    return authorize({
      context,
      callback: async (...props) => {
        if (!context.store.getState().authReducer.me) {
          await dispatch(fetchMe())
        }
        return callback(...props)
      }
    })
  })
}
