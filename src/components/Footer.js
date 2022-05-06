import { useNavigate } from 'react-router-dom'
import { Box, Container, Divider, Link, Typography } from '@mui/material'

const Footer = () => {
  const navigate = useNavigate()
  const handleLinkEvent = to => event => {
    event.preventDefault()
    navigate(to)
  }

  return (
    <>
      <Container sx={{ my: 8 }}>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>&copy; 2022 Love Collar 企劃團隊</Typography>
          <Box>
            <Link
              href="/#/terms"
              onClick={handleLinkEvent('terms')}
            >
              使用條款
            </Link>
            {' | '}
            <Link
              href="/#/privacy"
              onClick={handleLinkEvent('privacy')}
            >
              隱私權政策
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Footer
