import { Box } from '@mui/material'
import styled from 'styled-components'
import MountainsImg from 'src/assets/mountains.jpg'

export const AuthPane = styled(Box)`
  background-image: url(${MountainsImg});
  background-size: cover;
  height: 100vh;
  width: 100%;
`
export const FormWrapper = styled.div`
  margin: 0 auto 1rem;
  padding: 0 1rem 1rem;
  width: 300px;
  border: 1px solid #999;
  border-radius: 10px;
  margin-top: 15rem;
  background-color: #fff;
`
export const Header = styled.div`
  background-color: rgba(200, 200, 200, 0.6);
  padding: 1rem;
  h2 {
    text-transform: uppercase;
  }
`
