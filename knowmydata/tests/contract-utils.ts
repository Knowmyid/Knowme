import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { AadhaarDetailsStored } from "../generated/Contract/Contract"

export function createAadhaarDetailsStoredEvent(
  user: Address,
  name: string,
  dob: string,
  gender: string,
  aadhaarNumber: string,
  fatherName: string,
  userAddress: string,
  pincode: string,
  phoneNumber: string
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
  aadhaarDetailsStoredEvent.parameters.push(
    new ethereum.EventParam("fatherName", ethereum.Value.fromString(fatherName))
  )
  aadhaarDetailsStoredEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromString(userAddress)
    )
  )
  aadhaarDetailsStoredEvent.parameters.push(
    new ethereum.EventParam("pincode", ethereum.Value.fromString(pincode))
  )
  aadhaarDetailsStoredEvent.parameters.push(
    new ethereum.EventParam(
      "phoneNumber",
      ethereum.Value.fromString(phoneNumber)
    )
  )

  return aadhaarDetailsStoredEvent
}
