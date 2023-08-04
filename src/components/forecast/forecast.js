import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel
} from "react-accessible-accordion";
import './forecast.css';

// const WEEK_DAYS = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

function convertTime(time, offsetSeconds) {
  const timeArr = time.split(' ')[1].split(':');
  const offsetHr = Math.floor(offsetSeconds / 3600);
  const offsetMin = (offsetSeconds % 3600) / 60;

  var hr = (parseInt(timeArr[0]) + offsetHr) % 24;
  var min = parseInt(timeArr[1]) + offsetMin;
  if (min < 0) {
    min += 60;
    hr--;
  }
  var timeOfDay = "am";

  // get hr between 0-24
  if (hr < 0) {
    hr += 24;
  }

  // convert from military time
  if (hr === 0) {
    hr = 12;
  } else if (hr === 12) {
    timeOfDay = "pm";
  } else if (hr > 12) {
    hr -= 12;
    timeOfDay = "pm";
  }

  if (min < 10) {
    min = "00";
  }

  return `${hr}:${min} ${timeOfDay}`;
}

const Forecast = ({ data }) => {
  // const dayInWeek = new Date().getDay();
  // const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(
  //   WEEK_DAYS.slice(0, dayInWeek)
  // );

  // console.log(forecastDays);

  return (
    <>
      <label className="title">24 Hours</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 8).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    alt="weather"
                    className="icon-small"
                    src={`icons/${item.weather[0].icon}.png`}
                  />
                  <label className="time">
                    {convertTime(item.dt_txt, data.city.timezone)}
                  </label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="temp">
                    {Math.round(item.main.temp)}°F
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure</label>
                  <label>{item.main.pressure} hPa</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity</label>
                  <label>{item.main.humidity}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind speed</label>
                  <label>{item.wind.speed} mph</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels like</label>
                  <label>{Math.round(item.main.feels_like)}°F</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}

export default Forecast;
