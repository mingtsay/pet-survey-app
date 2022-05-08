import { Card, Divider, Grid, Typography } from '@mui/material'

const dateTimeFormatter = d => {
  const z = (n, l = 2) => (('' + n).length < l ? z('0' + n) : '' + n)
  return [
    [z(d.getFullYear(), 4), z(d.getMonth() + 1), z(d.getDate())].join('/'),
    [z(d.getHours()), z(d.getMinutes()), z(d.getSeconds())].join(':'),
  ].join(' ')
}

const DashboardSurveyMeta = ({ ip, browser, timestamp }) => (
  <>
    <Grid
      container
      sx={{
        '& div.MuiPaper-root': {
          display: 'flex',
          alignItems: 'center',
          // width: 'fit-content',
          px: 2,
          py: 1,
          '& hr.MuiDivider-root': {
            mx: 2,
          },
        },
      }}
    >
      <Grid
        item
        xs={12}
        md={4}
      >
        <Card>
          <Typography>IPv4</Typography>
          <Divider
            orientation="vertical"
            flexItem
          />
          <Typography>
            <code>{ip.v4 || '-'}</code>
          </Typography>
        </Card>
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
      >
        <Card>
          <Typography>IPv6</Typography>
          <Divider
            orientation="vertical"
            flexItem
          />
          <Typography>
            <code>{ip.v6 || '-'}</code>
          </Typography>
        </Card>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
      >
        <Card>
          <Typography>作業系統</Typography>
          <Divider
            orientation="vertical"
            flexItem
          />
          <Typography>
            <code>{browser.os || '-'}</code>
          </Typography>
        </Card>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
      >
        <Card>
          <Typography>填表日期</Typography>
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
      </Grid>
    </Grid>
  </>
)

export default DashboardSurveyMeta
