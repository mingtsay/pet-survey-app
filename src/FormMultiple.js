import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from '@mui/material'
import FormRequired from './FormRequired'

const FormMultiple = ({ card, value, setValue }) => (
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
            checked={value?.selected?.includes?.(option.value) ?? false}
            onChange={event =>
              setValue(oldValue => ({
                ...oldValue,
                selected: (
                  oldValue?.selected?.filter?.(
                    value => value !== option.value
                  ) ?? []
                )
                  .concat(event.target.checked ? [option.value] : [])
                  .sort(),
              }))
            }
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
              checked={value?.other !== undefined}
              onChange={event =>
                setValue(oldValue => ({
                  ...oldValue,
                  other: event.target.checked
                    ? oldValue?.other ?? ''
                    : undefined,
                }))
              }
            />
          }
          label="其他"
        />
        <TextField
          error={value?.other === ''}
          required={value?.other !== undefined}
          value={value?.other ?? ''}
          onChange={event =>
            setValue(oldValue => ({
              ...oldValue,
              other: event.target.value,
            }))
          }
        />
      </>
    )}
  </FormGroup>
)

export default FormMultiple
