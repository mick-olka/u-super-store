import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'

export { Register as SignUp, Login as SignIn } from '.'
import { TextFieldBox, TextFieldStyled } from 'src/components'
import { I_LoginCreds } from 'src/models'

interface I_Props {
  onSubmit: (dat: I_LoginCreds) => void
  isLoading: boolean
}

export const CredentialsForm = ({ onSubmit, isLoading }: I_Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<I_LoginCreds>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <form onSubmitCapture={handleSubmit(onSubmit)}>
      <TextFieldBox>
        <TextFieldStyled
          error={!!errors.email}
          {...register('email', { required: true })}
          label='Ел. пошта (логін)'
          fullWidth
        />
      </TextFieldBox>

      <TextFieldBox>
        <TextFieldStyled
          error={!!errors.password}
          type='password'
          {...register('password', { required: true, minLength: 2 })}
          label='Пароль'
          fullWidth
        />
      </TextFieldBox>

      <Button
        sx={{ width: '100%' }}
        variant='contained'
        disabled={isLoading}
        type='submit'
        // value={isLoading ? 'Loading...' : 'Create'}
      >
        Увійти
      </Button>
    </form>
  )
}
