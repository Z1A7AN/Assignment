import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { HttpStatusCode } from "../constants/HttpStatusCode.js";
import { ApiMessages } from "../constants/ApiMessages.js";
import { Destination } from "../models/destinations.model.js";

const addDestination = asyncHandler(async (req, res) => {
  const { city, country, clues, fun_fact, trivia } = req.body;

  if (!city || !country || !clues || !fun_fact || !trivia) {
    throw new ApiError(HttpStatusCode.bad_request, ApiMessages.MISSING_FIELDS);
  }

  const destination = await Destination.create({
    city,
    country,
    clues,
    fun_fact,
    trivia,
  });

  if (!destination) {
    throw new ApiError(
      HttpStatusCode.internal_server_error,
      ApiMessages.DESTINATION_NOT_CREATED
    );
  }

  return res
    .status(HttpStatusCode.created)
    .json(new ApiResponse(HttpStatusCode.ok, destination, ApiMessages.SUCCESS));
});

const getRandom = asyncHandler(async (req, res) => {
  const count = await Destination.countDocuments();
  const randomIndex = Math.floor(Math.random() * count);
  const randomDestination = await Destination.findOne().skip(randomIndex);

  if (!randomDestination) {
    throw new ApiError(
      HttpStatusCode.not_found,
      ApiMessages.DESTINATION_NOT_FOUND
    );
  }

  const wrongOptions = await Destination.aggregate([
    { $match: { _id: { $ne: randomDestination._id } } },
    { $sample: { size: 3 } },
    { $project: { city: 1 } },
  ]);
  const wrongCities = wrongOptions.map((option) => option.city);

  const options = [randomDestination.city, ...wrongCities].sort(
    () => Math.random() - 0.5
  );

  const response = {
    token: randomDestination._id,
    options,
    clues: randomDestination.clues,
  };

  return res
    .status(HttpStatusCode.ok)
    .json(new ApiResponse(HttpStatusCode.ok, response, ApiMessages.SUCCESS));
});

const validateAnswer = asyncHandler(async (req, res) => {
  const { token, answer } = req.body;

  if (!token || !answer) {
    throw new ApiError(HttpStatusCode.bad_request, ApiMessages.MISSING_FIELDS);
  }

  const destination = await Destination.findById(token);

  if (!destination) {
    throw new ApiError(
      HttpStatusCode.not_found,
      ApiMessages.DESTINATION_NOT_FOUND
    );
  }

  const correct = destination.city.toLowerCase() === answer.toLowerCase();

  const allFacts = destination.fun_fact.concat(destination.trivia);

  const randomIndex = Math.floor(Math.random() * allFacts.length);
  const randomFact = allFacts[randomIndex];

  const response = {
    city: destination.city,
    country: destination.country,
    correct,
    fact: randomFact,
  };

  return res
    .status(HttpStatusCode.ok)
    .json(
      new ApiResponse(HttpStatusCode.ok, response, ApiMessages.ANSWER_SEND)
    );
});

const getDestinationData = asyncHandler(async (req, res) => {
  const destination = await Destination.find();

  if (!destination) {
    throw new ApiError(
      HttpStatusCode.not_found,
      ApiMessages.DESTINATION_NOT_FOUND
    );
  }

  return res
    .status(HttpStatusCode.ok)
    .json(new ApiResponse(HttpStatusCode.ok, destination, ApiMessages.SUCCESS));
});

export { addDestination, getRandom, validateAnswer, getDestinationData};