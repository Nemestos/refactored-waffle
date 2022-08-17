import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { object, string } from 'yup'
import { register } from '../lib/slices/auth'
import { MyThunkDispatch } from '../lib/store'
import { IRegisterRequest } from '../types/auth.types'
import BaseForm from './BaseForm'
import BaseInput from './BaseInput'

const registerSchema = object({
  email: string().email().required(),
  password: string().required(),
  firstname: string().required(),
  surname: string().required()
})
const initialValues: IRegisterRequest = {
  email: '',
  password: '',
  firstname: '',
  surname: ''
}

const SignupForm = () => {
  const router = useRouter()
  const dispatch: MyThunkDispatch = useDispatch()
  const formik = useFormik({
    validationSchema: registerSchema,
    initialValues,
    onSubmit: async (values) => {
      await dispatch(register(values))
      router.push('/')
    }
  })

  return (
    <BaseForm onSubmit={formik.handleSubmit} topText="Hello Biker" buttonText="Submit">
      <BaseInput name="email" formik={formik} label="Email" />
      <BaseInput name="password" formik={formik} label="Password" type="password" />
      <BaseInput name="firstname" formik={formik} label="Firstname" />
      <BaseInput name="surname" formik={formik} label="Surname" />
    </BaseForm>
  )
}
export default SignupForm
