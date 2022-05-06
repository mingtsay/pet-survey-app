import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Alert,
  AlertTitle,
  AppBar,
  Button,
  Container,
  CssBaseline,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  Assignment as AssignmentIcon,
  Email as EmailIcon,
  Key as KeyIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material'

import AuthService, { useUser } from '../services/AuthService'

const LoginScreen = () => {
  const navigate = useNavigate()
  const user = useUser()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showAuthError, setShowAuthError] = useState(false)
  const [showErrorTimeout, setShowErrorTimeout] = useState(0)

  useEffect(() => {
    if (user) navigate('/dashboard')

    return () => {
      clearTimeout(showErrorTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const showError = () => {
    setShowAuthError(true)
    clearTimeout(showErrorTimeout)
    setShowErrorTimeout(setTimeout(() => setShowAuthError(false), 5000))
  }

  const login = () => {
    AuthService.login({ email, password })
      .then(user => {
        if (user) navigate('/dashboard')
        else showError()
      })
      .catch(showError)
  }

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
            登入以查看問卷填寫狀態
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
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        <Alert
          severity="error"
          sx={{ mb: 4, visibility: showAuthError ? 'visible' : 'hidden' }}
        >
          <AlertTitle>驗證失敗</AlertTitle>
          您輸入的信箱或密碼不正確，請檢查您輸入的登入資訊後再次嘗試登入。
        </Alert>
        <TextField
          value={email}
          onChange={event => setEmail(event.target.value)}
          label="信箱"
          variant="outlined"
          type="email"
          fullWidth
          sx={{ m: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          value={password}
          onChange={event => setPassword(event.target.value)}
          label="密碼"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          sx={{ m: 1 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(v => !v)}
                  onMouseDown={event => event.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          sx={{ m: 1 }}
          onClick={login}
        >
          登入系統
        </Button>
      </Container>
    </>
  )
}

export default LoginScreen
