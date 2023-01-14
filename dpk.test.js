const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("should return partitionKey if present", () => {
		const event = { partitionKey: "test" };
		expect(deterministicPartitionKey(event)).toBe("test");
	});

   it("should return hashed string if no partitionKey", () => {
		const event = { data: "test" };
		const hashedString = crypto
			.createHash("sha3-512")
			.update(JSON.stringify(event))
			.digest("hex");
		expect(deterministicPartitionKey(event)).toBe(hashedString)
   });



    it("should return hashed string if partitionKey length is greater than max limit", () => {
			const event = { partitionKey: "a".repeat(257) };
			const hashedString = crypto
				.createHash("sha3-512")
				.update("a".repeat(257))
				.digest("hex");
			expect(deterministicPartitionKey(event)).toBe(hashedString);
		});
});
