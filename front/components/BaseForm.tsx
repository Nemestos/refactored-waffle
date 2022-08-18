import { Button, FormControl, Typography } from '@mui/material'
import React from 'react'

export interface BaseFormProps {
  children: React.ReactNode
  onSubmit: () => void
  topText: string
  buttonText: string
  serverError?: string
}

const BaseForm: React.FC<BaseFormProps> = ({ children, onSubmit, topText, buttonText, serverError }) => (
  <form onSubmit={onSubmit} className="bg-slate-500 p-4">
    <FormControl>
      <Typography textAlign={'center'} variant="h5">
        {topText}
      </Typography>
      {children}
      <Button variant="contained" color="primary" type="submit">
        {buttonText}
      </Button>
      {serverError && <div className="text-red-600 ml-1 h-4">{serverError}</div>}
    </FormControl>
  </form>
)

export default BaseForm
