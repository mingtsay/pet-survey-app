import React, { useEffect, useState } from 'react'
import { Card, Typography } from '@mui/material'

import store from 'store2'

import firebase from '../firebase'
import cards from '../cards'
import {
  FormInput,
  FormMultiple,
  FormSingle,
  FormSubmit,
  SubmitDialog,
  SubmitFailureDialog,
} from '../components'

const loadSurveyValue = () => JSON.parse(store.get('surveyValue') || '{}') ?? {}
const saveSurveyValue = value => store.set('surveyValue', JSON.stringify(value))

const SurveyScreen = () => {
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
      await firebase.submitSurvey(surveyValue)
      setSurveyValue({}) // clear survey
      setOpenSubmitDialog(true)
    } catch (error) {
      setOpenSubmitFailureDialog(true)
    }
  }

  return (
    <>
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
    </>
  )
}

export default SurveyScreen