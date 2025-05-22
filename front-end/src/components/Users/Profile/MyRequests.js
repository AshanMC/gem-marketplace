import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyGemRequestsAction,
  deleteGemRequestAction,
} from "../../../redux/slices/gemRequests/gemRequestSlice";
import Swal from "sweetalert2";

export default function MyRequests() {
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.gemRequest);

  useEffect(() => {
    dispatch(fetchMyGemRequestsAction());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This will permanently delete the request.",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#e11d48",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteGemRequestAction(id)).then(() => {
          dispatch(fetchMyGemRequestsAction());
          Swal.fire("Deleted!", "Your request has been deleted.", "success");
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-yellow-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">
          My Gem Requests
        </h2>

        {requests.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            You haven't submitted any gem requests yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-xl shadow-lg p-6 transition transform hover:scale-[1.02]"
              >
                <h3 className="text-2xl font-semibold text-indigo-800 mb-2">
                  {req.gemName}
                </h3>
                <p className="text-gray-700 mb-1">
                  <strong>Weight:</strong> {req.weight} carats
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Needed Date:</strong>{" "}
                  {new Date(req.neededDate).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Expected Price:</strong> Rs. {req.expectedPrice}
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Description:</strong> {req.description}
                </p>

                <div
                  className={`inline-block px-3 py-1 text-sm font-medium rounded-full shadow-sm ${
                    req.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : req.status === "Accepted"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {req.status === "Pending" && "Pending"}
                  {req.status === "Accepted" && "Accepted by Admin"}
                  {req.status === "Rejected" && "Rejected by Admin"}
                </div>

                {req.status === "Rejected" && (
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="mt-4 block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm font-medium transition"
                  >
                    Delete Request
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
