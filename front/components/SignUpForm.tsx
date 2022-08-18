import { useRouter } from 'next/router'
import { object, string } from 'yup'
import BaseForm from './BaseForm'
import BaseInput from './BaseInput'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSignupUserMutation } from '../lib/api/authApi'
import { IRegisterUserRequest } from '../types/auth.types'

const registerSchema = object({
  email: string().email().required(),
  password: string().required(),
  firstname: string().required(),
  surname: string().required()
})

const SignupForm = () => {
  const router = useRouter()

  const [signupUser, { isLoading, isError, isSuccess }] = useSignupUserMutation()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registerSchema)
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success('Merci de vous être inscrit')
      router.push('/')
    }
    if (isError) {
      toast.error('impossible de s"inscrire ', { position: 'top-right' })
    }
  }, [isLoading])

  const onSubmit = (data: IRegisterUserRequest) => signupUser(data)

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
