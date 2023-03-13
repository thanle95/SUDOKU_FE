import moment from "moment";

const calDuration = (start, end) => {
  const duration = moment.duration(end.diff(start));
  const milliseconds = duration.milliseconds();
  const seconds = duration.seconds();
  const minutes = duration.minutes();

  return `${
    minutes > 0 ? `${minutes.toString().padStart(2, "0")} minutes and ` : ""
  } ${
    seconds > 0 ? `${seconds.toString().padStart(2, "0")}` : "0"
  }.${milliseconds.toString().padStart(3, "0")} seconds`;
};
export default calDuration;
