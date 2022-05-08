const DashboardSurveyDetail = ({ surveyValue }) => (
  <>
    <pre>{JSON.stringify(surveyValue, null, 2)}</pre>
  </>
)

export default DashboardSurveyDetail
