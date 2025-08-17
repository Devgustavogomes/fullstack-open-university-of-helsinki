import { useState } from "react"
import type { DiaryEntry } from "../types"
import axios from "axios"

export default function FormDiary({ 
    onSubmit, 
    onError}
    : 
    { onSubmit: (diary: DiaryEntry) => void, 
    onError: (error:string) => void }){
    const[date, setDate] = useState('')
    const[visibility, setVisibility] = useState('')
    const[weather, setWeather] = useState('')
    const[comment, setComment] = useState('')

    const createNewDiary= async (e: React.SyntheticEvent,)=>{
        e.preventDefault()
        const newDiary={
            date,
            visibility,
            weather,
            comment
        }
        try {
            const response = await axios.post('http://localhost:3000/api/diaries', newDiary)
            setDate('')
            setWeather('')
            setComment('')
            onSubmit(response.data)
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
        
                console.log(error.response?.data) 
                const userMessage = error.response?.data || 'Erro desconhecido'
                onError(userMessage)
            } else if (error instanceof Error) {
                console.log(error.message)
            } else {
                console.log("Erro desconhecido", error)
            }
                }
            }
    return(
        <form action="" onSubmit={createNewDiary} style={{display: 'flex', flexDirection: 'column', width: '300px', gap: 10}}>
            <label htmlFor="">
                date
                <input type="date" onChange={(e) => setDate(e.target.value)} value={date}/>
            </label>
            <label htmlFor="">
                visibility
                <input type="radio" onChange={(e) => setVisibility(e.target.value)} name={'visibility'} value={'great'}/>
                great
                <input type="radio" onChange={(e) => setVisibility(e.target.value)} name={'visibility'} value={'good'}/>
                good
                <input type="radio" onChange={(e) => setVisibility(e.target.value)} name={'visibility'} value={'ok'}/>
                ok
                <input type="radio" onChange={(e) => setVisibility(e.target.value)} name={'visibility'} value={'poor'}/>
                poor
            </label>
            <label htmlFor="">
                weather
                <input type="radio" onChange={(e) => setVisibility(e.target.value)} name={'weather'} value={'sunny'}/>
                Sunny
                <input type="radio" onChange={(e) => setVisibility(e.target.value)} name={'weather'} value={'rainy'}/>
                Rainy
                <input type="radio" onChange={(e) => setVisibility(e.target.value)} name={'weather'} value={'cloudy'}/>
                Cloudy
                <input type="radio" onChange={(e) => setVisibility(e.target.value)} name={'weather'} value={'stormy'}/>
                Stormy
                <input type="radio" onChange={(e) => setVisibility(e.target.value)} name={'weather'} value={'windy'}/>
                Windy
            </label>
            <label htmlFor="">
                comment
                <input type="text" onChange={(e) => setComment(e.target.value)} value={comment}/>
            </label>
            <button type="submit">Send</button>
        </form>
    )
}