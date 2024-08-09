import {
  AadhaarNumberStored as AadhaarNumberStoredEvent,
  DobStored as DobStoredEvent,
  FatherNameStored as FatherNameStoredEvent,
  GenderStored as GenderStoredEvent,
  NameStored as NameStoredEvent,
  PhoneNumberStored as PhoneNumberStoredEvent,
  PincodeStored as PincodeStoredEvent,
  UserAddressStored as UserAddressStoredEvent
} from "../generated/aadharStorage/aadharStorage"
import {
  AadhaarNumberStored, 
  DobStored,
  FatherNameStored,
  GenderStored,
  NameStored,
  PhoneNumberStored,
  PincodeStored,
  UserAddressStored
} from "../generated/schema"

export function handleAadhaarNumberStored(
  event: AadhaarNumberStoredEvent
): void {
  let entity = new AadhaarNumberStored(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.aadhaarNumber = event.params.aadhaarNumber

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDobStored(event: DobStoredEvent): void {
  let entity = new DobStored(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.dob = event.params.dob

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFatherNameStored(event: FatherNameStoredEvent): void {
  let entity = new FatherNameStored(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.fatherName = event.params.fatherName

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGenderStored(event: GenderStoredEvent): void {
  let entity = new GenderStored(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.gender = event.params.gender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNameStored(event: NameStoredEvent): void {
  let entity = new NameStored(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.name = event.params.name

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePhoneNumberStored(event: PhoneNumberStoredEvent): void {
  let entity = new PhoneNumberStored(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.phoneNumber = event.params.phoneNumber

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePincodeStored(event: PincodeStoredEvent): void {
  let entity = new PincodeStored(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.pincode = event.params.pincode

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUserAddressStored(event: UserAddressStoredEvent): void {
  let entity = new UserAddressStored(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.userAddress = event.params.userAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
