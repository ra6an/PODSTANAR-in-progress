//
import { ImStarEmpty, ImStarHalf, ImStarFull } from "react-icons/im";

const starGenerator = (ratingNum = 0, classForStars) => {
  const rating = ratingNum;
  let stars = [];
  let num = 1;

  while (num < 6) {
    if (rating === 0 || (rating !== 0 && rating < num && rating !== num - 0.5))
      stars.push(<ImStarEmpty key={num} className={classForStars} />);

    if ((rating > num && rating > num - 0.5) || rating === num)
      stars.push(<ImStarFull key={num} className={classForStars} />);

    if (rating === num - 0.5)
      stars.push(<ImStarHalf key={num} className={classForStars} />);
    num++;
  }

  return stars;
};

export default starGenerator;
