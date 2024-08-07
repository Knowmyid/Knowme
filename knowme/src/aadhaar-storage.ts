import { AadhaarDetailsStored as AadhaarDetailsStoredEvent } from "../generated/AadhaarStorage/AadhaarStorage"
import { AadhaarDetailsStored } from "../generated/schema"

export function handleAadhaarDetailsStored(
  event: AadhaarDetailsStoredEvent
): void {
  let entity = new AadhaarDetailsStored(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.name = event.params.name
  entity.dob = event.params.dob
  entity.gender = event.params.gender
  entity.aadhaarNumber = event.params.aadhaarNumber

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
