const express = require("express");
const app = express();

app.listen(5000, () => {
  console.log("App is Runing ");
});

const fs = require("fs");

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const wordLength = 8;

// Create a writable stream
const writeStream = fs.createWriteStream("combinations.txt");

// Function to generate combinations iteratively
function generateCombinations() {
  const stack = [{ prefix: "", index: 0 }];

  while (stack.length > 0) {
    const { prefix, index } = stack.pop();

    if (prefix.length === wordLength) {
      writeCombination(prefix);
    } else {
      for (let i = index; i < letters.length; i++) {
        stack.push({ prefix: prefix + letters[i], index: i });
      }
    }
  }

  // Close the stream once all combinations are written
  writeStream.end(() => {
    console.log("Combinations written to combinations.txt");
  });

  // Handle errors
  writeStream.on("error", (err) => {
    console.error("Error writing to file:", err);
  });
}

// Write combinations to the file
function writeCombination(combination) {
  if (!writeStream.write(combination + "\n")) {
    // If the stream's buffer is full, wait for the 'drain' event before continuing
    writeStream.once("drain", () => writeCombination(combination));
  }
}

// Generate combinations
generateCombinations();

// // You can try increasing the memory limit for your Node.js process. You can do this by running your script with the --max-old-space-size flag followed by the desired memory limit in megabytes. For example:
// // node --max-old-space-size=4096 your_script.js

// const fs = require("fs").promises;

// const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
// const wordLength = 8;

// // Function to generate combinations recursively
// function generateCombinations(prefix, length) {
//   if (length === 0) {
//     return [prefix];
//   }

//   let combinations = [];
//   for (let i = 0; i < letters.length; i++) {
//     combinations = combinations.concat(generateCombinations(prefix + letters[i], length - 1));
//   }

//   return combinations;
// }

// // Generate combination
// const allCombinations = generateCombinations("", wordLength);

// // Write combinations to a file
// fs.writeFile("combinations.txt", allCombinations.join("\n"), (err) => {
//   if (err) {
//     console.error("Error writing to file:", err);
//   } else {
//     console.log("Combinations written to combinations.txt");
//   }
// });
