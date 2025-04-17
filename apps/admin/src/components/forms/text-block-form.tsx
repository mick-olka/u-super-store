import { Box } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

import { MultiLangTextField } from '../inputs/multi-lang-text-field'

import * as S from 'src/components/styles'

import { I_TextBlockForm } from 'src/models'
import { lanEnumToObject } from 'src/utils'
import MDEditor from '@uiw/react-md-editor'

interface I_Props {
  onSubmit: (data: I_TextBlockForm) => void
  isLoading: boolean
  initValues?: I_TextBlockForm
}

const def: I_TextBlockForm = {
  text: lanEnumToObject(''),
}

const fieldBoxStyles = { display: 'flex', width: '20rem', alignItems: 'left' }

export const TextBlockForm = (props: Readonly<I_Props>) => {
  const { onSubmit, isLoading, initValues } = props
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<I_TextBlockForm>({
    defaultValues: initValues || def,
  })

  // in case other fields get passed from getById response
  const prepareSubmit = (data: I_TextBlockForm) => {
    const filtered_data = {
      text: data.text,
    }
    onSubmit(filtered_data)
  }
  return (
    <Box sx={{ width: '30rem' }}>
      <form onSubmitCapture={handleSubmit(prepareSubmit)}>
        <S.TextFieldBox>
          <label>Текст</label>
          <Box sx={fieldBoxStyles}>
            <MultiLangTextField
              registerOptions={{ required: false }}
              register={register}
              names={['text.ua', 'text.en', 'text.de']}
              // error={!!errors.text}
            />
            <Controller
              control={control}
              name='text.ua'
              render={({ field: { onChange, value } }) => (
                <MDEditor height={400} onChange={onChange} value={value} />
              )}
            />
          </Box>
        </S.TextFieldBox>

        <S.ButtonStyled variant='contained' type='submit' disabled={isLoading}>
          {isLoading ? 'Завантаження...' : 'Зберегти'}
        </S.ButtonStyled>
      </form>
    </Box>
  )
}
