import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material'
import FormRequired from './FormRequired'

const FormMultiple = ({
  card,
  value,
  setValue = () => undefined,
  dashboard = false,
}) =>
  dashboard ? (
    <>
      <Typography variant="caption">{card.label}</Typography>
      <Divider
        orientation="vertical"
        flexItem
      />
      <Typography>
        {card.options
          .filter(({ value: v }) => value.selected.indexOf(v) !== -1)
          .concat((value.other && [{ label: value.other }]) || [])
          .map(({ label }) => label)
          .join('、')}
      </Typography>
    </>
  ) : (
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
