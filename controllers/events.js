const express = require("express");
const { PrismaClient } = require("@prisma/client");

const eventsRouter = express.Router();
const prisma = new PrismaClient();

eventsRouter.get("/", async (req, res, next) => {
  try {
    const allEvents = await prisma.events.findMany({
      include: { eventPledgers: true },
    });

    res.status(200).json(allEvents);
  } catch (error) {
    next(error);
  }
});

eventsRouter.post("/register", async (req, res, next) => {
  try {
    const {
      eventEthAddress,
      createrEthAddress,
      contractAddress,
      benificaryBloodBank,
      organization,
      eventName,
      contactPerson,
      contactNumber,
      noOfTarget,
      location,
      latitude,
      longitude,
      startTimeStamp,
      endTimeStamp,
    } = req.body;

    const newEvent = await prisma.events.create({
      data: {
        eventEthAddress,
        createrEthAddress,
        contractAddress,
        benificaryBloodBank,
        organization,
        eventName,
        contactPerson,
        contactNumber,
        noOfTarget,
        location,
        latitude,
        longitude,
        startTimeStamp,
        endTimeStamp,
      },
    });

    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
});

module.exports = eventsRouter;
