import { InitialOptionsTsJest } from "ts-jest";

const config: InitialOptionsTsJest = {
	preset: "ts-jest",
	testEnvironment: "node",
	modulePathIgnorePatterns: ["features"]
};

module.exports = config;
