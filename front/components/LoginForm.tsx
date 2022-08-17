import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { object, string } from 'yup'
import { MyThunkDispatch } from '../lib/store'
import BaseForm from './BaseForm'
import BaseInput from './BaseInput'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { login } from '../lib/slices/auth'
import { ILoginRequest } from '../types/auth.types'

const loginSchema = object({
  email: string().email().required(),
  password: string().required()
})

const LoginForm = () => {
  const router = useRouter()
  const dispatch: MyThunkDispatch = useDispatch()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = async (data: ILoginRequest) => {
    try {
      await dispatch(login(data))
      router.push('/')
    } catch (err) {
      setError('apiError', { message: "Can't login" })
    }
  }

  return (
    <BaseForm
      onSubmit={handleSubmit(onSubmit)}
      topText="Welcome Back Biker"
      buttonText="Submit"
      serverError={errors.apiError ? (errors.apiError.message as string) : null}
    >
      <BaseInput name="email" register={register} errors={errors} label="Email" />
      <BaseInput name="password" register={register} errors={errors} label="Password" type="password" />
    </BaseForm>
  )
}
export default LoginForm
