import { InputLabel } from '@mui/material'
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'

export interface BaseInputProps {
  errors: FieldErrorsImpl<any>
  register: UseFormRegister<any>
  name: string
  label?: string
  values: string[]
}

const BaseInput: React.FC<BaseInputProps> = ({ label, name, errors, register, ...rest }) => (
  <div className="flex flex-col mb-2">
    <InputLabel>{label}</InputLabel>
    <Select></Select>
    <p className="text-red-600 ml-1 h-4">{errors[name]?.message as string}</p>
  </div>
)
export default BaseInput
