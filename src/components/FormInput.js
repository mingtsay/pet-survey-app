import { InputAdornment, TextField, Typography } from '@mui/material'
import FormRequired from './FormRequired'

const FormInput = ({ card, value, setValue, validated }) => (
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
      error={!validated}
      value={value}
      onChange={event => setValue(event.target.value)}
    />
  </>
)

export default FormInput
