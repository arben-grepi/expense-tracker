const fs = require("fs");
const path = require("path");

// Function to recursively read the directory structure and print it in a tree-like format
function printTree(dirPath, depth = 0) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);

    // Skip node_modules and hidden files/folders
    if (
      file === "node_modules" ||
      file === ".gitignore" ||
      file === "client" ||
      file.startsWith(".")
    )
      return;

    const stats = fs.statSync(fullPath);

    // Indentation for the current level of depth
    const indent = " ".repeat(depth * 2);

    if (stats.isDirectory()) {
      // Print the directory name with a tree-like prefix
      console.log(`${indent}├── ${file}`);
      // Recursively call the function for subdirectories
      printTree(fullPath, depth + 1);
    } else {
      // Print the file name with a tree-like prefix
      console.log(`${indent}├── ${file}`);
    }
  });
}

// Set the project path (current directory)
const projectPath = __dirname;
console.log("Project structure:");
printTree(projectPath);
