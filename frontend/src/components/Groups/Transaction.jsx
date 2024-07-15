import { Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faPlaneDeparture, faTriangleExclamation, faBasketShopping, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

const icons = {
  "Dine out": <FontAwesomeIcon icon={faUtensils} />,
  "Travel": <FontAwesomeIcon icon={faPlaneDeparture} />,
  "Emergency": <FontAwesomeIcon icon={faTriangleExclamation} />,
  "Necessities": <FontAwesomeIcon icon={faBasketShopping} />,
  "Other": <FontAwesomeIcon icon={faCircleQuestion} />
}

export default function Transaction({ transactionId, category, description, createdAt }) {

  return (
    <Link to={`/transactions/${transactionId}`} className="rounded-md shadow-md border-gray-200 border p-5 flex justify-between hover:translate-y-1">
      <h1 className="flex gap-5 items-center">{icons[category]} {description}</h1>
      <p className="text-right text-sm self-end">{moment(createdAt).format("MMMM D, YYYY")}</p>
    </Link>
  )
}
