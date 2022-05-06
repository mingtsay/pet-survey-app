import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AppBar,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  Assignment as AssignmentIcon,
  ExpandMore as ExpandMoreIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'

import AuthService, { useUser } from '../services/AuthService'
import SurveyService from '../services/SurveyService'
import Footer from '../components/Footer'

const DashboardScreen = () => {
  const navigate = useNavigate()
  const user = useUser()

  const [list, setList] = useState([])

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    SurveyService.list().then(list => setList(list ?? []))

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
        {list &&
          list?.map?.(({ id, data }) => (
            <Accordion key={id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{id}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component="pre">
                  {JSON.stringify(data, null, 2)}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
      </Container>
      <Footer />
    </>
  )
}

export default DashboardScreen
