import React from 'react'

import { Card } from '@mui/material'

import cards from '../cards'
import { FormInput, FormMultiple, FormSingle } from '.'

const DashboardSurveyDetail = ({ surveyValue }) => (
  <>
    {cards
      .filter(card => ['input', 'multiple', 'single'].indexOf(card.type) !== -1)
      .filter(card => card?.visibility?.(surveyValue) ?? true)
      .map((card, index) => {
        const { name, validator } = card
        const value = surveyValue[name]

        return (
          <Card
            key={`card-${index}`}
            variant="outlined"
            sx={{ mx: 2, my: 4, px: 2, py: 4 }}
          >
            {card.type === 'input' && (
              <FormInput
                dashboard
                card={card}
                value={value}
                validated={validator?.(value) ?? true}
              />
            )}
            {card.type === 'single' && (
              <FormSingle
                dashboard
                card={card}
                value={value}
              />
            )}
            {card.type === 'multiple' && (
              <FormMultiple
                dashboard
                card={card}
                value={value}
              />
            )}
          </Card>
        )
      })}
    <pre>{JSON.stringify(surveyValue, null, 2)}</pre>
  </>
)

export default DashboardSurveyDetail
