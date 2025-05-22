import asyncHandler from "express-async-handler";
import GemRequest from "../model/gemRequestModel.js";

// @desc    Create a gem request
// @route   POST /api/v1/requests
// @access  Private
export const createGemRequest = asyncHandler(async (req, res) => {
  const { gemName, weight, description, neededDate, expectedPrice } = req.body;

  const request = await GemRequest.create({
    user: req.userAuthId,
    gemName,
    weight,
    description,
    neededDate,
    expectedPrice,
  });

  res.status(201).json(request);
});

// @desc    Get logged-in user's requests
// @route   GET /api/v1/requests/my
// @access  Private
export const getMyGemRequests = asyncHandler(async (req, res) => {
  const requests = await GemRequest.find({ user: req.userAuthId }).sort("-createdAt");
  res.json(requests);
});

// @desc    Get all gem requests (admin)
// @route   GET /api/v1/requests
// @access  Admin
export const getAllGemRequests = asyncHandler(async (req, res) => {
  const requests = await GemRequest.find().populate("user", "fullname email").sort("-createdAt");
  res.json(requests);
});
// @desc    Delete a request (admin)
// @route   DELETE /api/v1/requests/:id
// @access  Admin
export const deleteGemRequest = asyncHandler(async (req, res) => {
  const request = await GemRequest.findById(req.params.id);
  if (!request) {
    res.status(404);
    throw new Error("Request not found");
  }

  await request.deleteOne();
  res.json({ message: "Request deleted successfully" });
});

// @desc    Update request status (Accept/Reject)
// @route   PUT /api/v1/requests/:id/status
// @access  Admin
export const updateGemRequestStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = ["Accepted", "Rejected"];

  if (!validStatuses.includes(status)) {
    res.status(400);
    throw new Error("Invalid status");
  }

  const request = await GemRequest.findById(req.params.id);
  if (!request) {
    res.status(404);
    throw new Error("Request not found");
  }

  request.status = status;
  await request.save();

  res.json({ message: `Request ${status.toLowerCase()} successfully` });
});
// @desc    Delete a rejected request (user)
// @route   DELETE /api/v1/requests/:id
// @access  Private
export const deleteMyRejectedRequest = asyncHandler(async (req, res) => {
  const request = await GemRequest.findById(req.params.id);

  if (!request) {
    res.status(404);
    throw new Error("Request not found");
  }

  if (request.user.toString() !== req.userAuthId.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this request");
  }

  if (request.status !== "Rejected") {
    res.status(400);
    throw new Error("Only rejected requests can be deleted");
  }

  await request.deleteOne();
  res.json({ message: "Request deleted successfully" });
});
