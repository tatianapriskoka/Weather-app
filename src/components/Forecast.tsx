import { forecastType } from "../types"

type Props = {
    data: forecastType
}

const Degree = ({ temp }: { temp: number }): JSX.Element => (
    <>
        <span>{temp}
            <sup>o</sup>
        </span>
    </>
)

export const Forecast = ({ data }: Props): JSX.Element => {
    const today = data.list[0];

    return (
        <div className="w-full md:max-w-[500px] py-4 md:py-4 
        md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 
        backdrop-blur-ls rounded drop-shadow-lg">
            <div className="mx-auto w-[300px]">

                <section className="text-center">
                    <h2 className="text-2xl font-black">{data.name}
                        <span className="font-thin"> {data.country}</span></h2>
                    <h1 className="text-4xl font-extrabold">
                        <Degree temp={Math.round(today.main.temp)} />
                    </h1>
                    <p className="text-sm">
                        {today.weather[0].main}
                        {today.weather[0].description}
                    </p>
                    <p>
                        H: <Degree temp={Math.ceil(today.main.temp_max)} /> {' '}
                        L: <Degree temp={Math.floor(today.main.temp_min)} />
                    </p>
                </section>
            </div>
        </div>
    )
}