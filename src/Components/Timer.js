import React, {useState, useEffect} from 'react'
const Timer = ({data}) => {
    const [time, setTime] = useState("")
    useEffect(() => {
        const intervalId = setInterval(() => {
            const localTime = new Date().getTime()
            const localOffset = new Date().getTimezoneOffset() * 60000
            const currentUtcTime = localOffset + localTime
            const cityOffset = currentUtcTime + 1000 * data.timezone
            const cityTime = new Date(cityOffset).toTimeString().split(' ')
            setTime(cityTime[0])
        }, 1000);
    }, [time]);
  return (
    <div className='col-12 col-lg-6'>
        <div className='px-1 px-md-5 px-lg-3 py-5 col-12 d-flex justify-content-between align-items-center flex-column' style={{marginTop: '50px', backgroundColor: "#155CA2", borderRadius: '20px', height: '340px',  border: "2px solid white"}}>
            <div className='d-md-flex align-items-end'>
                <p className='text-white text-center me-3 pb-0' style={{fontSize: "52px"}}>{time}</p>
                <p className='text-white text-center pb-2' style={{fontSize: "24px"}}>{data?.timezone >= 0 ? `+${data?.timezone / 3600}` : `${data?.timezone / 3600}`} GMT</p>
            </div>
            <div className='container-fluid d-flex justify-content-between align-items-center'>
                <div className='d-flex flex-column align-items-center'>
                    <p className='text-white fs-1' style={{lineHeight: '16px'}}>{data?.main?.humidity}%</p>
                    <p className='text-white fs-5'>Humidity</p>
                </div>
                <div className='d-flex flex-column align-items-center'>
                    <p className='text-white fs-1' style={{lineHeight: '16px'}}>{data?.main?.pressure} hPa</p>
                    <p className='text-white fs-5'>Pressure</p>
                </div>
                <div className='d-flex flex-column align-items-center'>
                    <p className='text-white fs-1' style={{lineHeight: '16px'}}>{data?.main?.sea_level} m</p>
                    <p className='text-white fs-5'>Sea Level</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Timer