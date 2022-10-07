import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import './reserve2.css';
import useFetch from "../../hooks/useFetch";
import usePost from "../../hooks/usePost";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../Constants";

const Reserve = ({ setOpen, hotelId, dates }) => {


  const token = sessionStorage.getItem('token');
  const username = sessionStorage.getItem('authenticatedUser');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
}
  const [selectedRooms, setSelectedRooms] = useState([]);

  //ESTIVAGES PRODUITS
  const { data, loading, error,setUrl } = useFetch(
    `${API_URL}/api/estivageproduit/all/` + hotelId
  );

  const{ data : reservationsDates1 , loading : loadingDates1, error: errorDates1,  theurl : theurl1 , setUrl : setUrl1} = 
      useFetch("") ;
  
  const{ data : reservationsDates2 , loading : loadingDates2, error: errorDates2,  theurl : theurl2 , setUrl : setUrl2} = 
      useFetch("") ;

  //We need product ids to fetch the unavailables dates 

  let productIds = [];
  
  if(data != null) {
    for(let i = 0; i < data.length; i++) {
      productIds.push(data[i].id);
    }
  }
  console.log(productIds);

  console.log(theurl1);
  console.log(theurl2);

  if(productIds.length !=0 )
  { 
    console.log("inside the loop");
      if(theurl1.length ===0 )
      { 
        console.log(`${API_URL}/api/estivageProduit/`+productIds[0] +"/get/reservations");
        setUrl1(`${API_URL}/api/estivageProduit/` +productIds[0] +"/get/reservations");
      }
      if(theurl2.length===0)
      {
        setUrl2(`${API_URL}/api/estivageProduit/` +productIds[1] +"/get/reservations");
      }
        
  }

  console.log(reservationsDates1);
  console.log(reservationsDates2);


  //isAvailable function needs an array 

  if(Object.keys(reservationsDates1).length !== 0 && data.length !==0) {
    for(let i = 0; i < reservationsDates1.length; i++)
    {
      let reservationsDates = [new Date(reservationsDates1[i].dateDeDebut).getTime(),new Date(reservationsDates1[i].dateDeFin).getTime()];  
      if(data[0].hasOwnProperty("reservationDates")){{
        data[0].reservationDates.push(new Date(reservationsDates1[i].dateDeDebut).getTime());
        data[0].reservationDates.push(new Date(reservationsDates1[i].dateDeFin).getTime());
      }}
      else{
        Object.assign(data[0],{reservationDates : reservationsDates }); 
      }
      
    }
    console.log(data);

  }

  if(Object.keys(reservationsDates2).length !== 0 && data.length !== 0 ) {
    for(let i = 0; i < reservationsDates2.length; i++)
    {
      let reservationsDates = [new Date(reservationsDates2[i].dateDeDebut).getTime(),new Date(reservationsDates2[i].dateDeFin).getTime()];  
      if(data[1].hasOwnProperty("reservationDates")){{
        data[1].reservationDates.push(new Date(reservationsDates2[i].dateDeDebut).getTime());
        data[1].reservationDates.push(new Date(reservationsDates2[i].dateDeFin).getTime());
      }}
      else{
        Object.assign(data[1],{reservationDates : reservationsDates }); 
      }
      
    }
    console.log(data);
  }

  

  


  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates.startDate, dates.endDate);


  const isAvailable = (dates) => {
    const isFound = dates.some((date) =>
      alldates.includes(date)
    );

    return !isFound;
  };



  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
    
  };

  console.log(selectedRooms);

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.post(`${API_URL}/api/estivageProduit/${roomId}/add/${dates.id}/${username}`,{},config);
          return res.data;
        })
      );
      setOpen(false);
      navigate("/reservations");
    } catch (err) {}
  };
  return (
    <div className="reserve1">
      <div className="rContainer1">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose1"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem1" key={item.id}>
            <div className="rInfo1">
              <div className="rTitle1">{item.title}</div>
              {/* <div className="rDesc">{item.des}</div> */}
              <div className="rMax1">
                Max people: <b>{item.max_people}</b>
              </div>
            </div>
            <div className="rSelectRooms1">
              <div className="room1">
                <input
                  type="checkbox"
                  value={item.id}
                  onChange={handleSelect}
                  disabled={item.hasOwnProperty('reservationDates')? !isAvailable(item.reservationDates) : false}
                  
                />
              </div>
            </div>

            {/*<div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
              </div>*/}
          </div>
        ))}
        <button className="rButton1" onClick={handleClick}>Reserve Now!</button>
      </div>
    </div>
  );
};

export default Reserve;
