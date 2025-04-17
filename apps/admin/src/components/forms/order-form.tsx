import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useForm } from 'react-hook-form'

import { TextFieldBox, TextFieldStyled, ButtonStyled } from 'src/components'
import { I_OrderForm, StatusEnum } from 'src/models'

interface I_Props {
  onSubmit: (data: I_OrderForm) => void
  isLoading: boolean
  initValues?: I_OrderForm
  required?: boolean
}

const def: I_OrderForm = {
  name: '',
  phone: '',
  message: '',
  status: StatusEnum.w,
}

export const OrderForm = (props: Readonly<I_Props>) => {
  const { onSubmit, isLoading, initValues, required } = props
  const {
    register,
    getValues,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<I_OrderForm>({
    defaultValues: initValues || def,
  })
  watch('status')

  // in case other fields get passed from getById response
  const prepareSubmit = (data: I_OrderForm) => {
    const filtered_data = {
      name: data.name,
      phone: data.phone,
      message: data.message,
      status: data.status,
    }
    onSubmit(filtered_data)
  }
  return (
    <Box sx={{ width: '100%' }}>
      <form onSubmitCapture={handleSubmit(prepareSubmit)}>
        <TextFieldBox>
          <TextFieldStyled
            {...register('name', { required: !!required })}
            fullWidth
            label="Ім'я замовника"
          />
        </TextFieldBox>

        <TextFieldBox>
          <TextFieldStyled
            {...register('phone', { required: !!required })}
            fullWidth
            label='Телефон'
          />
        </TextFieldBox>

        <TextFieldBox>
          <TextFieldStyled
            {...register('message', { required: false })}
            fullWidth
            label='Повідомлення'
          />
        </TextFieldBox>

        <TextFieldBox>
          <FormControl fullWidth>
            <InputLabel>Статус замовлення</InputLabel>
            <Select
              value={getValues('status')}
              onChange={(e) => setValue('status', e.target.value as StatusEnum)}
              sx={{ textAlign: 'left' }}
              label='Статус'
              fullWidth
            >
              <MenuItem value={StatusEnum.c}>Скасовано</MenuItem>
              <MenuItem value={StatusEnum.d}>Готово</MenuItem>
              <MenuItem value={StatusEnum.w}>Очікує</MenuItem>
              <MenuItem value={StatusEnum.p}>В обробці</MenuItem>
            </Select>
          </FormControl>
        </TextFieldBox>

        <ButtonStyled variant='contained' type='submit' disabled={isLoading}>
          {isLoading ? 'Завантаження...' : 'Зберегти'}
        </ButtonStyled>
      </form>
    </Box>
  )
}
