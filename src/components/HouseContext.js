import React, { useState, useEffect, createContext } from "react";

// import data
import { housesData } from "../data";

//create context
export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property type (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price Range (any)");
  const [loading, setLoading] = useState(false);

  //return allCountries
  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    });
    console.log(allCountries);
    //remove Duplicates
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];

    setCountries(uniqueCountries);
  }, []);

  //return allProperties
  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    });
    console.log(allProperties);
    //remove Duplicates
    const uniqueProperties = ["Property type (any)", ...new Set(allProperties)];

    setProperties(uniqueProperties);
  }, []);

  const handleClick = () => {
    //setLoading
    setLoading(true)

    //create a function check if the string includes (any)
    const isDefault = (str) => {
      return str.split(" ").includes("(any)");
    };
    console.log(isDefault(country));

    //get first value of price and parse it to number
    const minPrice = parseInt(price.split(" ")[0]);

    //get second value (max price)
    const maxPrice = parseInt(price.split(" ")[2]);

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);
      console.log(house.country, country);

      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }

      //if all values are default
      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return house;
      }

      //if country is not default
      if (!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.country === country;
      }

      //if property is not default
      if (!isDefault(property) && isDefault(country) && isDefault(price)) {
        return house.type === property;
      }

      //if price is not default
      if (!isDefault(price) && isDefault(country) && isDefault(property)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }

      //if country and property is not default
      if(!isDefault(country) && !isDefault(property) &&isDefault(price)){
        return house.country === country && house.type === property
      }

      //if country and price is not default
      if(!isDefault(country) && !isDefault(price) && isDefault(property)){
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country
      }
      }

      //property and price is not default
      if(!isDefault(property) && !isDefault(price) && isDefault(country)){
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property
      }
    }
    });
    setTimeout(()=>{
      return newHouses.length<1 ? setHouses([]) :
      setHouses(newHouses),
      setLoading(false)
    },1000)
  };

  return (
    <HouseContext.Provider
      value={{
        houses,
        country,
        setCountry,
        property,
        setProperty,
        price,
        setPrice,
        countries,
        properties,
        loading,
        handleClick,
        loading,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
