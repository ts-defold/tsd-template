import * as tstl from "typescript-to-lua";
import * as ts from "typescript";
import { SourceNode } from "source-map";
import { FunctionExpression } from "typescript-to-lua";

const scriptFunctionExports = [ "init", "on_input", "on_message", "on_reload", "update", "final"];

function addForceExportTag(node: tstl.FunctionDefinition) {
  Object.assign(node, { __forceExport: true });
}

function hasForceExportTag(node: tstl.FunctionDefinition): boolean {
  // @ts-ignore
  return node.__forceExport === true;
}


const plugin: tstl.Plugin = {
  printer: (program, emitHost, fileName, block, luaLibFeatures) => {
    class Printer extends tstl.LuaPrinter {
      public printVariableDeclarationStatement(statement: tstl.VariableDeclarationStatement): SourceNode {
        if (tstl.isFunctionDefinition(statement) && hasForceExportTag(statement)) {
          const chunks = this.printFunctionDefinition(statement);
          return this.createSourceNode(statement, chunks);
        }
        
        return super.printVariableDeclarationStatement(statement);
      }
    }

    return new Printer(emitHost, program, fileName).print(block, luaLibFeatures);
  },

  visitors: {
    [ts.SyntaxKind.SourceFile]: (node, context) => {
      const [block] = context.superTransformNode(node) as [tstl.Block];
      const statements = block.statements.filter((statement) => !tstl.isReturnStatement(statement));

      for (const statement of statements) {
        if (tstl.isVariableDeclarationStatement(statement) && tstl.isFunctionDefinition(statement)) {
          if (/.*.script.ts$/.test(context.sourceFile.fileName) && scriptFunctionExports.includes(statement.left[0].text)) {
            addForceExportTag(statement);
          }
        }
      }

      

      return tstl.createBlock(statements);
    },
  },
};

export default plugin;
