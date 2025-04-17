import { ReactNode } from 'react'

import { NavPane } from './nav-pane'
import * as S from './styles'
import { Header } from './header'

interface I_Authorized {
  children: ReactNode
}

export const MainLayout = ({ children }: I_Authorized) => {
  return (
    <S.MainLayout>
      <Header />
      <S.MainMiddle>
        <S.MainNav>
          <NavPane />
        </S.MainNav>
        <S.MainContent>{children}</S.MainContent>
      </S.MainMiddle>
      {/* <Footer /> */}
    </S.MainLayout>
  )
}
