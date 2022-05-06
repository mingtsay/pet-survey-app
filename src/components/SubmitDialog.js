import { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Tooltip,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ClipboardJS from 'clipboard'

const url = 'https://lovecollar.survey.oho.tw'
let clipboard

const SubmitDialog = ({ open, onClose }) => {
  const [isCopied, setCopied] = useState(false)
  const [isCopiedTimeout, setCopiedTimeout] = useState(0)

  const copyUrl = () => {
    setCopied(true)
    clearTimeout(isCopiedTimeout)
    setCopiedTimeout(setTimeout(() => setCopied(false), 3000))
  }

  useEffect(() => {
    clipboard = new ClipboardJS('#copy-url-btn')

    return () => {
      clearTimeout(isCopiedTimeout)
      clipboard.destroy()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>感謝您填寫本問卷</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ my: 2 }}>
          您填寫的問卷已送出，謝謝您撥冗參與本次的問卷調查，您的問卷內容將會是我們很重要的參考依據，謝謝您。
        </DialogContentText>
        <DialogContentText sx={{ my: 2 }}>
          如果可以，我們也歡迎您將本問卷分享給您的親朋好友，您可以複製下列網址將本問卷分享給他們：
        </DialogContentText>
        <OutlinedInput
          id="url"
          fullWidth
          value={url}
          endAdornment={
            <InputAdornment position="end">
              <Tooltip title={isCopied ? '已複製' : '複製網址'}>
                <IconButton
                  id="copy-url-btn"
                  edge="end"
                  onClick={copyUrl}
                  data-clipboard-target="#url"
                >
                  {isCopied ? <CheckIcon /> : <ContentCopyIcon />}
                </IconButton>
              </Tooltip>
            </InputAdornment>
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>關閉</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SubmitDialog
