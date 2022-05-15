import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Alert,
  AppBar,
  Box,
  Button,
  Collapse,
  Container,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  Assignment as AssignmentIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Logout as LogoutIcon,
  ShowChart as ShowChartIcon,
} from '@mui/icons-material'

import AuthService, { useUser } from '../services/AuthService'
import { useSurveyService } from '../services/SurveyService'
import {
  DashboardStatistics,
  DashboardSurveyDetail,
  DashboardSurveyList,
  DashboardSurveyMeta,
  Footer,
} from '../components'

const DashboardScreen = () => {
  const navigate = useNavigate()
  const user = useUser()

  const surveySet = useSurveyService()
  const surveyCount = Object.values(surveySet).filter(
    survey => !survey.invalidReason
  ).length

  const [openSurveyList, setOpenSurveyList] = useState(true)
  const [selectedSurveyId, setSelectedSurveyId] = useState(null)
  const selectedSurvey = surveySet[selectedSurveyId] ?? {}

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const dateFormatter = d => {
    const z = (n, l = 2) => (('' + n).length < l ? z('0' + n, l) : '' + n)
    return {
      date: `${z(d.getFullYear(), 4)}/${z(d.getMonth() + 1)}/${z(d.getDate())}`,
      time: `${z(d.getHours())}:${z(d.getMinutes())}:${z(d.getSeconds())}`,
    }
  }

  // { [date]: [ survey, ... ] }
  const surveyList = {}
  Object.entries(surveySet)
    .sort(
      (a, b) =>
        b[1].timestamp.seconds - a[1].timestamp.seconds ||
        b[1].timestamp.nanoseconds - a[1].timestamp.nanoseconds
    )
    .forEach(([id, data]) => {
      const { date, time } = dateFormatter(
        new Date(data.timestamp.seconds * 1000)
      )
      if (!surveyList[date]) surveyList[date] = []
      surveyList[date].push({ id, data, time })
    })

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
        <Grid container>
          <Grid
            item
            xs={12}
            md={3}
          >
            <Paper>
              <Box sx={{ p: 4 }}>
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
                  有效問卷數量
                </Typography>
              </Box>
              <Divider />
              <List
                dense
                disablePadding
              >
                <ListItemButton
                  selected={selectedSurveyId === null}
                  onClick={() => setSelectedSurveyId(null)}
                >
                  <ListItemIcon>
                    <ShowChartIcon />
                  </ListItemIcon>
                  <ListItemText primary="問卷填答概況統計" />
                </ListItemButton>
                <Divider />
                <ListItemButton onClick={() => setOpenSurveyList(v => !v)}>
                  <ListItemText primary="問卷列表" />
                  {openSurveyList ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
                <Collapse
                  in={openSurveyList}
                  timeout="auto"
                >
                  <DashboardSurveyList
                    surveyList={surveyList}
                    selectedSurveyId={selectedSurveyId}
                    onSurveySelect={setSelectedSurveyId}
                  />
                </Collapse>
              </List>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
          >
            <Paper>
              {(!selectedSurveyId && (
                <DashboardStatistics surveySet={surveySet} />
              )) || (
                <>
                  <DashboardSurveyMeta
                    ip={selectedSurvey.ip}
                    browser={selectedSurvey.browser}
                    timestamp={selectedSurvey.timestamp}
                  />
                  <Divider />
                  <DashboardSurveyDetail
                    id={selectedSurveyId}
                    surveyValue={selectedSurvey.surveyValue}
                    invalidReason={selectedSurvey.invalidReason}
                  />
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default DashboardScreen
