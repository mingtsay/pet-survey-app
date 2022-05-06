import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Container,
  CssBaseline,
  IconButton,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import {
  Assignment as AssignmentIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material'

import Footer from '../components/Footer'

const TermsScreen = () => {
  const trigger = useScrollTrigger()
  const navigate = useNavigate()

  return (
    <>
      <CssBaseline />
      <AppBar />
      <Slide
        appear={false}
        direction="down"
        in={!trigger}
      >
        <AppBar>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              使用條款
            </Typography>
            <Tooltip title="返回問卷填寫頁面">
              <IconButton
                size="large"
                color="inherit"
                onClick={() => navigate('/')}
              >
                <AssignmentIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="查看問卷填寫狀態">
              <IconButton
                size="large"
                color="inherit"
                onClick={() => navigate('/dashboard')}
              >
                <DashboardIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
      <Container></Container>
      <Footer />
    </>
  )
}

export default TermsScreen
