import '../styles.css'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchTollInfo } from '../actions/toll'
import { todaySchedule, currentTimeInfo } from '../reducers'

import CurrentTime from './current-time'
import TodaySchedule from './today-schedule'

const App = ({ fetchTollInfo, todaySchedule, currentTimeInfo }) => {

  useEffect(()=> {
    fetchTollInfo()
  }, [])

  const handleRefresh = (e) => {
    e.preventDefault()
    fetchTollInfo()
  }

  return (
    <div className="app">
      <h1>520 Toll Bridge</h1>
      <button className='refresh-btn' onClick={handleRefresh}>Refresh</button>
      { currentTimeInfo && <CurrentTime currentTimeInfo={currentTimeInfo}  />}
      <TodaySchedule todaySchedule={todaySchedule}  />
      <p>{`API--> ${process.env.REACT_APP_API_URL}`}</p>

    </div>
  )
}

const mapStateToProps = state => ({
  todaySchedule: todaySchedule(state),
  currentTimeInfo: currentTimeInfo(state),
})

const mapDispatchToProps = {
  fetchTollInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
