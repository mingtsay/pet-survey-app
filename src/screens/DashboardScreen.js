import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Alert,
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  Assignment as AssignmentIcon,
  Logout as LogoutIcon,
  ShowChart as ShowChartIcon,
} from '@mui/icons-material'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAndroid, faApple } from '@fortawesome/free-brands-svg-icons'
import {
  faBan,
  faCat,
  faDesktop,
  faDog,
  faGenderless,
  faMars,
  faMobile,
  faQuestion,
  faStore,
  faStoreSlash,
  faVenus,
} from '@fortawesome/free-solid-svg-icons'

import AuthService, { useUser } from '../services/AuthService'
import { useSurveyService } from '../services/SurveyService'
import Footer from '../components/Footer'

const DashboardScreen = () => {
  const navigate = useNavigate()
  const user = useUser()

  const surveySet = useSurveyService()
  const surveyCount = Object.keys(surveySet).length

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
    .sort((a, b) => b[1].timestamp.seconds - a[1].timestamp.seconds)
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
                  已收集到的問卷數量
                </Typography>
              </Box>
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
              </List>
              <Divider />
              <Typography
                variant="subtitle1"
                sx={{ mx: 2, mt: 2 }}
              >
                問卷列表
              </Typography>
              <List
                sx={{ height: '40vh', overflowY: 'scroll' }}
                dense
                subheader={<li />}
                disablePadding
              >
                {Object.keys(surveyList).map(date => (
                  <li key={date}>
                    <ul>
                      <ListSubheader>{date}</ListSubheader>
                      {surveyList[date].map(({ id, data, time }) => {
                        const {
                          browser: { os },
                          surveyValue: {
                            gender,
                            'owning-pets': owningPets,
                            'owned-pets-type': ownedPetsType,
                            'willing-buying': willingBuying,
                            'willing-owning-pets': willingOwningPets,
                          },
                        } = data

                        const genderIcon =
                          (gender === 'male' && faMars) ||
                          (gender === 'female' && faVenus) ||
                          faGenderless
                        const osIcon =
                          (os === 'iOS' && faApple) ||
                          (os === 'Android OS' && faAndroid) ||
                          ([
                            'BlackBerry OS',
                            'Windows Mobile',
                            'Amazon OS',
                          ].includes(os) &&
                            faMobile) ||
                          ([
                            'Windows 3.11',
                            'Windows 95',
                            'Windows 98',
                            'Windows 2000',
                            'Windows XP',
                            'Windows Server 2003',
                            'Windows Vista',
                            'Windows 7',
                            'Windows 8',
                            'Windows 8.1',
                            'Windows 10',
                            'Windows ME',
                            'Windows CE',
                            'Open BSD',
                            'Sun OS',
                            'Linux',
                            'Mac OS',
                            'QNX',
                            'BeOS',
                            'OS/2',
                            'Chrome OS',
                          ].includes(os) &&
                            faDesktop) ||
                          faQuestion

                        const petIcon =
                          (owningPets === 'yes' &&
                            ((ownedPetsType === 'cat' && faCat) ||
                              (ownedPetsType === 'dog' && faDog))) ||
                          faBan

                        const buyingIcon =
                          (((owningPets === 'yes' && willingBuying === 'yes') ||
                            (owningPets === 'no' &&
                              willingOwningPets === 'yes')) &&
                            faStore) ||
                          faStoreSlash

                        return (
                          <ListItemButton
                            key={id}
                            selected={id === selectedSurveyId}
                            onClick={() => setSelectedSurveyId(id)}
                          >
                            <ListItemIcon sx={{ mr: 1 }}>
                              <FontAwesomeIcon
                                fixedWidth
                                icon={genderIcon}
                              />
                              <FontAwesomeIcon
                                fixedWidth
                                icon={osIcon}
                              />
                              <FontAwesomeIcon
                                fixedWidth
                                icon={petIcon}
                              />
                              <FontAwesomeIcon
                                fixedWidth
                                icon={buyingIcon}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography sx={{ fontFamily: 'monospace' }}>
                                  {time}
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        )
                      })}
                    </ul>
                  </li>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
          >
            <pre>
              {selectedSurvey && JSON.stringify(selectedSurvey, null, 2)}
            </pre>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default DashboardScreen
