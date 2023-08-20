
import { ChangeEvent, useEffect, useState } from "react";
import { optionType, forecastType } from "../types";

export const useForecast = () => {
    const BASE_URL = 'https://api.openweathermap.org';
    const [city, setCity] = useState<optionType | null>(null);
    const [term, setTerm] = useState<string>('');
    const [options, setOptions] = useState<[]>([]);
    const [forecast, setForecast] = useState<forecastType | null>(null);

    const getSearchOptions = async (value: string) => {
        fetch(
            `${BASE_URL}/geo/1.0/direct?q=${value.trim()}&limit=5&lang=en&appid=4f83d528c4a8622b877927889e3cbcda`
        )
            .then((res) => res.json())
            .then((data) => setOptions(data));
    }
    const getForecast = (city: optionType) => {
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=4f83d528c4a8622b877927889e3cbcda`
        )
            .then((res) => res.json())
            .then((data) => {
                const forecastData = {
                    ...data.city,
                    list: data.list.slice(0, 16)
                }
                setForecast(forecastData)
            });
    }


    const onSubmit = () => {
        if (!city) return
        getForecast(city)
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value.trim();
        setTerm(value);
        if (value === '') return;

        getSearchOptions(value);
    }

    const onOptionSelect = (option: optionType) => {
        setCity(option);
    }


    useEffect(() => {
        if (city) {
            setTerm(city.name)
            setOptions([])
        }
    }, [city])

    return {
        term,
        options,
        forecast,
        onInputChange,
        onOptionSelect,
        onSubmit
    }
}