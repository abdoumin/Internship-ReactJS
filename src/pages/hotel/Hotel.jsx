import "./hotel.css";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import Prices from "../../components/prices/Prices";

import Slider from "../../components/Slider/Slider";
import Navbar from "../../components/NavbarPers";

import "../../components/Slider/Slider.css";
import { API_URL } from "../../Constants";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  console.log(id);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalPrices, setOpenModalPrices] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const { data, loading, error } = useFetch(
    `${API_URL}/api/estivageCentre/${id}`
  );
  let photos = [];
  let options = [];

  if (data.length !== 0 && data.estivageCentrePhotos.length !== 0) {
    for (let i = 0; i < data.estivageCentrePhotos.length; i++) {
      photos.push(data.estivageCentrePhotos[i].photo);
    }
  }

  console.log(photos);
  // const [option,setOption] = useState([]);
  console.log(selectedDates.startDate);
  const {
    data: dates,
    loading: loading2,
    error: error2,
  } = useFetch(`${API_URL}/api/estivageCentreDates/all/${id}`);

  if (!loading2) {
    console.log(dates);
    if (dates.length != 0) {
      for (let i = 0; i < dates.length; i++) {
        options.push({
          value: {
            id: dates[i].id,
            startDate: dates[i].startDate,
            endDate: dates[i].endDate,
          },
          label: `from ${new Date(dates[i].startDate).toLocaleDateString()} to 
            ${new Date(dates[i].endDate).toLocaleDateString()} `,
        });
      }
    }
    console.log(options);

    // const { user } = useContext(AuthContext);
    // const navigate = useNavigate();

    // const { dates, options } = useContext(SearchContext);

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
      return diffDays;
    }

    // const days = dayDifference(dates[0].endDate, dates[0].startDate);

    const handleOpen = (i) => {
      setSlideNumber(i);
      setOpen(true);
    };

    const handleSelect = (e) => {
      setSelectedDates(e.value);
    };

    const handleMove = (direction) => {
      let newSlideNumber;

      if (direction === "l") {
        newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
      } else {
        newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
      }

      setSlideNumber(newSlideNumber);
    };

    const handleClick2 = () => {
      setOpenModal(true);
    };

    const handleClick = () => {
      setOpenModalPrices(true);
    };

    return (
      <div>
        <Navbar />

        <div className="hotelContainer">
          <div className="hotelWrapper">
            <button className="bookNow" onClick={handleClick2}>
              Reserve or Book Now!
            </button>
            <div className="hotelCredentialsContainer">
              <h1 className="hotelTitle">{data.name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span style={{fontSize : 16}}>{data.city}</span>
              </div>
            </div>

            {/* Adding the Slider */}

            <Slider id={id}></Slider>

            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <div>{data.des}</div>
                <br></br>
                <ul>
                  <li>Nom du responsable : {data.responsable}</li>
                  <li>Tel : {data.tel}</li>
                </ul>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Choisissez la date de votre séjour!</h1>
                {/* <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                  nights)
                </h2> */}
                {id !== null ? (
                  <Select options={options} onChange={handleSelect} />
                ) : (
                  <></>
                )}
                <h1>Voir les prix!</h1>

                <button onClick={handleClick}>See the prices</button>
              </div>
            </div>
          </div>
        </div>
        {openModalPrices && <Prices setOpen={setOpenModalPrices} />}
        {openModal && (
          <Reserve setOpen={setOpenModal} hotelId={id} dates={selectedDates} />
        )}
      </div>
    );
  }
};

export default Hotel;
