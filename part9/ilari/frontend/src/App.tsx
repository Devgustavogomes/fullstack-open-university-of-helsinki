import { useEffect, useState } from 'react'
import Content from './components/Content'
import type { DiaryEntry } from './types'
import axios from 'axios'
import FormDiary from './components/FormDiary'
import ErrorMessage from './components/ErrorMessage'
function App() {
  
  const[diaries, setDiaries] = useState<DiaryEntry[]>([])
  const[error, setError] = useState('')
  useEffect(()=>{
    const getDiaries = async () =>{
      const response =await axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries')
      setDiaries(response.data)
    }
    getDiaries()
  }, [])

  const onError = (error: string) =>{
    setError(error)
    setTimeout(() => {
      setError('')
    }, 5000);
  }

  const onSubmit = (newDiary: DiaryEntry) =>{
    setDiaries(diaries.concat(newDiary))
  }
  return (
    <div>
      <h1>Diaries entries</h1>
      {error === '' ? null : <ErrorMessage error={error}/>}
      <FormDiary onSubmit={onSubmit} onError={onError}/>
      <Content diaries={diaries}/>
    </div>
  )
}

export default App
