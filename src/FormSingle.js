import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import FormRequired from './FormRequired'

const FormSingle = ({ card, surveyValue, setSurveyValue }) => (
  <FormControl>
    {card.label && (
      <FormLabel>
        {card.label}
        <FormRequired />
      </FormLabel>
    )}
    <RadioGroup
      row={!!card.props?.row}
      value={surveyValue[card.name] ?? ''}
      onChange={event =>
        setSurveyValue(oldSurveyValue => ({
          ...oldSurveyValue,
          [card.name]: event.target.value,
        }))
      }
    >
      {card.options.map(option => (
        <FormControlLabel
          key={option.value}
          value={option.value}
          control={<Radio />}
          label={option.label}
        />
      ))}
    </RadioGroup>
  </FormControl>
)

export default FormSingle
