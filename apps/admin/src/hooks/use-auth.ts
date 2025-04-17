import { useMutation, useQuery } from 'react-query'

import { toasterPending } from './data'

import { I_LoginCreds, I_RegisterCreds } from 'src/models'
import { AuthService } from 'src/services'

export const useLogin = () => {
  const { mutateAsync, data, isLoading, isError } = useMutation(
    'login',
    (form_data: I_LoginCreds) =>
      toasterPending(AuthService.login(form_data), 'Перевірка...', 'Невірні дані', 'Вхід успішний'),
    {},
  )
  return { login: mutateAsync, tokens: data?.data, isLoading, isError }
}

export const useLogout = () => {
  const { mutateAsync, isSuccess, isLoading, isError } = useMutation(
    'logout',
    () => toasterPending(AuthService.logout(), 'Перевірка...', 'Помилка', 'Сесію закрито'),
    {},
  )
  return { logout: mutateAsync, isSuccess, isLoading, isError }
}

export const useRegister = () => {
  const { mutateAsync, data, isLoading, isError } = useMutation(
    'register',
    (form_data: I_RegisterCreds) =>
      toasterPending(
        AuthService.login(form_data),
        'Перевірка...',
        'Помилка при перевірці даних',
        'Реєстрація успішна',
      ),
    {},
  )
  return { register: mutateAsync, tokens: data?.data, isLoading, isError }
}

export const useCheckLogin = () => {
  const ff = useQuery('checkLogin', () => AuthService.checkLogin(), {
    enabled: false,
    select: ({ data }) => data,
  })
  const isLogged = ff.data?.logged && !ff.isError
  return { fetch: ff.refetch, isLogged }
}
