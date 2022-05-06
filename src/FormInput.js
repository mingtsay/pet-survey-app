import { InputAdornment, TextField, Typography } from '@mui/material'
import FormRequired from './FormRequired'

const FormInput = ({ card, surveyValue, setSurveyValue }) => (
  <>
    {card.label && (
      <Typography
        variant="body1"
        component="div"
      >
        {card.label}
        <FormRequired />
      </Typography>
    )}
    <TextField
      required
      type={card.inputType}
      InputProps={{
        endAdornment: card.unit && (
          <InputAdornment position="end">{card.unit}</InputAdornment>
        ),
      }}
      error={!(card.validator?.(surveyValue[card.name]) ?? true)}
      value={surveyValue[card.name] ?? ''}
      onChange={event =>
        setSurveyValue(oldSurveyValue => ({
          ...oldSurveyValue,
          [card.name]: event.target.value,
        }))
      }
    />
  </>
)

export default FormInput
