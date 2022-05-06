import { Button, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const FormSubmit = ({ card, surveyValue, submitHandler }) => (
  <>
    <Typography
      variant="body1"
      component="div"
    >
      {card.validator(surveyValue) ? card.validatedText : card.unvalidatedText}
    </Typography>
    <Button
      disabled={!card.validator(surveyValue)}
      variant="contained"
      endIcon={<SendIcon />}
      sx={{ marginTop: 2 }}
      onClick={submitHandler}
    >
      送出問卷
    </Button>
  </>
)

export default FormSubmit
