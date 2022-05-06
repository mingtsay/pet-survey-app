import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import {
  AppBar,
  Container,
  CssBaseline,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material'

import { LoginScreen, SurveyScreen } from './screens'

const App = () => {
  const trigger = useScrollTrigger()

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
            >
              飼養寵物相關狀況問卷調查
            </Typography>
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<SurveyScreen />}
            />
            <Route
              path="login"
              element={<LoginScreen />}
            />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  )
}

export default App
