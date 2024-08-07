import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { AadhaarDetailsStored } from "../generated/schema"
import { AadhaarDetailsStored as AadhaarDetailsStoredEvent } from "../generated/AadhaarStorage/AadhaarStorage"
import { handleAadhaarDetailsStored } from "../src/aadhaar-storage"
import { createAadhaarDetailsStoredEvent } from "./aadhaar-storage-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let name = "Example string value"
    let dob = "Example string value"
    let gender = "Example string value"
    let aadhaarNumber = "Example string value"
    let newAadhaarDetailsStoredEvent = createAadhaarDetailsStoredEvent(
      user,
      name,
      dob,
      gender,
      aadhaarNumber
    )
    handleAadhaarDetailsStored(newAadhaarDetailsStoredEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AadhaarDetailsStored created and stored", () => {
    assert.entityCount("AadhaarDetailsStored", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AadhaarDetailsStored",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AadhaarDetailsStored",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "AadhaarDetailsStored",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "dob",
      "Example string value"
    )
    assert.fieldEquals(
      "AadhaarDetailsStored",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "gender",
      "Example string value"
    )
    assert.fieldEquals(
      "AadhaarDetailsStored",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "aadhaarNumber",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
