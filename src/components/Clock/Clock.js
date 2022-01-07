import React, { useState, useEffect } from "react";
import { getTime } from "../../lib/dates";
import useInterval from "../../lib/useIntervalHook";
import './clock.scss';

export const Clock = (props) => {
  const [time, setTime] = useState();
  useEffect(() => {
    setTime(getTime());
  }, []);
  useInterval(() => {
    setTime(getTime());
  }, 10000);
  return <p className={props.className}>{time}</p>;
};
