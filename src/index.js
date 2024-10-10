import {
  Decoder,
  Stream,
  Profile,
  Utils,
} from "../node_modules/@garmin/fitsdk/src/index.js";

function getFit(bytes) {
  const stream = Stream.fromByteArray(bytes);
  console.log("isFIT (static method): " + Decoder.isFIT(stream));

  const decoder = new Decoder(stream);
  console.log("isFIT (instance method): " + decoder.isFIT());
  console.log("checkIntegrity: " + decoder.checkIntegrity());

  const { messages, errors } = decoder.read();

  console.log(errors);
  console.log(messages);
}

document
  .getElementById("input")
  .addEventListener("change", (event) => getFile(event.target));

function getFile(input) {
  console.log(input);
  let selectedFile = input.files[0];

  let reader = new FileReader();

  reader.readAsArrayBuffer(selectedFile);

  reader.onload = function () {
    getFit(reader.result);
    console.log(reader.result);
  };

  reader.onerror = function () {
    console.log(reader.error);
  };
}
