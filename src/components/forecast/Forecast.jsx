import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./Forecast.css";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = weekDays
    .slice(dayInAWeek, weekDays.length)
    .concat(weekDays.slice(0, dayInAWeek));

  // console.log(dayInAWeek);
  // console.log(forecastDays);

  return (
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    alt="weather"
                    className="icon-small"
                    src={`icons/${item.weather[0].icon}.png`}
                  />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">{`Max ${Math.round(
                    item.main.temp_max - 273
                  )}°C // Min ${Math.round(
                    item.main.temp_min - 273
                  )}°C`}</label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-item">
                  <label>Pressure</label>
                  <span>{item.main.pressure} hPa</span>
                </div>
                <div className="daily-details-item">
                  <label>Humidity</label>
                  <span>{item.main.humidity}%</span>
                </div>
                <div className="daily-details-item">
                  <label>Clouds</label>
                  <span>{item.clouds.all}%</span>
                </div>
                <div className="daily-details-item">
                  <label>Wind speed</label>
                  <span>{item.wind.speed} m/s</span>
                </div>
                <div className="daily-details-item">
                  <label>Feels like</label>
                  <span>{Math.round(item.main.feels_like-273)}°C</span>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
