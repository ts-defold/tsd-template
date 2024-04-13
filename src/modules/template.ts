/*
 * Example Module
 */
export class Template {
	boasting: Array<string> = [
		'  ⭐ .vscode folder based project',
		'  ⭐ lua-types and defold-types for autocomplete and inline docs',
		'  ⭐ eslint with sane typescript defaults',
		'  ⭐ patched typescript-to-lua to generate *.script files',
		'  ⭐ @ts-defold/tstl-export-as-global plugin for rewriting module exports',
	];

	public features(): Array<string> {
		return this.boasting;
	}
}
