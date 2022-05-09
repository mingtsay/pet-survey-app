import { Box, Card, Divider, Typography } from '@mui/material'

const dateTimeFormatter = d => {
  const z = (n, l = 2) => (('' + n).length < l ? z('0' + n) : '' + n)
  return [
    [z(d.getFullYear(), 4), z(d.getMonth() + 1), z(d.getDate())].join('/'),
    [z(d.getHours()), z(d.getMinutes()), z(d.getSeconds())].join(':'),
  ].join(' ')
}

const DashboardSurveyMeta = ({ ip, browser, timestamp }) => (
  <>
    <Box
      sx={{
        height: 184,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: 1,
        '& div.MuiPaper-root': {
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1,
          '& hr.MuiDivider-root': {
            mx: 2,
          },
        },
      }}
    >
      <Card variant="outlined">
        <Typography variant="caption">IPv4</Typography>
        <Divider
          orientation="vertical"
          flexItem
        />
        <Typography>
          <code>{ip.v4 || '-'}</code>
        </Typography>
      </Card>
      <Card variant="outlined">
        <Typography variant="caption">IPv6</Typography>
        <Divider
          orientation="vertical"
          flexItem
        />
        <Typography>
          <code>{ip.v6 || '-'}</code>
        </Typography>
      </Card>
      <Card variant="outlined">
        <Typography variant="caption">作業系統</Typography>
        <Divider
          orientation="vertical"
          flexItem
        />
        <Typography>
          <code>{browser.os || '-'}</code>
        </Typography>
      </Card>
      <Card variant="outlined">
        <Typography variant="caption">填表日期</Typography>
        <Divider
          orientation="vertical"
          flexItem
        />
        <Typography>
          <code>
            {dateTimeFormatter(new Date(timestamp.seconds * 1000)) || '-'}
          </code>
        </Typography>
      </Card>
    </Box>
  </>
)

export default DashboardSurveyMeta
