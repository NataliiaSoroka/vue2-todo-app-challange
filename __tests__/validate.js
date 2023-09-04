import isPhone from "../src/utils/validators/isPhone";

test("phone number should not allow letters", () => {
  expect(isPhone("0123456789a")).toBe(false)
})

test("phone number allow only digits", () => {
  expect(isPhone("0123456789")).toBe(true)
})

test("phone number allow symbols", () => {
  expect(isPhone("+123456789")).toBe(true)
})