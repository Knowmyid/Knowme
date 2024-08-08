import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  AadhaarNumberStored,
  DobStored,
  FatherNameStored,
  GenderStored,
  NameStored,
  PhoneNumberStored,
  PincodeStored,
  UserAddressStored
} from "../generated/aadharStorage/aadharStorage"

export function createAadhaarNumberStoredEvent(
  user: Address,
  aadhaarNumber: string
): AadhaarNumberStored {
  let aadhaarNumberStoredEvent = changetype<AadhaarNumberStored>(newMockEvent())

  aadhaarNumberStoredEvent.parameters = new Array()

  aadhaarNumberStoredEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  aadhaarNumberStoredEvent.parameters.push(
    new ethereum.EventParam(
      "aadhaarNumber",
      ethereum.Value.fromString(aadhaarNumber)
    )
  )

  return aadhaarNumberStoredEvent
}

export function createDobStoredEvent(user: Address, dob: string): DobStored {
  let dobStoredEvent = changetype<DobStored>(newMockEvent())

  dobStoredEvent.parameters = new Array()

  dobStoredEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  dobStoredEvent.parameters.push(
    new ethereum.EventParam("dob", ethereum.Value.fromString(dob))
  )

  return dobStoredEvent
}

export function createFatherNameStoredEvent(
  user: Address,
  fatherName: string
): FatherNameStored {
  let fatherNameStoredEvent = changetype<FatherNameStored>(newMockEvent())

  fatherNameStoredEvent.parameters = new Array()

  fatherNameStoredEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  fatherNameStoredEvent.parameters.push(
    new ethereum.EventParam("fatherName", ethereum.Value.fromString(fatherName))
  )

  return fatherNameStoredEvent
}

export function createGenderStoredEvent(
  user: Address,
  gender: string
): GenderStored {
  let genderStoredEvent = changetype<GenderStored>(newMockEvent())

  genderStoredEvent.parameters = new Array()

  genderStoredEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  genderStoredEvent.parameters.push(
    new ethereum.EventParam("gender", ethereum.Value.fromString(gender))
  )

  return genderStoredEvent
}

export function createNameStoredEvent(user: Address, name: string): NameStored {
  let nameStoredEvent = changetype<NameStored>(newMockEvent())

  nameStoredEvent.parameters = new Array()

  nameStoredEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  nameStoredEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )

  return nameStoredEvent
}

export function createPhoneNumberStoredEvent(
  user: Address,
  phoneNumber: string
): PhoneNumberStored {
  let phoneNumberStoredEvent = changetype<PhoneNumberStored>(newMockEvent())

  phoneNumberStoredEvent.parameters = new Array()

  phoneNumberStoredEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  phoneNumberStoredEvent.parameters.push(
    new ethereum.EventParam(
      "phoneNumber",
      ethereum.Value.fromString(phoneNumber)
    )
  )

  return phoneNumberStoredEvent
}

export function createPincodeStoredEvent(
  user: Address,
  pincode: string
): PincodeStored {
  let pincodeStoredEvent = changetype<PincodeStored>(newMockEvent())

  pincodeStoredEvent.parameters = new Array()

  pincodeStoredEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  pincodeStoredEvent.parameters.push(
    new ethereum.EventParam("pincode", ethereum.Value.fromString(pincode))
  )

  return pincodeStoredEvent
}

export function createUserAddressStoredEvent(
  user: Address,
  userAddress: string
): UserAddressStored {
  let userAddressStoredEvent = changetype<UserAddressStored>(newMockEvent())

  userAddressStoredEvent.parameters = new Array()

  userAddressStoredEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  userAddressStoredEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromString(userAddress)
    )
  )

  return userAddressStoredEvent
}
