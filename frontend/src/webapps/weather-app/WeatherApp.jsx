import {useEffect, useState} from 'react'

export default function WeatherApp() {
    const [data, setData] = useState({})

    useEffect(() => {
        setData(getWeatherData())
    }, [])

    async function getWeatherData(){
        try{
            const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41")
            const result = response.json()
            console.log({response: response, result: result})
            return result
        } catch(error){
            console.log(error)
        }
    }

    return (
    <>

    

    </>
    )
}