import { Divider, InputAdornment, TextField, Typography } from '@mui/material'
import FormRequired from './FormRequired'

const FormInput = ({
  card,
  value,
  setValue = () => undefined,
  validated,
  dashboard = false,
}) =>
  dashboard ? (
    <>
      <Typography variant="caption">{card.label}</Typography>
      <Divider
        orientation="vertical"
        flexItem
      />
      <Typography>{value}</Typography>
    </>
  ) : (
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
