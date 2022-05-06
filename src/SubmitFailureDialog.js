import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

const SubmitFailureDialog = ({ open, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
  >
    <DialogTitle>網路連線異常</DialogTitle>
    <DialogContent>
      <DialogContentText sx={{ my: 2 }}>
        由於您的網路連線不穩定，尚無法為您將問卷填寫結果送出，請確認您的網路連線後再重試一次，謝謝您。
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>關閉</Button>
    </DialogActions>
  </Dialog>
)

export default SubmitFailureDialog
