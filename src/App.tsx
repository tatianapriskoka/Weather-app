
import { ChangeEvent, useEffect, useState } from "react"
import { optionType } from "./types/index";

const App = (): JSX.Element => {
  const BASE_URL = 'http://api.openweathermap.org';
  const [city, setCity] = useState<optionType | null>(null);
  const [term, setTerm] = useState<string>('');
  const [options, setOptions] = useState<[]>([]);

  const getSearchOptions = async (value: string) => {
    fetch(
      `${BASE_URL}/geo/1.0/direct?q=${value.trim()}&limit=5&lang=en&appid=4f83d528c4a8622b877927889e3cbcda`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data));
  }
  const getForecast = (city: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=4f83d528c4a8622b877927889e3cbcda`
    )
      .then((res) => res.json())
      .then((data) => console.log({ data }));
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
    console.log(option.name);
    setCity(option);
  }

  useEffect(() => {
    if (city) {
      setTerm(city.name)
      setOptions([])
    }
  }, [city])

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      <section className=" w-full md: max-w-[500px] p-4 flex flex-col text-center items-center justify-center
      md: px-10 lg: p-24 h-full lg: h-[500px] 
      bg-white bg-opacity-20 backdrop-blur-ls drop-shadow-lg rounded
      text-zinc-700
      ">
        <h1 className="text-4xl font-thin">Wheather <span className="font-medium">forecast</span></h1>
        <p className="text-sm mt-2">Enter below a place you want to know the weather of and select an option from dropdown</p>
        <div className="relative flex mt-10 md:mt-4">

          <input type="text"
            value={term}
            className="px-2 py-1 rounded-l-md border-2 border-white"
            onChange={onInputChange}
          />


          <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
            {options.map((option: optionType, index: number) => (
              <li key={option.name + '-' + index}>
                <button className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                  onClick={() => onOptionSelect(option)}
                >
                  {option.name}
                </button>
              </li>
            ))}

          </ul>
          <button className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500  text-zinc-100 px-2 py-1 cursor-pointer"
            onClick={onSubmit}
          >
            Search
          </button>
        </div>

      </section>
    </main>
  )
}

export default App
