import Statement from ".";

import { TokenTypes } from "../../../constants/bhaiLangSpec";
import { NodeType } from "../../../constants/constants";
import TokenExecutor from "../tokenExecutor";
import { ASTNode } from "../types/nodeTypes";

import Expression from "./expression";
import NullLiteral from "./expression/literals/nullLiteral";


export default class IfStatement extends Statement {

  private _nullLiteral: NullLiteral;

  constructor(tokenExecutor: TokenExecutor, nullLiteral: NullLiteral) {
      super(tokenExecutor);
      this._nullLiteral = nullLiteral;
  }

  getStatement(): ASTNode {

    this._tokenExecutor.eatTokenAndForwardLookahead(TokenTypes.GURU_EEGA_TYPE);

    this._tokenExecutor.eatTokenAndForwardLookahead(TokenTypes.OPEN_PARENTHESIS_TYPE);

    const test = Expression.getExpressionImpl(
    NodeType.AssignmentExpression
    ).getExpression();

    this._tokenExecutor.eatTokenAndForwardLookahead(TokenTypes.CLOSED_PARENTHESIS_TYPE);
    this._tokenExecutor.eatTokenAndForwardLookahead(TokenTypes.AADRE_TYPE);

    if (this._tokenExecutor.getLookahead() == null) {
      throw new SyntaxError(`Unexpected end of "guru eega" statement`);
    }

    const consequent = Statement.getStatementImpl(this._tokenExecutor.getLookahead()!).getStatement();

    const alternate = this._tokenExecutor.getLookahead() != null && this._tokenExecutor.getLookahead()!.type === TokenTypes.ILLANDRE_GURU_TYPE ? this._tokenExecutor.eatTokenAndForwardLookahead(TokenTypes.ILLANDRE_GURU_TYPE) && Statement.getStatementImpl(this._tokenExecutor.getLookahead()!).getStatement() : this._nullLiteral.getLiteral();

    return {
        type: NodeType.IfStatement,
        test,
        consequent,
        alternate
    }
  }
}
