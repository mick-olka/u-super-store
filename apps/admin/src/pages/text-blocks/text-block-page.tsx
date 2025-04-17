import MDEditor from '@uiw/react-md-editor'
import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useTextBlockById, useUpdateTextBlock } from 'src/hooks'
import { I_TextBlockForm } from 'src/models'
import { lanEnumToObject } from 'src/utils'
import * as S from 'src/components/styles'

const def: I_TextBlockForm = {
  text: lanEnumToObject(''),
}

export const TextBlockPage = () => {
  const id = String(useParams().id)
  const { text_block, isLoading, isError } = useTextBlockById(id)
  const { update, isLoading: isFetchingUpdate } = useUpdateTextBlock()
  const onSubmit = (data: I_TextBlockForm) => {
    if (id) update({ id, form_data: data })
  }
  const { handleSubmit, control, reset } = useForm<I_TextBlockForm>({
    defaultValues: def,
  })
  useEffect(() => {
    if (text_block) {
      reset(text_block) // Update form values with fetched data
    }
  }, [text_block, reset])
  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      <form onSubmitCapture={handleSubmit(onSubmit)}>
        <S.ButtonStyled variant='contained' type='submit' disabled={isLoading}>
          {isLoading ? 'Завантаження...' : 'Зберегти'}
        </S.ButtonStyled>
        <div data-color-mode='light' style={{ padding: '0 1rem' }}>
          <Controller
            control={control}
            name='text.ua'
            render={({ field: { onChange, value } }) => (
              <MDEditor height={600} onChange={onChange} value={value} />
            )}
          />
        </div>
      </form>
    </div>
  )
}
