#!/usr/bin/env bun

/**
 * This script sets up the environment files and BETTER_AUTH_SECRET for the @celestial-rose/stack.
 * It:
 * 1. Copies example environment files to their actual environment files if they don't exist
 * 2. Generates a random secret using openssl and updates the BETTER_AUTH_SECRET in the actual environment files
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

console.log("🌹 Setting up environment files for @celestial-rose/stack...");

// Define file paths
const webEnvPath = path.join(process.cwd(), "packages/web/.env");
const webEnvExamplePath = path.join(process.cwd(), "packages/web/.env.example");
const webDevEnvPath = path.join(process.cwd(), "packages/web/.env.development.local");
const webDevEnvExamplePath = path.join(process.cwd(), "packages/web/.env.development.local.example");
const apiEnvPath = path.join(process.cwd(), "packages/api/.dev.vars");
const apiEnvExamplePath = path.join(process.cwd(), "packages/api/.dev.vars.example");

try {
    // Function to copy example file to actual file if it doesn't exist
    const copyExampleFile = (targetPath: string, examplePath: string) => {
        if (!fs.existsSync(targetPath) && fs.existsSync(examplePath)) {
            console.log(`Creating ${targetPath} from example file...`);
            fs.copyFileSync(examplePath, targetPath);
            console.log(`✅ Created ${targetPath}`);
            return true;
        }

        if (fs.existsSync(targetPath)) {
            console.log(`${targetPath} already exists, skipping copy.`);
            return true;
        }

        console.error(`Example file ${examplePath} not found. Cannot create ${targetPath}.`);
        return false;
    };

    // Copy example files to actual files
    const webEnvCopied = copyExampleFile(webEnvPath, webEnvExamplePath);
    const webDevEnvCopied = copyExampleFile(webDevEnvPath, webDevEnvExamplePath);
    const apiEnvCopied = copyExampleFile(apiEnvPath, apiEnvExamplePath);

    // Generate a random secret using openssl
    console.log("Generating random secret for BETTER_AUTH_SECRET...");
    const secret = execSync("openssl rand -base64 32").toString().trim();
    console.log("Secret generated successfully!");

    // Function to update the BETTER_AUTH_SECRET in an env file
    const updateEnvFile = (filePath: string) => {
        console.log(`Updating BETTER_AUTH_SECRET in ${filePath}...`);

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            console.error(`${filePath} does not exist. Cannot update.`);
            return false;
        }

        // Read the file content
        let content = fs.readFileSync(filePath, "utf-8");

        // Update the BETTER_AUTH_SECRET value
        content = content.replace(/BETTER_AUTH_SECRET=".*?"/g, `BETTER_AUTH_SECRET="${secret}"`);

        // Write the updated content back to the file
        fs.writeFileSync(filePath, content);
        console.log(`✅ Updated ${filePath} with new BETTER_AUTH_SECRET`);
        return true;
    };

    // Update BETTER_AUTH_SECRET in all env files
    const webEnvUpdated = webEnvCopied ? updateEnvFile(webEnvPath) : false;
    const webDevEnvUpdated = webDevEnvCopied ? updateEnvFile(webDevEnvPath) : false;
    const apiEnvUpdated = apiEnvCopied ? updateEnvFile(apiEnvPath) : false;

    if (webEnvCopied && webDevEnvCopied && apiEnvCopied && webEnvUpdated && webDevEnvUpdated && apiEnvUpdated) {
        console.log("✅ Environment setup complete!");
    } else {
        console.log("⚠️ Environment setup completed with warnings.");
    }

    process.exit(0);
} catch (error) {
    console.error("❌ Error setting up environment:", error instanceof Error ? error.message : String(error));
    process.exit(1);
}
