import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import SwipperButtons from "./SwipperButtons";
import Interviewer from "./Interviewer";

function SwipperEmployee() {
  const interviewerData = [
    {
      no: "Interview01",
      src: "/interview01.png",
      alt: "interview01の画像",
      position: "QA Engineer",
      name: "Namenamenamenamename",
      date: "(Joined in 2019)",
    },
    {
      no: "Interview02",
      src: "/interview02.png",
      alt: "interview02の画像",
      position: "QA Engineer",
      name: "Namenamenamenamename",
      date: "(Joined in 2019)",
    },
    {
      no: "Interview03",
      src: "/interview03.png",
      alt: "interview03の画像",
      position: "QA Engineer",
      name: "Namenamenamenamename",
      date: "(Joined in 2019)",
    },
    {
      no: "Interview04",
      src: "/interview01.png",
      alt: "interview01の画像",
      position: "QA Engineer",
      name: "Namenamenamenamename",
      date: "(Joined in 2019)",
    },
    {
      no: "Interview05",
      src: "/interview02.png",
      alt: "interview02の画像",
      position: "QA Engineer",
      name: "Namenamenamenamename",
      date: "(Joined in 2019)",
    },
    {
      no: "Interview06",
      src: "/interview03.png",
      alt: "interview03の画像",
      position: "QA Engineer",
      name: "Namenamenamenamename",
      date: "(Joined in 2019)",
    },
  ];
  return (
    <div className="slider-block">
      <h3 className="sec-ttl mb30">
        <span>04</span>
        <p>Employee Interviews</p>
      </h3>
      <div className="slider">
        <Swiper
          // slidesPerView={3}
          // spaceBetween={40}
          // navigation={true}
          breakpoints={{
            400: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            401: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            769: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          loop={true}
          centeredSlides={true}
        >
          {interviewerData.map((user, index) => (
            <SwiperSlide key={index}>
              <Interviewer key={index} user={user} />
            </SwiperSlide>
          ))}
          <SwipperButtons />
        </Swiper>
      </div>
    </div>
  );
}

export default SwipperEmployee;
