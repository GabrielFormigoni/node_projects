const User = require("../models/User");
const Job = require("../models/Job");
const { NotFoundError, BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getAllJobs = async (req, res, next) => {
  const job = await Job.find({ createdBy: req.user.userId }).sort("company");
  res.status(StatusCodes.OK).json({ status: "Success", data: job });
};

const getJob = async (req, res, next) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ status: "success", data: job });
};

const createJob = async (req, res, next) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ status: "success", job: job });
};

const updateJob = async (req, res, next) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (!company || !position) {
    throw new BadRequestError("Por favor, informe a compania e a posição!");
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(
      `Nenhuma correspondência encontrada para o id: ${jobId}`
    );
  }

  res.status(StatusCodes.OK).json({ status: "success", data: job });
};

const deleteJob = async (req, res, next) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(
      `Nenhuma correspondência encontrada para o id: ${jobId}`
    );
  }

  res
    .status(StatusCodes.OK)
    .json({
      status: "success",
      data: `Trabalho com id: ${jobId} deletado com sucesso.`,
    });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
