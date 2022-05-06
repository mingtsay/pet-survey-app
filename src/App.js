import React, { useEffect, useState } from 'react'
import {
  AppBar,
  Button,
  Card,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Slide,
  TextField,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import store from 'store2'

const cards = [
  {
    name: 'description',
    text: '我們是致理科技大學企業管理學系一年級的學生，此問卷為創新與創業精神專題報告的一部份。我們在此專題中規劃了寵物科技產品「Love Collar」，透過讓貓、狗配戴項圈的方式並結合手機 App 即可查看毛小孩的健康狀況、定位等相關資訊。我們希望透過問卷調查來瞭解此產品市場接受度，您需要花費大約 5 至 10 分鐘的時間填寫問卷。',
    type: 'typography',
  },
  {
    name: 'gender',
    label: '性別',
    type: 'single',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
      { label: '其他/不透露', value: 'other' },
    ],
    props: { row: true },
  },
  {
    name: 'age',
    label: '年齡',
    type: 'single',
    options: [
      { label: '未滿20歲', value: '0' },
      { label: '20~29歲', value: '20' },
      { label: '30~45歲', value: '30' },
      { label: '46~65歲', value: '45' },
      { label: '65歲以上', value: '65' },
    ],
  },
  {
    name: 'owning-pets',
    label: '您的家中是否有飼養寵物？',
    type: 'single',
    visibility: surveyValue =>
      [surveyValue.age, surveyValue.age !== '0'].every(Boolean),
    options: [
      { label: '是', value: 'yes' },
      { label: '否', value: 'no' },
    ],
  },
  {
    name: 'reason-not-owning-pets',
    label: '承上題，沒有飼養寵物的原因為何？',
    type: 'multiple',
    visibility: surveyValue =>
      [
        surveyValue.age,
        surveyValue.age !== '0',
        surveyValue['owning-pets'] === 'no',
      ].every(Boolean),
    options: [
      { label: '環境因素導致無法飼養', value: 'environment' },
      { label: '不喜歡飼養寵物', value: 'dislike' },
      { label: '自己或家人對寵物過敏', value: 'allergy' },
      { label: '寵物醫療費用高', value: 'health-caring-costly' },
      { label: '怕照顧寵物很花時間', value: 'taking-care-takes-time' },
      { label: '無法面對與寵物的生離死別', value: 'pets-leaving' },
      { label: '飼養寵物的相關花費高', value: 'pets-related-goods-costly' },
    ],
    otherInput: true,
  },
  {
    name: 'owned-pets-type',
    label: '您的家中飼養的寵物為？',
    type: 'single',
    visibility: surveyValue =>
      [
        surveyValue.age,
        surveyValue.age !== '0',
        surveyValue['owning-pets'] === 'yes',
      ].every(Boolean),
    options: [
      { label: '貓', value: 'cat' },
      { label: '狗', value: 'dog' },
    ],
  },
  {
    name: 'owned-pets-amount',
    label: '您的家中飼養的寵物數量為？',
    type: 'input',
    inputType: 'number',
    unit: '隻',
    visibility: surveyValue =>
      [
        surveyValue.age,
        surveyValue.age !== '0',
        surveyValue['owning-pets'] === 'yes',
      ].every(Boolean),
    validator: value => !value || /^\d+$/.test(value),
  },
  {
    name: 'owned-pets-chip-embeded',
    label: '您的家中飼養的寵物是否有植入晶片？',
    type: 'single',
    visibility: surveyValue =>
      [
        surveyValue.age,
        surveyValue.age !== '0',
        surveyValue['owning-pets'] === 'yes',
      ].every(Boolean),
    options: [
      { label: '是', value: 'yes' },
      { label: '否', value: 'no' },
    ],
  },
  {
    name: 'pets-issue',
    label: '平時最擔心寵物面臨哪些問題？',
    type: 'multiple',
    visibility: surveyValue =>
      [
        surveyValue.age,
        surveyValue.age !== '0',
        surveyValue['owning-pets'] === 'yes',
      ].every(Boolean),
    options: [
      { label: '醫療費用昂貴', value: 'health-care-fee' },
      { label: '寵物走失', value: 'lost' },
      { label: '面對生離死別', value: 'death' },
      { label: '未知的健康狀況', value: 'health-condition' },
    ],
    otherInput: true,
  },
  {
    name: 'pets-sick',
    label: '您是否有過寵物生病的經驗？請簡單說明。',
    type: 'input',
    inputType: 'text',
    visibility: surveyValue =>
      [
        surveyValue.age,
        surveyValue.age !== '0',
        surveyValue['owning-pets'] === 'yes',
      ].every(Boolean),
  },
  {
    name: 'willing-owning-pets',
    label:
      '如果有個能透過手機 App 連線來查詢寵物健康狀況等資訊的寵物科技產品，您會考慮飼養寵物嗎？',
    type: 'single',
    visibility: surveyValue =>
      [
        surveyValue.age,
        surveyValue.age !== '0',
        surveyValue['owning-pets'] === 'no',
      ].every(Boolean),
    options: [
      { label: '會', value: 'yes' },
      { label: '不會', value: 'no' },
    ],
  },
  {
    name: 'willing-buying',
    label:
      '如果有個能透過手機 App 連線來查詢寵物健康狀況等資訊的寵物科技產品，您會考慮購買嗎？',
    type: 'single',
    visibility: surveyValue =>
      [
        surveyValue.age,
        surveyValue.age !== '0',
        surveyValue['owning-pets'] === 'yes',
      ].every(Boolean),
    options: [
      { label: '會', value: 'yes' },
      { label: '不會', value: 'no' },
    ],
  },
  {
    name: 'product-price-range',
    label: '承上題，您認為該寵物科技產品價格應該落在哪個區間內？',
    type: 'single',
    visibility: surveyValue =>
      [
        surveyValue.age,
        surveyValue.age !== '0',
        [
          [
            surveyValue['owning-pets'] === 'yes',
            surveyValue['willing-buying'] === 'yes',
          ].every(Boolean),
          [
            surveyValue['owning-pets'] === 'no',
            surveyValue['willing-owning-pets'] === 'yes',
          ].every(Boolean),
        ].some(Boolean),
      ].every(Boolean),
    options: [
      { label: '1,000~2,000元', value: '2000' },
      { label: '2,000~3,000元', value: '3000' },
      { label: '5,000元以上', value: '5000' },
    ],
  },
  {
    name: 'willing-subscription',
    label:
      '承上題，該寵物科技產品提供訂閱制服務（週期性付款），您會考慮購買訂閱制服務嗎？',
    type: 'single',
    visibility: surveyValue =>
      [
        surveyValue.age,
        surveyValue.age !== '0',
        [
          [
            surveyValue['owning-pets'] === 'yes',
            surveyValue['willing-buying'] === 'yes',
          ].every(Boolean),
          [
            surveyValue['owning-pets'] === 'no',
            surveyValue['willing-owning-pets'] === 'yes',
          ].every(Boolean),
        ].some(Boolean),
      ].every(Boolean),
    options: [
      { label: '會', value: 'yes' },
      { label: '不會', value: 'no' },
    ],
  },
  {
    name: 'channel',
    label: '您希望透過下列哪些管道來瞭解本產品？',
    type: 'multiple',
    visibility: surveyValue =>
      [
        surveyValue.age,
        surveyValue.age !== '0',
        [
          [
            surveyValue['owning-pets'] === 'yes',
            surveyValue['willing-buying'] === 'yes',
          ].every(Boolean),
          [
            surveyValue['owning-pets'] === 'no',
            surveyValue['willing-owning-pets'] === 'yes',
          ].every(Boolean),
        ].some(Boolean),
      ].every(Boolean),
    options: [
      { label: '產品官方網站', value: 'official-website' },
      { label: '寵物相關網站平台', value: 'pets-related-website' },
      { label: '社交平台', value: 'social-platform' },
      { label: '電商平台', value: 'ec-platform' },
      { label: '特約寵物用品店', value: 'pets-store' },
    ],
  },
  {
    name: 'trial',
    label: '若本產品提供一週的試用服務，您會願意試用在您的愛寵上嗎？',
    type: 'single',
    visibility: surveyValue =>
      [
        surveyValue.age,
        surveyValue.age !== '0',
        [
          [
            surveyValue['owning-pets'] === 'yes',
            surveyValue['willing-buying'] === 'yes',
          ].every(Boolean),
          [
            surveyValue['owning-pets'] === 'no',
            surveyValue['willing-owning-pets'] === 'yes',
          ].every(Boolean),
        ].some(Boolean),
      ].every(Boolean),
    options: [
      { label: '願意', value: 'yes' },
      { label: '不願意', value: 'no' },
    ],
  },
  {
    name: 'not-targeting',
    text: '您非本問卷的目標客群，感謝您的參與。',
    type: 'typography',
    visibility: surveyValue => surveyValue.age === '0',
  },
  {
    name: 'submit',
    validatedText: '感謝您填寫本問卷，請點選下方按鈕即可將本問卷送出。',
    unvalidatedText: '您尚有未填寫完成的問卷欄位，請填寫完成後即可送出。',
    type: 'submit',
    visibility: surveyValue =>
      [
        surveyValue.age !== '0',
        [
          [
            surveyValue['owning-pets'] === 'yes',
            surveyValue['willing-buying'] === 'no',
          ].every(Boolean),
          [
            surveyValue['owning-pets'] === 'no',
            surveyValue['willing-owning-pets'] === 'no',
          ].every(Boolean),
          [
            surveyValue['owning-pets'] === 'yes',
            surveyValue['willing-buying'] === 'yes',
            surveyValue['trial'],
          ].every(Boolean),
          [
            surveyValue['owning-pets'] === 'no',
            surveyValue['willing-owning-pets'] === 'yes',
            surveyValue['trial'],
          ].every(Boolean),
        ].some(Boolean),
      ].every(Boolean),
    validator: surveyValue => {
      return [
        surveyValue.gender,
        surveyValue.age !== '0',
        [
          [
            surveyValue['owning-pets'] === 'yes',
            surveyValue['owned-pets-type'],
            surveyValue['owned-pets-amount'],
            surveyValue['owned-pets-chip-embeded'],
            (surveyValue['pets-issue']?.selected?.length ?? 0) > 0,
            [
              surveyValue['pets-issue']?.other === undefined,
              surveyValue['pets-issue']?.other !== '',
            ].some(Boolean),
            surveyValue['pets-sick'],
            [
              [
                surveyValue['willing-buying'] === 'yes',
                surveyValue['product-price-range'],
                surveyValue['willing-subscription'],
                (surveyValue.channel?.selected?.length ?? 0) > 0,
                surveyValue.trial,
              ].every(Boolean),
              surveyValue['willing-buying'] === 'no',
            ].some(Boolean),
          ].every(Boolean),
          [
            surveyValue['owning-pets'] === 'no',
            (surveyValue['reason-not-owning-pets']?.selected?.length ?? 0) > 0,
            [
              surveyValue['reason-not-owning-pets']?.other === undefined,
              surveyValue['reason-not-owning-pets']?.other !== '',
            ].some(Boolean),
            [
              [
                surveyValue['willing-owning-pets'] === 'yes',
                surveyValue['product-price-range'],
                surveyValue['willing-subscription'],
                (surveyValue.channel?.selected?.length ?? 0) > 0,
                surveyValue.trial,
              ].every(Boolean),
              surveyValue['willing-owning-pets'] === 'no',
            ].some(Boolean),
          ].every(Boolean),
        ].some(Boolean),
      ].every(Boolean)
    },
  },
]

const loadSurveyValue = () => {
  try {
    return JSON.parse(store.get('surveyValue') || '{}') ?? {}
  } catch (error) {
    return {}
  }
}

const saveSurveyValue = value => {
  try {
    const valueJson = JSON.stringify(value)
    store.set('surveyValue', valueJson)
  } catch (error) {
    // do nothing
  }
}

const App = () => {
  const trigger = useScrollTrigger()

  const [surveyValue, setSurveyValue] = useState(JSON.parse(store.get('surveyValue')))

  useEffect(() => {
    setSurveyValue(loadSurveyValue())
  }, [])

  useEffect(() => {
    saveSurveyValue(surveyValue)
  }, [surveyValue])

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar />
      <Slide
        appear={false}
        direction="down"
        in={!trigger}
      >
        <AppBar>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
            >
              飼養寵物相關狀況問卷調查
            </Typography>
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
      <Container>
        {cards
          .filter(card => card?.visibility?.(surveyValue) ?? true)
          .map((card, index) => (
            <Card
              key={`card-${index}`}
              variant="outlined"
              sx={{ mx: 2, my: 4, px: 2, py: 4 }}
            >
              {card.text && (
                <Typography
                  variant="body1"
                  component="div"
                >
                  {card.text}
                </Typography>
              )}
              {card.type === 'input' && (
                <>
                  {card.label && (
                    <Typography
                      variant="body1"
                      component="div"
                    >
                      {card.label}
                      <Typography
                        variant="caption"
                        component="span"
                        sx={{ color: 'red', mx: 1 }}
                      >
                        *必填
                      </Typography>
                    </Typography>
                  )}
                  <TextField
                    required
                    type={card.inputType}
                    InputProps={{
                      endAdornment: card.unit && (
                        <InputAdornment position="end">
                          {card.unit}
                        </InputAdornment>
                      ),
                    }}
                    error={!(card.validator?.(surveyValue[card.name]) ?? true)}
                    value={surveyValue[card.name] ?? ''}
                    onChange={event =>
                      setSurveyValue(oldSurveyValue => ({
                        ...oldSurveyValue,
                        [card.name]: event.target.value,
                      }))
                    }
                  />
                </>
              )}
              {card.type === 'single' && (
                <FormControl>
                  {card.label && (
                    <FormLabel>
                      {card.label}
                      <Typography
                        variant="caption"
                        component="span"
                        sx={{ color: 'red', mx: 1 }}
                      >
                        *必填
                      </Typography>
                    </FormLabel>
                  )}
                  <RadioGroup
                    row={!!card.props?.row}
                    value={surveyValue[card.name] ?? ''}
                    onChange={event =>
                      setSurveyValue(oldSurveyValue => ({
                        ...oldSurveyValue,
                        [card.name]: event.target.value,
                      }))
                    }
                  >
                    {card.options.map(option => (
                      <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
              {card.type === 'multiple' && (
                <FormGroup>
                  {card.label && (
                    <FormLabel>
                      {card.label}
                      <Typography
                        variant="caption"
                        component="span"
                        sx={{ color: 'red', mx: 1 }}
                      >
                        *必填
                      </Typography>
                    </FormLabel>
                  )}
                  {card.options.map(option => (
                    <FormControlLabel
                      key={option.value}
                      control={
                        <Checkbox
                          checked={
                            surveyValue[card.name]?.selected?.includes?.(
                              option.value
                            ) ?? false
                          }
                          onChange={event => {
                            setSurveyValue(oldSurveyValue => ({
                              ...oldSurveyValue,
                              [card.name]: {
                                ...oldSurveyValue[card.name],
                                selected: (
                                  oldSurveyValue[card.name]?.selected?.filter?.(
                                    value => value !== option.value
                                  ) ?? []
                                )
                                  .concat(
                                    event.target.checked ? [option.value] : []
                                  )
                                  .sort(),
                              },
                            }))
                          }}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                  {card.otherInput && (
                    <>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              surveyValue[card.name]?.other !== undefined
                            }
                            onChange={event =>
                              setSurveyValue(oldSurveyValue => ({
                                ...oldSurveyValue,
                                [card.name]: {
                                  ...oldSurveyValue[card.name],
                                  other: event.target.checked
                                    ? oldSurveyValue[card.name]?.other ?? ''
                                    : undefined,
                                },
                              }))
                            }
                          />
                        }
                        label="其他"
                      />
                      <TextField
                        required={surveyValue[card.name]?.other !== undefined}
                        value={surveyValue[card.name]?.other ?? ''}
                        onChange={event =>
                          setSurveyValue(oldSurveyValue => ({
                            ...oldSurveyValue,
                            [card.name]: {
                              ...oldSurveyValue[card.name],
                              other: event.target.value,
                            },
                          }))
                        }
                      />
                    </>
                  )}
                </FormGroup>
              )}
              {card.type === 'submit' && (
                <>
                  <Typography
                    variant="body1"
                    component="div"
                  >
                    {card.validator(surveyValue)
                      ? card.validatedText
                      : card.unvalidatedText}
                  </Typography>
                  <Button
                    disabled={!card.validator(surveyValue)}
                    variant="contained"
                    endIcon={<SendIcon />}
                    sx={{ marginTop: 2 }}
                  >
                    送出問卷
                  </Button>
                </>
              )}
            </Card>
          ))}
      </Container>
    </React.Fragment>
  )
}

export default App
