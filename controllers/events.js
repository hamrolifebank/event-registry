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

eventsRouter.get("/:id/pledgers", async (req, res, next) => {
  try {
    const id = req.params.id;

    const singleEventPlegders = await prisma.eventPledger.findMany({
      where: {
        eventsId: Number(id),
      },
    });

    res.status(200).json(singleEventPlegders);
  } catch (error) {
    next(error);
  }
});

eventsRouter.put("/edit/:id", async (req, res, next) => {
  try {
    const updatedEvent = await prisma.events.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.status(200).json(updatedEvent);
  } catch (error) {
    return res.status(400).json({ success: false });
  }
});
eventsRouter.delete("/delete/:id", async (req, res, next) => {
  try {
    const deletedEvent = await prisma.events.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).json(deletedEvent);
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

module.exports = eventsRouter;
