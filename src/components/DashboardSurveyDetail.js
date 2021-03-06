import React from 'react'

import { Box, Card } from '@mui/material'

import cards from '../cards'
import { FormInput, FormMultiple, FormSingle } from '.'

const DashboardSurveyDetail = ({ id, surveyValue, invalidReason }) => (
  <Box
    sx={{
      overflowY: { xs: 'inherit', md: 'scroll' },
      height: { xs: 'auto', md: 'calc(100vh - 532px)' },
      p: 1,
    }}
  >
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 2,
        py: 1,
        '& hr.MuiDivider-root': {
          mx: 2,
        },
      }}
    >
      <FormInput
        dashboard
        card={{ label: '問卷代碼' }}
        value={id}
      />
    </Card>
    {invalidReason && (
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1,
          '& hr.MuiDivider-root': {
            mx: 2,
          },
          bgcolor: 'warning.main',
          color: 'warning.contrastText',
        }}
      >
        <FormInput
          dashboard
          card={{ label: '問卷無效原因' }}
          value={invalidReason}
        />
      </Card>
    )}
    {cards
      .filter(card => ['input', 'multiple', 'single'].indexOf(card.type) !== -1)
      .filter(card => card?.visibility?.(surveyValue) ?? true)
      .map((card, index) => {
        const { name } = card
        const value = surveyValue[name]

        return (
          <Card
            key={`card-${index}`}
            variant="outlined"
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 1,
              '& hr.MuiDivider-root': {
                mx: 2,
              },
            }}
          >
            {card.type === 'input' && (
              <FormInput
                dashboard
                card={card}
                value={value}
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
  </Box>
)

export default DashboardSurveyDetail
