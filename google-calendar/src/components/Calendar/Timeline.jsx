import React from "react";

import logo from "../../assets/logo/vanilla-coding.png";

function Timeline() {
  return (
    <table className="text-center">
      <thead className="sticky top-[6rem] h-[5rem] bg-black">
        <tr>
          <td className="z-20">
            <img className="max-w-[100px]" src={logo} />
          </td>
        </tr>
      </thead>
      <tbody>
        {Array.from(Array(24).keys()).map((hour, index) => (
          <React.Fragment key={index}>
            <tr className="flex justify-center items-center h-[10rem]">
              <td className="font-bold text-sm">{`${hour}:00 ~ ${hour + 1}:00`}</td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default Timeline;
