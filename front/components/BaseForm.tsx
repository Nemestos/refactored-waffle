import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { FieldValues, Resolver } from 'react-hook-form'
import { FormContainer } from 'react-hook-form-mui'
export interface BaseFormProps<T> {
  resolver: Resolver<FieldValues, any>
  defaultValue: T
  onSubmit: (v: T) => void
  topText: string
  buttonText: string
  // serverError?: string
  children: React.ReactNode
}

const BaseForm = <T extends unknown>({
  children,
  resolver,
  onSubmit,
  defaultValue,
  topText,
  buttonText
}: // serverError
BaseFormProps<T>) => (
  <Box className="bg-slate-400 p-10 rounded-lg">
    <FormContainer resolver={resolver} onSuccess={onSubmit} defaultValues={defaultValue}>
      <Typography textAlign={'center'} variant="h5">
        {topText}
      </Typography>
      <Stack direction={'column'} gap={4}>
        {children}
        <Button type="submit" variant="contained" color="primary">
          {buttonText}
        </Button>
      </Stack>
    </FormContainer>
  </Box>
)

export default BaseForm
