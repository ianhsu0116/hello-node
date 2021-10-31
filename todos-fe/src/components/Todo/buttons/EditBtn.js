import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const EditBtn = (props) => {
  let { todoId } = props;
  return (
    <>
      <Link to={`/edit/${todoId}`}>
        <FontAwesomeIcon icon={faPen} className="mr-2" />
        Edit
      </Link>
    </>
  );
};

export default EditBtn;
