module.exports = {
	/* -------------------------------------------------------------------------- */
	/*                                    rules                                   */
	/* -------------------------------------------------------------------------- */
	rules: {
		"@typescript-eslint/class-literal-property-style": "error",
		"@typescript-eslint/prefer-readonly": "error",
		"@typescript-eslint/consistent-type-definitions": ["error", "interface"],
		"@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
		"@typescript-eslint/explicit-function-return-type": [
			"error",
			{
				allowExpressions: true,
				allowTypedFunctionExpressions: true,
				allowHigherOrderFunctions: true,
				allowDirectConstAssertionInArrowFunctions: true
			}
		],
		"@typescript-eslint/explicit-member-accessibility": [
			"error",
			{
				accessibility: "explicit",
				overrides: {
					constructors: "no-public"
				}
			}
		],
		"@typescript-eslint/explicit-module-boundary-types": "error",
		"@typescript-eslint/member-delimiter-style": "error",
		"@typescript-eslint/member-ordering": [
			"error",
			{
				default: {
					order: "as-written",
					memberTypes: [
						"signature",
						// static
						"public-static-get",
						"public-static-field",
						"protected-static-field",
						"private-static-field",
						// instance public
						"public-decorated-get",
						"public-decorated-set",
						"public-instance-get",
						"public-instance-set",
						"public-abstract-get",
						"public-abstract-set",
						"public-decorated-field",
						"public-instance-field",
						"public-abstract-field",
						"public-decorated-method",
						"public-instance-method",
						"public-abstract-method",
						// constructor
						"constructor",
						// instance protected
						"protected-decorated-get",
						"protected-decorated-set",
						"protected-instance-get",
						"protected-instance-set",
						"protected-abstract-get",
						"protected-abstract-set",
						"protected-decorated-field",
						"protected-instance-field",
						"protected-abstract-field",
						"protected-decorated-method",
						"protected-instance-method",
						"protected-abstract-method",
						// instance
						"private-decorated-get",
						"private-decorated-set",
						"private-instance-get",
						"private-instance-set",
						"private-abstract-get",
						"private-abstract-set",
						"private-decorated-field",
						"private-instance-field",
						"private-abstract-field",
						"private-decorated-method",
						"private-instance-method",
						"private-abstract-method"
					]
				}
			}
		],
		"@typescript-eslint/no-confusing-non-null-assertion": "error",
		"@typescript-eslint/no-confusing-void-expression": [
			"error",
			{
				ignoreVoidOperator: true
			}
		],
		"@typescript-eslint/no-dynamic-delete": "error",
		"@typescript-eslint/no-extraneous-class": "error",
		"@typescript-eslint/no-invalid-void-type": "error",
		"@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
		"@typescript-eslint/no-unnecessary-condition": "error",
		"@typescript-eslint/no-unnecessary-qualifier": "error",
		"@typescript-eslint/no-unnecessary-type-arguments": "error",
		"@typescript-eslint/non-nullable-type-assertion-style": "error",
		"@typescript-eslint/prefer-for-of": "error",
		"@typescript-eslint/prefer-function-type": "error",
		"@typescript-eslint/prefer-includes": "error",
		"@typescript-eslint/prefer-literal-enum-member": [
			"error",
			{
				allowBitwiseExpressions: true
			}
		],
		"@typescript-eslint/prefer-nullish-coalescing": "error",
		"@typescript-eslint/prefer-optional-chain": "error",
		"@typescript-eslint/prefer-readonly": "error",
		"@typescript-eslint/prefer-reduce-type-parameter": "error",
		"@typescript-eslint/prefer-regexp-exec": "error",
		"@typescript-eslint/prefer-return-this-type": "error",
		"@typescript-eslint/prefer-string-starts-ends-with": "error",
		"@typescript-eslint/prefer-ts-expect-error": "error",
		"@typescript-eslint/require-array-sort-compare": "error",
		"@typescript-eslint/strict-boolean-expressions": "error",
		"@typescript-eslint/switch-exhaustiveness-check": "error",
		"@typescript-eslint/type-annotation-spacing": "error",
		"@typescript-eslint/unified-signatures": "error",
		"import/no-unresolved": "error",
		"node/no-missing-import": [
			"error",
			{
				resolvePaths: ["node_modules/@types"],
				tryExtensions: [".js", ".json", ".node", ".ts", ".d.ts"]
			}
		],
		"brace-style": "off",
		"@typescript-eslint/brace-style": ["error", "stroustrup"],
		"comma-dangle": "off",
		"@typescript-eslint/comma-dangle": ["error", "never"],
		curly: ["error", "all"],
		"comma-spacing": "off",
		"@typescript-eslint/comma-spacing": "error",
		"default-param-last": "error",
		"@typescript-eslint/default-param-last": "error",
		"func-call-spacing": "off",
		"@typescript-eslint/func-call-spacing": "error",
		"keyword-spacing": "off",
		"@typescript-eslint/keyword-spacing": "error",
		"lines-between-class-members": "off",
		"@typescript-eslint/lines-between-class-members": [
			"error",
			"always",
			{
				exceptAfterOverload: true
			}
		],
		"no-dupe-class-members": "off",
		"@typescript-eslint/no-dupe-class-members": "error",
		"no-duplicate-imports": "off",
		"@typescript-eslint/no-duplicate-imports": "error",
		"no-extra-parens": "off",
		"@typescript-eslint/no-extra-parens": "error",
		"no-invalid-this": "off",
		"@typescript-eslint/no-invalid-this": "error",
		"no-loop-func": "off",
		"@typescript-eslint/no-loop-func": "error",
		"no-magic-numbers": "off",
		"@typescript-eslint/no-magic-numbers": "error",
		"no-redeclare": "off",
		"@typescript-eslint/no-redeclare": "error",
		"no-shadow": "off",
		"@typescript-eslint/no-shadow": "error",
		"no-throw-literal": "off",
		"@typescript-eslint/no-throw-literal": "error",
		"no-unused-expressions": "off",
		"@typescript-eslint/no-unused-expressions": "error",
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": "error",
		"no-use-before-define": "off",
		"@typescript-eslint/no-use-before-define": [
			"error",
			{
				functions: false
			}
		],
		"no-useless-constructor": "off",
		"@typescript-eslint/no-useless-constructor": "error",
		"object-curly-spacing": "off",
		"@typescript-eslint/object-curly-spacing": [
			"error",
			"always",
			{
				arraysInObjects: true,
				objectsInObjects: true
			}
		],
		"padding-line-between-statements": "off",
		"@typescript-eslint/padding-line-between-statements": [
			"error",
			{
				blankLine: "always",
				prev: "*",
				next: "return"
			},
			{
				blankLine: "always",
				prev: "const",
				next: "*"
			},
			{
				blankLine: "never",
				prev: ["const", "let", "multiline-const", "multiline-let"],
				next: ["const", "let", "multiline-const", "multiline-let"]
			},
			{
				blankLine: "always",
				prev: "*",
				next: ["block-like"]
			},
			{
				blankLine: "always",
				prev: ["block-like"],
				next: "*"
			},
			{
				blankLine: "never",
				prev: ["if"],
				next: ["if"]
			}
		],
		quotes: "off",
		"no-return-await": "off",
		"@typescript-eslint/return-await": "error",
		semi: "off",
		"@typescript-eslint/semi": ["error", "always"],
		"space-before-function-paren": "off",
		"@typescript-eslint/space-before-function-paren": ["error", "never"],
		"space-infix-ops": "off",
		"@typescript-eslint/space-infix-ops": [
			"error",
			{
				int32Hint: true
			}
		],
		"spellcheck/spell-checker": ["warn"]
	},
	/* -------------------------------------------------------------------------- */
	/*                                   config                                   */
	/* -------------------------------------------------------------------------- */
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
		tsconfigRootDir: __dirname,
		project: ["./tsconfig.json"]
	},
	plugins: ["@typescript-eslint", "jest", "import", "spellcheck"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:import/recommended",
		"plugin:node/recommended-module"
	],
	env: {
		node: true
	},
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".d.ts"]
		},
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true,
				project: "./tsconfig.json"
			}
		}
	}
};
