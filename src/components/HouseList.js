import React, { useContext } from "react";

//import context
import { HouseContext } from "./HouseContext";

//import components
import House from "./House";

//import Link
import { Link } from "react-router-dom";

//import Icons
import { ImSpinner2 } from "react-icons/im";

const HouseList = () => {
  const { houses, loading } = useContext(HouseContext);

  if(loading){
    return (
      <ImSpinner2 className="mx-auto animate-spin text-violet-700 text-4x1 mt-[200px]"/>
    )
  }

  if(houses.length <1){
    return <div className="text-center text-4x1 text-gray-400 mt-48"> Sorry, We Cannot found What you want</div>
  }

  return (
    <section className="mb-20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14">
          {houses.map((house, index) => {
            return (
              <Link to={`/property/${house.id}`}>
                <House house={house} key={index} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HouseList;
