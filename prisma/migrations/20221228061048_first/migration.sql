-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "eventEthAddress" VARCHAR(255) NOT NULL,
    "createrEthAddress" VARCHAR(255) NOT NULL,
    "contractAddress" VARCHAR(255) NOT NULL,
    "benificaryBloodBank" VARCHAR(255) NOT NULL,
    "organization" VARCHAR(255) NOT NULL,
    "eventName" VARCHAR(255) NOT NULL,
    "contactPerson" VARCHAR(255) NOT NULL,
    "contactNumber" VARCHAR(255) NOT NULL,
    "noOfTarget" INTEGER NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "startTimeStamp" TIMESTAMP(3) NOT NULL,
    "endTimeStamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventPledger" (
    "id" SERIAL NOT NULL,
    "pledgerEthAddress" VARCHAR(255) NOT NULL,
    "pledgerInfo" VARCHAR(255) NOT NULL,
    "eventsId" INTEGER NOT NULL,

    CONSTRAINT "EventPledger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Events_eventEthAddress_key" ON "Events"("eventEthAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Events_createrEthAddress_key" ON "Events"("createrEthAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Events_contractAddress_key" ON "Events"("contractAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Events_organization_key" ON "Events"("organization");

-- AddForeignKey
ALTER TABLE "EventPledger" ADD CONSTRAINT "EventPledger_eventsId_fkey" FOREIGN KEY ("eventsId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
