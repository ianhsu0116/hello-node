import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const ShowBtn = (props) => {
  let { todoId } = props;
  return (
    <>
      <Link to={`/todo/${todoId}`}>
        <FontAwesomeIcon icon={faEye} className="mr-2" />
        Show
      </Link>
    </>
  );
};

export default ShowBtn;
