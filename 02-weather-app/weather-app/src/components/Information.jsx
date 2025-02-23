import { CloudSun, Cloud } from "lucide-react";
export default function Information({ data }) {
  const [formatedTime, hourIndex] = convertTIme(data.location.localtime);

  function convertTIme(time) {
    const localTimeISO = time.replace(" ", "T");
    const dateObj = new Date(localTimeISO);
    const formatedTime = dateObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return [formatedTime, dateObj.getHours()];
  }

  function iconHourForecast(hour) {
    //const isDay = hour.is_day ? "Es de dia" : "Es de noche";
    const temperature = hour.temp_c;
    const formatedTime = convertTIme(hour.time)[0];

    //return isDay + " " + formatedTime + " " + temperature ;
    return (
      <div className="iconHour">
        {temperature > 30 ? <CloudSun /> : <Cloud />}
        <span className="formatedTime">{formatedTime}</span>
        <span className="temperature">{temperature}°C</span>
      </div>
    );
  }

  return (
    <div className="information">
      <div className="locationInformation">
        <h3>{data.location.name}</h3>
        <span>{formatedTime}</span>
      </div>
      <div className="hourlyForecast">
        <h4>Hourly Forecast</h4>
        <div className="hourlyInfo">
          <ul className="iconList">
            {data.forecast.forecastday[0].hour
              .slice(hourIndex, hourIndex + 5)
              .map((hour, index) => {
                return <li key={index}>{iconHourForecast(hour)}</li>;
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
