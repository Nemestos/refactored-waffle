import { FC } from 'react'
import frLocale from 'date-fns/locale/fr'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider, LocalizationProviderProps } from '@mui/x-date-pickers/LocalizationProvider'

export type DateFnsProviderProps = FC<Omit<LocalizationProviderProps, 'dateAdapter'>>

const DateFnsProvider: DateFnsProviderProps = ({ children, ...props }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale} {...props}>
      {children}
    </LocalizationProvider>
  )
}
export default DateFnsProvider
