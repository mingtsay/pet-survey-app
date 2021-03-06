import { Button, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const FormSubmit = ({ card, validated, submitHandler }) => (
  <>
    <Typography
      variant="body1"
      component="div"
    >
      {validated ? card.validatedText : card.unvalidatedText}
    </Typography>
    <Button
      disabled={!validated}
      variant="contained"
      endIcon={<SendIcon />}
      sx={{ marginTop: 2 }}
      onClick={submitHandler}
    >
      ιεΊεε·
    </Button>
  </>
)

export default FormSubmit
