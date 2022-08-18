import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { object, string } from 'yup'
import BaseForm from './BaseForm'
import BaseInput from './BaseInput'

import { useEffect } from 'react'
import { useSigninUserMutation } from '../lib/api/authApi'
import { ILoginRequest } from '../types/auth.types'

const loginSchema = object({
  email: string().email().required(),
  password: string().required()
})

const LoginForm = () => {
  const router = useRouter()
  const [loginUser, { isLoading, isError, error, isSuccess }] = useSigninUserMutation()

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success('Vous êtes maintenant login')
      router.push('/')
    }
    if (isError) {
      toast.error('impossible de se login', { position: 'top-right' })
    }
  }, [isLoading])

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset()
  //   }
  // }, [isSubmitSuccessful])

  const onSubmit = async (data: ILoginRequest) => {
    console.log(data)
    loginUser(data)
  }

  return (
    <BaseForm onSubmit={handleSubmit(onSubmit)} topText="Welcome Back Biker" buttonText="Submit">
      <BaseInput name="email" register={register} errors={errors} label="Email" />
      <BaseInput name="password" register={register} errors={errors} label="Password" type="password" />
    </BaseForm>
  )
}
export default LoginForm
