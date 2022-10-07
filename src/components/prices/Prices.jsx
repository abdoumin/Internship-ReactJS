import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Prices = ({setOpen}) => {
  const data = [
    {
        title : "Classe A", 
        price : "2000 dhs"
    },
    {
        title : "Classe B", 
        price : "2000 dhs"
    },
    {
        title : "Classe C", 
        price : "2000 dhs"
    },
    {
        title : "Classe D", 
        price : "2000 dhs"
    }];

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Available Prices : </span>
        {data.map((item) => (
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">
                {item.title} : {item.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prices;
