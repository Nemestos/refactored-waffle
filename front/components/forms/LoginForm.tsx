import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { object, string } from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { TextFieldElement } from 'react-hook-form-mui'
import { useSigninUserMutation } from '../../lib/api/authApi'
import { ILoginUserRequest } from '../../types/auth.types'
import BaseForm from '../BaseForm'

const loginSchema = object({
  email: string().email().required(),
  password: string().required()
})

const LoginForm = () => {
  const router = useRouter()
  const [loginUser, { isLoading, isError, error, isSuccess }] = useSigninUserMutation()

  useEffect(() => {
    if (isSuccess) {
      toast.success('Vous êtes maintenant login')
      router.push('/')
    }
    if (isError) {
      toast.error('impossible de se login', { position: 'top-right' })
    }
  }, [isLoading])

  const onSubmit = async (data: ILoginUserRequest) => {
    console.log(data)
    loginUser(data)
  }

  return (
    <BaseForm
      defaultValue={null}
      resolver={yupResolver(loginSchema)}
      onSubmit={onSubmit}
      topText="Welcome Back Biker"
      buttonText="Submit"
    >
      <TextFieldElement name="email" label={'Email'} />
      <TextFieldElement name="password" label={'Password'} type={'password'} />
    </BaseForm>
  )
}
export default LoginForm
