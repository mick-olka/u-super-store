import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import * as S from '../styles'

export const SearchField = ({
  onSearchTrigger,
}: {
  onSearchTrigger: (searchText: string) => void
}) => {
  const [text, setText] = useState('')
  const search = useDebounce(text, 500)
  useEffect(() => {
    onSearchTrigger(search[0])
  }, [search[0], onSearchTrigger])
  return (
    <Box>
      <S.TextFieldStyled
        placeholder='Пошук'
        value={text}
        onChange={(e) => setText(e.target.value)}
        size='small'
      />
    </Box>
  )
}
