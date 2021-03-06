import {
  Box,
  Card,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import cards from '../cards'

const DashboardStatistics = ({ surveySet }) => {
  const statistics = {}
  if (surveySet)
    Object.values(surveySet).forEach(({ surveyValue, invalidReason }) => {
      if (invalidReason) return // skipping invalid surveys
      Object.entries(surveyValue).forEach(([key, value]) => {
        // skip not valid options
        const card = cards.find(({ name }) => name === key)
        if (!(card.visibility?.(surveyValue) ?? true)) return

        if (!statistics[key]) statistics[key] = {}
        if (value.selected || value.other) {
          ;[...(value.selected || []), value.other]
            .filter(v => v)
            .forEach(value => {
              if (!statistics[key][value]) statistics[key][value] = 0
              ++statistics[key][value]
            })
          return
        }

        if (!statistics[key][value]) statistics[key][value] = 0
        ++statistics[key][value]
      })
    })

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        height: { xs: 'inherit', md: 'calc(100vh - 347px)' },
        overflowY: { xs: 'inherit', md: 'scroll' },
      }}
    >
      {cards
        .filter(
          ({ type, name }) =>
            ['input', 'multiple', 'single'].includes(type) && statistics[name]
        )
        .map(card => (
          <TableContainer
            key={card.name}
            component={Card}
            sx={{ m: 1, width: 'auto' }}
          >
            <Table
              size="small"
              sx={{ width: 'auto' }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    sx={{
                      bgcolor: 'info.main',
                      color: 'info.contrastText',
                    }}
                  >
                    {card.label}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>??????</TableCell>
                  <TableCell>??????</TableCell>
                </TableRow>
              </TableHead>
              <tbody>
                {card.type === 'input' &&
                  Object.entries(statistics[card.name]).map(([key, value]) => (
                    <TableRow key={`${card.name}-${key}`}>
                      <TableCell
                        component="th"
                        scope="row"
                      >
                        {key}
                      </TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                {['multiple', 'single'].includes(card.type) &&
                  card.options.map(({ label, value }) => (
                    <TableRow key={`${card.name}-${value}`}>
                      <TableCell
                        component="th"
                        scope="row"
                      >
                        {label}
                      </TableCell>
                      <TableCell>
                        {statistics[card.name]?.[value] || 0}
                      </TableCell>
                    </TableRow>
                  ))}
              </tbody>
            </Table>
          </TableContainer>
        ))}
    </Box>
  )
}

export default DashboardStatistics
