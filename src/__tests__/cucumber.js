module.exports = {
	default: [
		`--format-options '{"snippetInterface": "synchronous"}'`,
		"--require-module ts-node/register",
		"--require 'features/**/*.ts'"
	].join(" ")
};
