import { Search } from '@mui/icons-material'
import { IconButton, InputBase, Paper } from '@mui/material'

export interface SearchInputProps {
  placeholder: string
  onSearch: () => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchInput = ({ placeholder, onSearch, onChange }: SearchInputProps) => {
  return (
    <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
      <InputBase onChange={onChange} placeholder={placeholder} sx={{ ml: 1, flex: 1 }} />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={onSearch}>
        <Search />
      </IconButton>
    </Paper>
  )
}
