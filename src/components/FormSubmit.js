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
      送出問卷
    </Button>
  </>
)

export default FormSubmit
