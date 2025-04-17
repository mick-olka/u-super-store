import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'

import * as S from 'src/components/styles'

import { I_CartItemPopulated } from 'src/models'

interface I_Props {
  onSubmit: (data: I_CartItemPopulated) => void
  onCancel: () => void
  isLoading: boolean
  initValues: I_CartItemPopulated
  // required?: boolean
}

export const CartItemForm = (props: Readonly<I_Props>) => {
  const { onSubmit, onCancel, isLoading, initValues } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<I_CartItemPopulated>({
    defaultValues: initValues,
  })
  return (
    <Box sx={{ width: '30rem' }}>
      <form onSubmitCapture={handleSubmit(onSubmit)}>
        <S.TextFieldBox>
          <S.TextFieldStyled {...register('main_color', { required: false })} label='Заголовок' />
        </S.TextFieldBox>

        <S.TextFieldBox>
          <S.TextFieldStyled {...register('pill_color', { required: false })} label='Варіант' />
        </S.TextFieldBox>

        <S.TextFieldBox>
          <S.TextFieldStyled {...register('count', { required: true })} label='К-ть.' />
        </S.TextFieldBox>

        <S.ButtonStyled variant='contained' type='submit' disabled={isLoading}>
          {isLoading ? 'Завантаження...' : 'Зберегти'}
        </S.ButtonStyled>
        <S.ButtonStyled onClick={onCancel} variant='contained' disabled={isLoading}>
          Скасувати
        </S.ButtonStyled>
      </form>
    </Box>
  )
}
