import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Card,
  Container,
  CssBaseline,
  IconButton,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'

import store from 'store2'

import SurveyService from '../services/SurveyService'
import cards from '../cards'
import {
  FormInput,
  FormMultiple,
  FormSingle,
  FormSubmit,
  SubmitDialog,
  SubmitFailureDialog,
} from '../components'
import Footer from '../components/Footer'

const loadSurveyValue = () => JSON.parse(store.get('surveyValue') || '{}') ?? {}
const saveSurveyValue = value => store.set('surveyValue', JSON.stringify(value))

const SurveyScreen = () => {
  const trigger = useScrollTrigger()
  const navigate = useNavigate()

  const [surveyValue, setSurveyValue] = useState(loadSurveyValue())
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false)
  const [openSubmitFailureDialog, setOpenSubmitFailureDialog] = useState(false)

  useEffect(() => {
    setSurveyValue(loadSurveyValue())
  }, [])
  useEffect(() => {
    saveSurveyValue(surveyValue)
  }, [surveyValue])

  const submitHandler = async () => {
    try {
      await SurveyService.submit(surveyValue)
      setSurveyValue({}) // clear survey
      setOpenSubmitDialog(true)
    } catch (error) {
      setOpenSubmitFailureDialog(true)
    }
  }

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
              飼養寵物相關狀況問卷調查
            </Typography>
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
      <Container>
        {cards
          .filter(card => card?.visibility?.(surveyValue) ?? true)
          .map((card, index) => {
            const { name, validator } = card
            const value = surveyValue[name]
            const setValue = newValue =>
              setSurveyValue(oldSurveyValue => ({
                ...oldSurveyValue,
                [name]:
                  typeof newValue === 'function' ? newValue(value) : newValue,
              }))

            return (
              <Card
                key={`card-${index}`}
                variant="outlined"
                sx={{ mx: 2, my: 4, px: 2, py: 4 }}
              >
                {card.text && (
                  <Typography
                    variant="body1"
                    component="div"
                  >
                    {card.text}
                  </Typography>
                )}
                {card.type === 'input' && (
                  <FormInput
                    card={card}
                    value={value}
                    setValue={setValue}
                    validated={validator?.(value) ?? true}
                  />
                )}
                {card.type === 'single' && (
                  <FormSingle
                    card={card}
                    value={value}
                    setValue={setValue}
                  />
                )}
                {card.type === 'multiple' && (
                  <FormMultiple
                    card={card}
                    value={value}
                    setValue={setValue}
                  />
                )}
                {card.type === 'submit' && (
                  <FormSubmit
                    card={card}
                    validated={validator?.(surveyValue) ?? true}
                    submitHandler={submitHandler}
                  />
                )}
              </Card>
            )
          })}
        <SubmitDialog
          open={openSubmitDialog}
          onClose={() => setOpenSubmitDialog(false)}
        />
        <SubmitFailureDialog
          open={openSubmitFailureDialog}
          onClose={() => setOpenSubmitFailureDialog(false)}
        />
      </Container>
      <Footer />
    </>
  )
}

export default SurveyScreen
