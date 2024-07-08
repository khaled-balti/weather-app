import React, {  useState } from 'react'
import './InputField.css'
import { IoIosClose } from "react-icons/io";
import { cities_list } from '../cities_list - Copie'
import WeatherDetails from './WeatherDetails';
import Spinner from './Spinner';
const InputField = () => {
    const [inputValue, setInputValue] = useState("")
    const [showCities, setShowCities] = useState(false)
    const [loading, setLoading] = useState(false)
    const [searchedCities, setSearchedCities] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const api = process.env.REACT_APP_API_KEY
    const [data, setData] = useState([])
    const inputChangeHandler = (e) => {
        setInputValue(e.target.value)
        const cities = cities_list.filter(city => {
            return city.name.toUpperCase().startsWith(e.target.value.toUpperCase())
        })
        setSearchedCities(cities)
        setShowCities(true)
    }
    const clearInputHandler = (e) => {
        e.preventDefault()
        setInputValue("")
        setShowCities(false)
    }
    const fetchCityHandler = (city) => {
        setInputValue(city)
        setLoading(true)
        fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`
        )
        .then((response) => response.json())
        .then((data) => {
            setData(data);
            console.log(data)
            setLoading(false)
        })
        setShowCities(false)
        setShowDetails(true)
    }
    return (
    <div className={`container-fluid position-relative ${loading ? 'd-flex justify-content-center align-items-center' : "d-block"}`}>
        <div className=' bg-light inp mt-5 overflow-hidden'>
            <form className='d-flex' style={{height: '100%'}}>
                <input type="text" className='w-100 px-3 outline-none' placeholder='Enter your city...' onChange={inputChangeHandler} value={inputValue}  />
                <button style={{border: 'none', backgroundColor: 'transparent'}} className='d-flex justify-content-center align-items-center px-2'><IoIosClose onClick={clearInputHandler} /></button>
            </form>
        </div>
        {showCities && searchedCities.length > 0 && inputValue.length > 0 && <div className={`mt-5 res container-fluid overflow-y-scroll py-2 scrollbar`}>
            {searchedCities.map(city => {
                return (
                    <div className='py-2 px-3' style={{borderBottom: '1px #ddd solid', cursor: 'pointer'}} onClick={e => fetchCityHandler(city.name)}>
                        <h3 className='text-white'>{city.name}</h3>
                        <p className='text-white'>{city.country}</p>
                    </div>
                )
            })}
        </div>}
        {searchedCities.length === 0 && inputValue.length > 0 && <div className={`mt-5 res container-fluid py-2 scrollbar`}>
            <h3 className='text-center text-white'>No City Found</h3>
        </div>}
        {loading && <Spinner/>}
        {!loading && showDetails && <WeatherDetails data={data}  />}
    </div>
  )
}

export default InputField