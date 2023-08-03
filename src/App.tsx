import { useState } from "react"

const App = () => {
  const [term, setTerm] = useState('');
  const onInputChange = (e: any) => {
    console.log(e.target.value);

  }

  //https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      <section className=" w-full md: max-w-[500px] p-4 flex flex-col text-center items-center justify-center
      md: px-10 lg: p-24 h-full lg: h-[500px] 
      bg-white bg-opacity-20 backdrop-blur-ls drop-shadow-lg rounded
      text-zinc-700
      ">
        <h1 className="text-4xl font-thin">Wheather <span className="font-medium">forecast</span></h1>
        <p className="text-sm mt-2">Enter below a place you want to know the weather of and select an option from dropdown</p>
        <div className="flex mt-10 md:mt-4">

          <input type="text" value={term} className="px-2 py-1 rounded-l-md border-2 border-white"
            onChange={onInputChange}
          />
          <button className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500  text-zinc-100 px-2 py-1 cursor-pointer">
            Search
          </button>
        </div>

      </section>
    </main>
  )
}

export default App
