import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { AadhaarDetailsStored } from "../generated/AadhaarStorage/AadhaarStorage"

export function createAadhaarDetailsStoredEvent(
  user: Address,
  name: string,
  dob: string,
  gender: string,
  aadhaarNumber: string
): AadhaarDetailsStored {
  let aadhaarDetailsStoredEvent = changetype<AadhaarDetailsStored>(
    newMockEvent()
  )

  aadhaarDetailsStoredEvent.parameters = new Array()

  aadhaarDetailsStoredEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  aadhaarDetailsStoredEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  aadhaarDetailsStoredEvent.parameters.push(
    new ethereum.EventParam("dob", ethereum.Value.fromString(dob))
  )
  aadhaarDetailsStoredEvent.parameters.push(
    new ethereum.EventParam("gender", ethereum.Value.fromString(gender))
  )
  aadhaarDetailsStoredEvent.parameters.push(
    new ethereum.EventParam(
      "aadhaarNumber",
      ethereum.Value.fromString(aadhaarNumber)
    )
  )

  return aadhaarDetailsStoredEvent
}
