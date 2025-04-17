import { useState } from 'react'
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'
import * as S from '../styles'
import MDEditor from '@uiw/react-md-editor'

interface I_Props<T extends FieldValues> {
  register: UseFormRegister<T>
  names: Path<T>[]
  registerOptions?: RegisterOptions<T, Path<T>>
  label?: string
  error?: boolean
  textarea?: boolean
}

export const MdTextEditor = <I_FormData extends FieldValues>({
  names,
  register,
  registerOptions,
  label,
  error,
  textarea,
}: I_Props<I_FormData>) => {
  const [current, setCurrent] = useState<number>(0)
  const cycleLang = () => {
    let next = current + 1
    if (next >= names.length) next = 0
    setCurrent(next)
  }
  return (
    <div>
      {names.map((n) => (
        // <MDEditor
        //   key={n}
        //   height={400}
        //   {...register(n, registerOptions)}
        //   sx={{
        //     display: n === names[current] ? 'block' : 'none',
        //     '& textarea': { resize: 'vertical' },
        //     '& input': { width: 'calc(100% - 5rem)' },
        //   }}
        //   label={label}
        //   error={error}
        //   multiline={textarea || false}
        //   rows={textarea ? 6 : undefined}
        //   fullWidth
        // />
        <div key={n}>{n}</div>
      ))}

      <S.RoundButton
        width='3rem'
        variant='contained'
        onClick={cycleLang}
        sx={{ position: 'absolute', right: 0 }}
      >
        {names[current].split('.')[1].toUpperCase()}
      </S.RoundButton>
    </div>
  )
}
