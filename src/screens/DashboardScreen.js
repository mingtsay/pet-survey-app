import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Alert,
  AppBar,
  Box,
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
import SurveyService from '../services/SurveyService'
import Footer from '../components/Footer'

const DashboardScreen = () => {
  const navigate = useNavigate()
  const user = useUser()

  const [surveyCount, setSurveyCount] = useState(0)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    SurveyService.count().then(setSurveyCount)

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
        <Card sx={{ mx: 'auto', my: 4, p: 4, width: 250 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <AssignmentIcon sx={{ fontSize: 64 }} />
            <Typography sx={{ fontSize: 64 }}>{surveyCount}</Typography>
          </Box>
          <Typography sx={{ textAlign: 'center' }}>
            已收集到的問卷數量
          </Typography>
        </Card>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            variant="contained"
            disabled
          >
            查看問卷內容（工事中）
          </Button>
          <Button
            variant="contained"
            disabled
          >
            查看統計資料（工事中）
          </Button>
          <Button
            variant="contained"
            disabled
          >
            匯出問卷資料（工事中）
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  )
}

export default DashboardScreen
