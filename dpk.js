const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;
//instead of if else for assigning candidate variable I did it through or operator.
  if (event) {
   candidate =
		event.partitionKey ||
		crypto
			.createHash("sha3-512")
			.update(JSON.stringify(event))
			.digest("hex");
  }
  //event is not present at all. it is taking default TRIVIAL_PARTITION_KEY
  else {
    candidate = TRIVIAL_PARTITION_KEY
  }
  //this check if candidate is an object
  if(typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }
  //mandatory check 
  if(candidate.length > MAX_PARTITION_KEY_LENGTH) {
		candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
   }
  return candidate;
};