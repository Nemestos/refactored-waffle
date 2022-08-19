import { useRouter } from 'next/router'
import { object, string } from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'

import { useEffect } from 'react'
import { TextFieldElement } from 'react-hook-form-mui'
import { toast } from 'react-toastify'
import { useSignupUserMutation } from '../../lib/api/authApi'
import { IRegisterUserRequest } from '../../types/auth.types'
import BaseForm from '../BaseForm'

const registerSchema = object({
  email: string().email().required(),
  password: string().required(),
  firstname: string().required(),
  surname: string().required()
})

const SignupForm = () => {
  const router = useRouter()

  const [signupUser, { isLoading, isError, isSuccess }] = useSignupUserMutation()

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
      defaultValue={null}
      resolver={yupResolver(registerSchema)}
      onSubmit={onSubmit}
      topText="Hello New Biker"
      buttonText="Submit"
    >
      <TextFieldElement name="email" label="Email" />
      <TextFieldElement name="password" label="Password" type={'password'} />

      <TextFieldElement name="firstname" label="Firstname" />
      <TextFieldElement name="surname" label="Surname" />
    </BaseForm>
  )
}
export default SignupForm
