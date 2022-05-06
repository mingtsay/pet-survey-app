import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from '@mui/material'
import FormRequired from './FormRequired'

const FormMultiple = ({ card, surveyValue, setSurveyValue }) => (
  <FormGroup>
    {card.label && (
      <FormLabel>
        {card.label}
        <FormRequired />
      </FormLabel>
    )}
    {card.options.map(option => (
      <FormControlLabel
        key={option.value}
        control={
          <Checkbox
            checked={
              surveyValue[card.name]?.selected?.includes?.(option.value) ??
              false
            }
            onChange={event => {
              setSurveyValue(oldSurveyValue => ({
                ...oldSurveyValue,
                [card.name]: {
                  ...oldSurveyValue[card.name],
                  selected: (
                    oldSurveyValue[card.name]?.selected?.filter?.(
                      value => value !== option.value
                    ) ?? []
                  )
                    .concat(event.target.checked ? [option.value] : [])
                    .sort(),
                },
              }))
            }}
          />
        }
        label={option.label}
      />
    ))}
    {card.otherInput && (
      <>
        <FormControlLabel
          control={
            <Checkbox
              checked={surveyValue[card.name]?.other !== undefined}
              onChange={event =>
                setSurveyValue(oldSurveyValue => ({
                  ...oldSurveyValue,
                  [card.name]: {
                    ...oldSurveyValue[card.name],
                    other: event.target.checked
                      ? oldSurveyValue[card.name]?.other ?? ''
                      : undefined,
                  },
                }))
              }
            />
          }
          label="其他"
        />
        <TextField
          required={surveyValue[card.name]?.other !== undefined}
          value={surveyValue[card.name]?.other ?? ''}
          onChange={event =>
            setSurveyValue(oldSurveyValue => ({
              ...oldSurveyValue,
              [card.name]: {
                ...oldSurveyValue[card.name],
                other: event.target.value,
              },
            }))
          }
        />
      </>
    )}
  </FormGroup>
)

export default FormMultiple
