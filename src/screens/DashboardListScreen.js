import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'

import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'

const DashboardListScreen = () => {
  const list = []

  return (
    <>
      {list &&
        list?.map?.(({ id, data }) => (
          <Accordion key={id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{id}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="pre">
                {JSON.stringify(data, null, 2)}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </>
  )
}

export default DashboardListScreen
