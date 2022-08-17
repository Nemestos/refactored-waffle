import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { object, string } from 'yup'
import { MyThunkDispatch } from '../lib/store'
import BaseForm from './BaseForm'
import BaseInput from './BaseInput'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { register as registerSlice } from '../lib/slices/auth'
import { IRegisterRequest } from '../types/auth.types'

const registerSchema = object({
  email: string().email().required(),
  password: string().required(),
  firstname: string().required(),
  surname: string().required()
})

const SignupForm = () => {
  const router = useRouter()
  const dispatch: MyThunkDispatch = useDispatch()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registerSchema)
  })

  const onSubmit = async (data: IRegisterRequest) => {
    try {
      await dispatch(registerSlice(data))
      router.push('/')
    } catch (err) {
      setError('apiError', { message: "Can't register" })
    }
  }

  return (
    <BaseForm
      onSubmit={handleSubmit(onSubmit)}
      topText="Hello Biker"
      buttonText="Submit"
      serverError={errors.apiError ? (errors.apiError.message as string) : null}
    >
      <BaseInput name="email" register={register} errors={errors} label="Email" />

      <BaseInput name="password" register={register} errors={errors} label="Password" type="password" />
      <BaseInput name="firstname" register={register} errors={errors} label="Firstname" />
      <BaseInput name="surname" register={register} errors={errors} label="Surname" />
    </BaseForm>
  )
}
export default SignupForm
