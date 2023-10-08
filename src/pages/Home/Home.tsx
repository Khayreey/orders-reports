import Statistics from '../../components/Statistics/Statistics'
import Charts from '../../components/Charts/Charts'
import DatePickerComponent from '../../components/DatePicker/DatePicker'

const Home = () => {
  return (
    <>
      <DatePickerComponent />
      <Statistics />
      <Charts />
    </>
  )
}

export default Home