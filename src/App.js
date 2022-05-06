import React, { useEffect, useState } from 'react'
import {
  AppBar,
  Card,
  Container,
  CssBaseline,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import store from 'store2'

import SubmitDialog from './SubmitDialog'
import cards from './cards'
import FormSubmit from './FormSubmit'
import FormSingle from './FormSingle'
import FormMultiple from './FormMultiple'
import FormInput from './FormInput'

const loadSurveyValue = () => JSON.parse(store.get('surveyValue') || '{}') ?? {}
const saveSurveyValue = value => store.set('surveyValue', JSON.stringify(value))

const App = () => {
  const trigger = useScrollTrigger()

  const [surveyValue, setSurveyValue] = useState(loadSurveyValue())
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false)

  useEffect(() => {
    setSurveyValue(loadSurveyValue())
  }, [])
  useEffect(() => {
    saveSurveyValue(surveyValue)
  }, [surveyValue])

  const submitHandler = () => setOpenSubmitDialog(true)

  return (
    <React.Fragment>
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
        {cards
          .filter(card => card?.visibility?.(surveyValue) ?? true)
          .map((card, index) => (
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
                  surveyValue={surveyValue}
                  setSurveyValue={setSurveyValue}
                />
              )}
              {card.type === 'single' && (
                <FormSingle
                  card={card}
                  surveyValue={surveyValue}
                  setSurveyValue={setSurveyValue}
                />
              )}
              {card.type === 'multiple' && (
                <FormMultiple
                  card={card}
                  surveyValue={surveyValue}
                  setSurveyValue={setSurveyValue}
                />
              )}
              {card.type === 'submit' && (
                <FormSubmit
                  card={card}
                  surveyValue={surveyValue}
                  submitHandler={submitHandler}
                />
              )}
            </Card>
          ))}
        <SubmitDialog
          open={openSubmitDialog}
          onClose={() => setOpenSubmitDialog(false)}
        />
        <Card>
          <pre>{JSON.stringify(surveyValue, null, 2)}</pre>
        </Card>
      </Container>
    </React.Fragment>
  )
}

export default App
