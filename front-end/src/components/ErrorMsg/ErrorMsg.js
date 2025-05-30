import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { resetErrAction } from "../../redux/slices/globalActions/globalAction";

const ErrorMsg = ({ message }) => {
  const dispatch = useDispatch();
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
  dispatch(resetErrAction());
};

export default ErrorMsg;
