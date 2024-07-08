import React, {useState, useEffect, useCallback, useMemo} from 'react'
import { cities_list } from '../cities_list - Copie'
import './WeatherDetails.css'
import RelatedCity from './RelatedCity'
import Timer from './Timer'
const WeatherDetails = ({data}) => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    const daysOfWeek = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ]
    const [relatedCities, setRelatedCities] = useState([])
    const object = cities_list.find(city => city.name === data?.name)
    const country = object?.country
    const weather = data?.weather
    const tempcelsius = ((data?.main?.temp - 32) * 5) / 9
    const temphighcelsius = ((data?.main?.temp_max - 32) * 5) / 9
    const templowcelsius = ((data?.main?.temp_min - 32) * 5) / 9
    const sunrise = data?.sys?.sunrise
    const sunset = data?.sys?.sunset
    function formatTime(unixTimestamp, timezoneOffset) {
        const date = new Date((unixTimestamp + timezoneOffset) * 1000)
        const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000 + timezoneOffset * 1000);
        const hours = localDate.getHours().toString().padStart(2, '0')
        const minutes = localDate.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`
    }
    useEffect(() => {
        const city = cities_list.find(city => city.name === data?.name)
        if (city) {
            const country = city?.country
            const cities = cities_list.filter(city => city.country === country && city.name !== data?.name)
            setRelatedCities(cities)
        }
    }, [])
    const [dateTime, setDateTime] = useState({
        day: "",
        day2: "",
        month: "",
        year: ""
    });
    useEffect(() => {
    const intervalId = setInterval(() => {
        const localTime = new Date().getTime();
        const localOffset = new Date().getTimezoneOffset() * 60000;
        const currentUtcTime = localOffset + localTime;
        const cityOffset = currentUtcTime + 1000 * data.timezone;
        const cityDate = new Date(cityOffset);
        setDateTime({
            day: cityDate.getDate(),
            day2: cityDate.getDay(),
            month: cityDate.getMonth(),
            year: cityDate.getFullYear()
        })
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
}, [data.timezone]);
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-12 col-lg-5'>
                <div className='p-3 px-5 col-12 d-flex justify-content-center align-items-center align-items-ld-start flex-column' style={{marginTop: '50px', backgroundColor: "#155CA2", borderRadius: '20px', minHeight: '340px', maxHeight: '400px',  border: "2px solid white"}}>
                    <div className='d-md-flex'>
                        <p className='text-white fs-2 fw-semibold me-3 mb-1'>{data?.name},</p>
                        <p className='text-white fs-2 mb-1'>{country}&nbsp;({data?.sys?.country})</p>
                    </div>
                    <div className='text-white fs-5 mb-5 mb-md-0'>
                        {`${daysOfWeek[dateTime.day2]} ${dateTime.day} ${months[dateTime.month]} ${dateTime.year}`} 
                    </div>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div>
                            {weather && <img src={`${require(`../imgs/${weather[0].icon}.png`)}`} className='img-fluid' width={200} height={100} />}
                        </div>
                        <div style={{width: '200px', height: '100px'}} className='d-flex justify-content-center align-items-center flex-column'>
                            <p className='text-white ms-4 temperature'>{tempcelsius.toFixed(0)}°</p>
                            {weather && <p className='text-white fs-5 mt-0 text-center'>{weather[0]?.description}</p>}
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-12 col-lg-7'>
                <div className='px-1 px-md-5 py-5 col-12 d-flex justify-content-between align-items-center align-items-md-start flex-column' style={{marginTop: '50px', backgroundColor: "#155CA2", borderRadius: '20px', height: '340px', border: "2px solid white"}}>
                    <div className='container-fluid d-flex justify-content-between align-items-center'>
                        <div className='d-flex flex-column align-items-center'>
                            <p className='text-white fs-1' style={{lineHeight: '20px'}}>{temphighcelsius.toFixed(0)}°</p>
                            <p className='text-white fs-5'>High</p>
                        </div>
                        <div className='d-flex flex-column align-items-center'>
                            <p className='text-white fs-1' style={{lineHeight: '20px'}}>{data?.wind?.speed.toFixed(0)}&nbsp;mph</p>
                            <p className='text-white fs-5'>Wind</p>
                        </div>
                        <div className='d-flex flex-column align-items-center'>
                            <p className='text-white fs-1' style={{lineHeight: '20px'}}>{formatTime(sunrise, data?.timezone)}</p>
                            <p className='text-white fs-5'>Sunrise</p>
                        </div>
                    </div>
                    <div className='container-fluid d-flex justify-content-between align-items-center'>
                        <div className='d-flex flex-column align-items-center'>
                            <p className='text-white fs-1' style={{lineHeight: '20px'}}>{templowcelsius.toFixed(0)}°</p>
                            <p className='text-white fs-5'>Low</p>
                        </div>
                        <div className='d-flex flex-column align-items-center'>
                            <p className='text-white fs-1' style={{lineHeight: '20px'}}>{data?.clouds?.all}%</p>
                            <p className='text-white fs-5'>Cloud</p>
                        </div>
                        <div className='d-flex flex-column align-items-center'>
                            <p className='text-white fs-1' style={{lineHeight: '20px'}}>{formatTime(sunset, data?.timezone)}</p>
                            <p className='text-white fs-5'>Sunset</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='row'>
            <Timer data={data} />
            <div className='col-12 col-lg-6'>
                <div className={`px-1 px-md-5 py-5 col-12 d-flex justify-content-between align-items-center align-items-md-start ${relatedCities.length > 3 ? 'overflow-x-scroll' : 'overflow-x-hidden'} overflow-y-hidden`} style={{marginTop: '50px', backgroundColor: "#155CA2", borderRadius: '20px', height: '340px',  border: "2px solid white"}}>
                    <RelatedCity relatedCities={relatedCities} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherDetails