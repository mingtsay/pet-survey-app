import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAndroid, faApple } from '@fortawesome/free-brands-svg-icons'
import {
  faBan,
  faCat,
  faDesktop,
  faDog,
  faGenderless,
  faMars,
  faMobile,
  faQuestion,
  faStore,
  faStoreSlash,
  faVenus,
} from '@fortawesome/free-solid-svg-icons'

const devices = {
  mobile: ['BlackBerry OS', 'Windows Mobile', 'Amazon OS'],
  desktop: [
    'Windows 3.11',
    'Windows 95',
    'Windows 98',
    'Windows 2000',
    'Windows XP',
    'Windows Server 2003',
    'Windows Vista',
    'Windows 7',
    'Windows 8',
    'Windows 8.1',
    'Windows 10',
    'Windows ME',
    'Windows CE',
    'Open BSD',
    'Sun OS',
    'Linux',
    'Mac OS',
    'QNX',
    'BeOS',
    'OS/2',
    'Chrome OS',
  ],
}

const DashboardSurveyListItem = ({ data, time, selected, onClick }) => {
  const {
    browser: { os },
    surveyValue: {
      gender,
      'owning-pets': owningPets,
      'owned-pets-type': ownedPetsType,
      'willing-buying': willingBuying,
      'willing-owning-pets': willingOwningPets,
    },
  } = data

  const genderIcon =
    (gender === 'male' && faMars) ||
    (gender === 'female' && faVenus) ||
    faGenderless

  const osIcon =
    (os === 'iOS' && faApple) ||
    (os === 'Android OS' && faAndroid) ||
    (devices.mobile.includes(os) && faMobile) ||
    (devices.desktop.includes(os) && faDesktop) ||
    faQuestion

  const petIcon =
    (owningPets === 'yes' &&
      ((ownedPetsType === 'cat' && faCat) ||
        (ownedPetsType === 'dog' && faDog))) ||
    faBan

  const buyingIcon =
    (((owningPets === 'yes' && willingBuying === 'yes') ||
      (owningPets === 'no' && willingOwningPets === 'yes')) &&
      faStore) ||
    faStoreSlash

  return (
    <ListItemButton
      selected={selected}
      onClick={onClick}
    >
      <ListItemIcon sx={{ mr: 1 }}>
        <FontAwesomeIcon
          fixedWidth
          icon={genderIcon}
        />
        <FontAwesomeIcon
          fixedWidth
          icon={osIcon}
        />
        <FontAwesomeIcon
          fixedWidth
          icon={petIcon}
        />
        <FontAwesomeIcon
          fixedWidth
          icon={buyingIcon}
        />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography sx={{ fontFamily: 'monospace' }}>{time}</Typography>
        }
      />
    </ListItemButton>
  )
}

const DashboardSurveyList = ({
  surveyList,
  selectedSurveyId,
  onSurveySelect,
}) => (
  <List
    sx={{ height: '40vh', overflowY: 'scroll' }}
    dense
    subheader={<li />}
    disablePadding
  >
    {Object.keys(surveyList).map(date => (
      <li key={date}>
        <ul>
          <ListSubheader>
            {date} ({surveyList[date].length})
          </ListSubheader>
          {surveyList[date].map(({ id, data, time }) => (
            <DashboardSurveyListItem
              key={id}
              data={data}
              time={time}
              selected={id === selectedSurveyId}
              onClick={() => onSurveySelect(id)}
            />
          ))}
        </ul>
      </li>
    ))}
  </List>
)

export default DashboardSurveyList
