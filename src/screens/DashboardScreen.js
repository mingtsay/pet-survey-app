import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Alert,
  AppBar,
  Button,
  Card,
  Container,
  CssBaseline,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  Assignment as AssignmentIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'

import AuthService, { useUser } from '../services/AuthService'

const DashboardScreen = () => {
  const navigate = useNavigate()
  const user = useUser()

  useEffect(() => {
    if (!user) navigate('/login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            問卷填寫狀態
          </Typography>
          <Tooltip title="登出系統">
            <IconButton
              size="large"
              color="inherit"
              onClick={() => AuthService.logout()}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="返回問卷填寫頁面">
            <IconButton
              size="large"
              color="inherit"
              onClick={() => navigate('/')}
            >
              <AssignmentIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        <Alert
          variant="outlined"
          severity="success"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => AuthService.logout()}
            >
              登出
            </Button>
          }
        >
          您正在以 <strong>{user?.email}</strong> 的身份登入。
        </Alert>
      </Container>
    </>
  )
}

export default DashboardScreen
