import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import FormRequired from './FormRequired'

const FormSingle = ({ card, value, setValue }) => (
  <FormControl>
    {card.label && (
      <FormLabel>
        {card.label}
        <FormRequired />
      </FormLabel>
    )}
    <RadioGroup
      row={!!card.props?.row}
      value={value}
      onChange={event => setValue(event.target.value)}
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
