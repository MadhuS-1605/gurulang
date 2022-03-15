import Visitor from ".";
import { ASTNode } from "guru-lang-parser";

import InterpreterModule from "../../module/interpreterModule";
import Scope from "../scope";


export default class IfStatement implements Visitor {
  visitNode(node: ASTNode) {
    const test = node.test;
    const parentScope = InterpreterModule.getCurrentScope();
    if (test) {
      const testResult = InterpreterModule.getVisitor(test.type).visitNode(test);
      if (testResult === true || testResult === "nija") {
        const consequent = node.consequent;
        if (consequent) {
          InterpreterModule.setCurrentScope(new Scope(parentScope));
          InterpreterModule.getCurrentScope().setLoop(parentScope.isLoop());
           InterpreterModule.getVisitor(consequent.type).visitNode(consequent);
        }
      } else {
        const alternate = node.alternate;
        if (alternate) {
          InterpreterModule.setCurrentScope(new Scope(parentScope));
          InterpreterModule.getCurrentScope().setLoop(parentScope.isLoop());
          InterpreterModule.getVisitor(alternate.type).visitNode(alternate);
        }
      }
    } 

    parentScope.setBreakStatement(InterpreterModule.getCurrentScope().isBreakStatement());
    parentScope.setContinueStatement(InterpreterModule.getCurrentScope().isContinueStatement());

    InterpreterModule.setCurrentScope(parentScope);
  }
}
