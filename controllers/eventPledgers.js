const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const eventPledgers = express.Router();

eventPledgers.get("/", async (req, res, next) => {
  try {
    const allEventPledgers = await prisma.eventPledger.findMany({
      include: { events: true },
    });

    res.status(200).json(allEventPledgers);
  } catch (error) {
    next(error);
  }
});

eventPledgers.post("/register", async (req, res, next) => {
  try {
    const { pledgerEthAddress, pledgerInfo, eventsId } = req.body;

    const newEventPledgers = await prisma.eventPledger.create({
      data: {
        pledgerEthAddress,
        pledgerInfo,
        eventsId,
      },
    });
    console.log(newEventPledgers);
    res.status(201).json(newEventPledgers);
  } catch (error) {
    next(error);
  }
});

module.exports = eventPledgers;
