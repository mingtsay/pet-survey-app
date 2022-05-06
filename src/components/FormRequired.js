import { Typography } from '@mui/material'

const FormRequired = () => (
  <Typography
    variant="caption"
    component="span"
    sx={{ color: 'red', mx: 1 }}
  >
    *必填
  </Typography>
)

export default FormRequired
