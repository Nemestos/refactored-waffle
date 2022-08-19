import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'
import styled from 'styled-components'

export interface BaseInputProps {
  errors: FieldErrorsImpl<any>
  register: UseFormRegister<any>
  name: string
  label?: string
  type?: string
}
const StyledInput = styled.input`
  font-size: 20px;

  padding: 5px;
  border-radius: 8px;
  border: none;
  background-color: white;
`

const BaseInput: React.FC<BaseInputProps> = ({ label, name, errors, register, ...rest }) => (
  <div className="flex flex-col mb-2">
    <p className="text-gray-300 text-12 font-medium tracking-1px">{label}</p>
    <StyledInput {...register(name)} {...rest} />
    <p className="text-red-600 ml-1 h-4">{errors[name]?.message as string}</p>
  </div>
)
export default BaseInput
