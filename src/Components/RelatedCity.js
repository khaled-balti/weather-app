import React, {useState, useEffect, useCallback, useRef} from 'react'
const RelatedCity = ({relatedCities}) => {
    const [dataRelated, setDataRelated] = useState([])
    const dataRelatedRef = useRef(dataRelated)
    const fetchCityHandler = useCallback((city) => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`
        )
            .then((response) => response.json())
            .then((data) => {
                const existingCity = dataRelatedRef.current.find(c => c.name === data?.name)
                if (!existingCity) {
                    setDataRelated(prev => {
                        const updatedData = [...prev, data]
                        dataRelatedRef.current = updatedData
                        return updatedData
                    })
                }
            });
    }, []);

    useEffect(() => {
        dataRelatedRef.current = dataRelated
    }, [dataRelated])

    useEffect(() => {
        relatedCities.forEach(city => fetchCityHandler(city.name))
    }, [relatedCities, fetchCityHandler])
    console.log(dataRelated)
  return (
    <>
        {dataRelated.length > 0 && dataRelated.map(city => {
            const weather = city?.weather
            const tempcelsius = ((city?.main?.temp - 32) * 5) / 9
            return (
                <div className='d-flex align-items-center flex-column me-5'>
                    <h4 className='text-white'>{city?.name}</h4>
                    {weather && <img src={`${require(`../imgs/${weather[0]?.icon}.png`)}`} />}
                    <p className='text-white ms-4 fs-1'>{tempcelsius.toFixed(0)}°</p>
                </div>
            )
        })}
        {dataRelated.length === 0 && <div className='container d-flex justify-content-center align-items-center' style={{height: '100%'}}>
            <p className='text-white' style={{fontSize: "34px"}} >No Relative Cities Found</p>
        </div>}
    </>
  )
}

export default RelatedCity