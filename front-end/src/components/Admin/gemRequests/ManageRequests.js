import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllGemRequestsAction,
  updateGemRequestStatusAction,
} from "../../../redux/slices/gemRequests/gemRequestSlice";
import Swal from "sweetalert2";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

export default function ManageRequests() {
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.gemRequest);
  const userInfo = useSelector((state) => state.users.userAuth.userInfo);

  useEffect(() => {
    dispatch(fetchAllGemRequestsAction());
  }, [dispatch]);

  const handleStatusChange = (id, status) => {
    Swal.fire({
      icon: "question",
      title: `Are you sure you want to ${status.toLowerCase()} this request?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: status === "Accepted" ? "#22c55e" : "#ef4444",
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(updateGemRequestStatusAction({ id, status })).then(() => {
          dispatch(fetchAllGemRequestsAction());
          Swal.fire("Success!", `Request ${status.toLowerCase()} successfully`, "success");
        });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This request will be permanently deleted.",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(`${baseURL}/requests/${id}`, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          })
          .then(() => {
            dispatch(fetchAllGemRequestsAction());
            Swal.fire("Deleted!", "Request has been removed.", "success");
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">Manage Gem Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-600">No requests available.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            className="border p-5 rounded-lg mb-5 bg-white shadow hover:shadow-md transition duration-200"
          >
            <h3 className="font-bold text-lg text-indigo-600">{req.gemName}</h3>
            <p>
              <strong>User:</strong> {req.user?.fullname} ({req.user?.email})
            </p>
            <p>
              <strong>Weight:</strong> {req.weight} carats
            </p>
            <p>
              <strong>Needed Date:</strong>{" "}
              {new Date(req.neededDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Expected Price:</strong> Rs. {req.expectedPrice}
            </p>
            <p className="text-sm text-gray-700 my-2">
              <strong>Description:</strong> {req.description}
            </p>
            <p>
              <strong>Phone:</strong> {req.phone}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  req.status === "Pending"
                    ? "text-yellow-500"
                    : req.status === "Accepted"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {req.status}
              </span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {req.status === "Pending" && (
                <>
                  <button
                    onClick={() => handleStatusChange(req._id, "Accepted")}
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(req._id, "Rejected")}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </>
              )}
              {req.status === "Rejected" && (
                <button
                  onClick={() => handleDelete(req._id)}
                  className="bg-gray-700 text-white px-4 py-1 rounded hover:bg-gray-800"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
