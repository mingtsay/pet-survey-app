import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Divider,
  Link,
  Tooltip,
  Typography,
} from '@mui/material'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Typography sx={{ fontSize: 'small' }}>
            &copy; 2022 Love Collar 企劃團隊
          </Typography>
          <Tooltip title="本網頁原始碼公開且部署於 GitHub 上">
            <Link href="https://github.com/mingtsay/pet-survey-app">
              <FontAwesomeIcon
                icon={faGithub}
                fixedWidth
              />
            </Link>
          </Tooltip>
          <Box sx={{ fontSize: 'small' }}>
            <Link
              href="/#/terms"
              onClick={handleLinkEvent('/terms')}
            >
              使用條款
            </Link>
            {' | '}
            <Link
              href="/#/privacy"
              onClick={handleLinkEvent('/privacy')}
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
