import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import FormRequired from './FormRequired'

const FormSingle = ({
  card,
  value,
  setValue = () => undefined,
  dashboard = false,
}) =>
  dashboard ? (
    <>
      <Typography>{card.label}</Typography>
      <Typography>
        {card.options.find(({ value: v }) => value === v).label}
      </Typography>
    </>
  ) : (
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
