import React, { useState, useEffect } from 'react'
import Multiselect from 'multiselect-react-dropdown'
import axios from 'axios'

function MultiSelect(props) {
  const id = localStorage.getItem("userId")
  const [tests, setTest] = useState([])
  const [selectedValue, setSelectedValue] = useState([])

  const getTest = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/getTestsbyCompany/'+id)
      setTest(res.data)
    } catch (error) {
      console.log('Error while fetching tests: ', error)
    }
  }
  useEffect(() => {
    setSelectedValue(props.jobTests)
    getTest()
    
  }, [props.jobTests])
  
  props.onSend(selectedValue);
  return (
    <div>
      <Multiselect
        options={tests}
        selectedValues={selectedValue}
        onSelect={setSelectedValue}
        onRemove={setSelectedValue}
        displayValue='test_Name'
        className={'JobPostform-control'}
        required
      />
    </div>
  )
}

export default MultiSelect