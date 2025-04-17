import { Link, useNavigate } from 'react-router-dom'
import * as S from './styles'
import { ROUTES } from 'src/routing'
import { Button } from '@mui/material'
import { useLogout } from 'src/hooks'
import { useEffect } from 'react'
import { useAuthStore } from 'src/store'
export const Header = () => {
  const { logout: logoutClient, isSuccess } = useLogout()
  const router = useNavigate()
  const { logout } = useAuthStore()

  const handleLogoutClick = () => {
    logout()
  }
  useEffect(() => {
    if (isSuccess) {
      logoutClient()
      router(ROUTES.login)
    }
  }, [isSuccess])

  return (
    <S.MainHeader>
      <S.HeaderText>
        <Link to={ROUTES.home}>Rotang.ua: адміністратор</Link>
      </S.HeaderText>
      <Button onClick={handleLogoutClick}>Вихід</Button>
    </S.MainHeader>
  )
}
