import React from 'react'
import BaseButton from './BaseButton'

export interface BaseFormProps {
  children: React.ReactNode
  onSubmit: () => void
  topText: string
  buttonText: string
  serverError?: string
}

const BaseForm: React.FC<BaseFormProps> = ({ children, onSubmit, topText, buttonText, serverError }) => (
  <form onSubmit={onSubmit} className="bg-white/30 flex flex-col p-4 w-1/4 rounded-xl shadow-sm">
    <p className="text-white self-center text-xl font-bold mb-2">{topText}</p>
    {children}
    <BaseButton>{buttonText}</BaseButton>
    {serverError && <div className="text-red-600 ml-1 h-4">{serverError}</div>}
  </form>
)

export default BaseForm
