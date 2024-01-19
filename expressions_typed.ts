export {}    // do not remove

/* Type declarations DO NOT MODIFY */
// An expression of type number
type NumExpr = BinaryNExpr | LengthExpr | Literal<number> ;
// The length of a string
type LengthExpr = ["length", StringExpr];
// A binary numeric expression
type BinaryNExpr = [string, NumExpr, NumExpr];
// An expression of type string
type StringExpr = StringifyExpr | ConcatExpr | Literal<string> ;
// The string representation of a number
type StringifyExpr = ["stringify", NumExpr];
// The concatenation of two strings
type ConcatExpr = ["concat", StringExpr, StringExpr];
// A literal value of type T (either string or number).
type Literal<T> = ["literal", T];
/* End of type declarations */


/**
 * Make a new binary numeric expression
 * @param operator the operator
 * @param lhs the left argument of the operator
 * @param rhs the right argument of the operator
 * @precondition the operator is either "+"or "-".
 * @returns the binary expression "lhs operator rhs", or undefined if the
 *     operator is not supported
 */
function make_binary_nexpr(operator: string,
                           lhs: NumExpr,
                           rhs: NumExpr): BinaryNExpr | undefined {
    return operator === "+" || operator === "-"
        ? [operator, lhs, rhs]
        : undefined;
}

/**
 * Get the left-hand operand of a binary numeric expression.
 * @param expr a binary numeric expression
 * @returns the left-hand operand of expr
 */
function get_nlhs(expr: BinaryNExpr): NumExpr {
    return expr[1];
}

/**
 * Get the right-hand operand of a binary numeric expression.
 * @param expr a binary numeric expression
 * @returns the right-hand operand of expr
 */
function get_nrhs(expr: BinaryNExpr): NumExpr {
    return expr[2];
}

/**
 * Make a new binary addition expression.
 * Convenience function.
 * @param lhs the left argument of the sum
 * @param rhs the right argument of the sum
 * @returns the binary expression "lhs + rhs"
 */
function make_nadd(lhs: NumExpr, rhs: NumExpr): BinaryNExpr {
    return make_binary_nexpr("+", lhs, rhs)!;
}

/**
 * Make a new binary subtraction expression.
 * Convenience function.
 * @param lhs the minuend of the difference
 * @param rhs the subtrahend of the difference
 * @returns the binary expression "lhs - rhs"
 */
function make_nsub(lhs: NumExpr, rhs: NumExpr): BinaryNExpr {
    return make_binary_nexpr("-", lhs, rhs)!;
}

/**
 * Check if an expression is a binary numeric expression.
 * @param expr the expression
 * @returns true iff expr is a binary numeric expression
 */
function is_nbinary(expr: NumExpr): expr is BinaryNExpr {
    const tag = expr[0];
    return tag === "+" || tag === "-";
}

/**
 * Get the operator of a binary numeric expression.
 * @param expr an expression
 * @returns the operator of expr
 */
function get_noperator(expr: any): any {
    return expr[0];
}

/**
 * Check if a binary numeric expression is a sum.
 * @param expr the expression
 * @returns true iff expr is a sum
 */
function is_nadd(expr: any): any {
    return get_noperator(expr) === "+";
}

/**
 * Check if a binary numeric expression is a difference.
 * @param expr the expression
 * @returns true iff expr is a difference
 */
function is_nsub(expr: any): any {
    return get_noperator(expr) === "-";
}

/**
 * Makes a new length expression.
 * @param str the argument of the length operator
 * @returns the unary expression "length(str)"
 */
function make_length_expr(str: any): any {
    return ["length", str]
}

/**
 * Check if a numeric expression is a length expression.
 * @param expr the expression
 * @returns true iff expr is a length expression
 */
function is_length_expr(num: NumExpr): num is LengthExpr {
    return num[0] === "length";
}

/**
 * Get the argument of a length expression.
 * @param expr an expression
 * @returns the argument of expr
 */
function get_sarg(expr: any): any {
    return expr[1];
}

/**
 * Makes a new stringify expression.
 * @param expr the argument of the stringify operator
 * @returns the unary expression "stringify(expr)"
 */
function make_stringify_expr(expr : any): any {
    return ["stringify", expr];
}

/**
 * Check if a string expression is a stringify expression.
 * @param expr the expression
 * @returns true iff expr is a stringify expression
 */
function is_stringify_expr(str: StringExpr): str is StringifyExpr {
    return str[0] === "stringify";
}

/**
 * Get the argument of a stringify expression.
 * @param expr an expression
 * @returns the argument of expr
 */
function get_narg(expr: any): any {
    return expr[1];
}

/**
 * Make a new binary string concatenation expression.
 * @param str1 the prefix of the concatenated string
 * @param str2 the suffix of the concatenated string
 * @returns the concatenated string str1 + str2
 */
function make_concat_expr(str1: any, str2: any): any {
    return ["concat", str1, str2];
}

/**
 * Check if a string expression is a concatenation expression
 * @param expr the expression
 * @returns true iff expr is a concatenation expression
 */
function is_concat_expr(str: StringExpr): str is ConcatExpr {
    return str[0] === "concat";
}

/**
 * Get the prefix of a string concatenation.
 * @param expr an expression
 * @returns the prefix of expr
 */
function get_slhs(str: any): any {
    return str[1];
}

/**
 * Get the suffix of a string concatenation.
 * @param expr an expression
 * @returns the suffix of expr
 */
function get_srhs(str: any): any {
    return str[2];
}

/**
 * Makes a new literal value.
 * @template T the type of the value (number of string)
 * @param val value of the literal
 * @returns a literal with value val
 */
function make_literal<T>(val: T): any {
    return ["literal", val];
}

/**
 * Check if a string expression is a string literal.
 * @param expr the expression
 * @returns true iff expr is a string literal
 */
function is_sliteral(str: StringExpr): str is Literal<string> {
    return str[0] === "literal";
}

/**
 * Check if a numeric expression is a numeric literal.
 * @param expr the expression
 * @returns true iff expr is a numeric literal
 */
function is_nliteral(str: NumExpr): str is Literal<number> {
    return str[0] === "literal";
}

/**
 * Get the value of a literal expression.
 * @template T the type of the value (number or string)
 * @param expr the literal expression
 * @returns the value of expr
 */
function get_value<T>(expr: any): T {
    return expr[1];
}

/**
 * Evaluate a numeric expression.
 * @param expr the expression
 * @returns the result of evaluating expr.
 */
function evaluate_number(expr: NumExpr): Literal<number> {
    function evaluate_binary(bin_expr: any): any {
        // your code here
    }
    function evaluate_length(expr: any): any {
        // your code here
    }
    return is_nbinary(expr)
        ? evaluate_binary(expr)
        : is_length_expr(expr)
        ? evaluate_length(expr)
        : expr;
}

/**
 * Evaluate a string expression.
 * @param expr the expression
 * @returns the result of evaluating expr.
 */
function evaluate_string(expr: StringExpr): Literal<string> {
    function evaluate_concat(concat_expr: any): any {
        // your code here
    }
    function evaluate_stringify(expr: any): any {
        // your code here
    }
    return is_concat_expr(expr)
        ? evaluate_concat(expr)
        : is_stringify_expr(expr)
        ? evaluate_stringify(expr)
        : expr;
}


/*
    Some basic test code
*/

const expr1 = make_nsub(make_nadd(make_literal(5),
                                make_nsub(make_literal(6), make_literal(8))),
                       make_nadd(make_literal(5),
                                make_nadd(make_literal(6), make_literal(8))));
console.log("result should be -16: " + evaluate_number(expr1));

const expr2 = make_nadd(make_length_expr(make_literal("hello")),
                       make_nadd(make_nsub(make_literal(6),
                                         make_nsub(make_literal(8), make_literal(5))),
                                make_nadd(make_literal(6), make_literal(8))));
console.log("result should be 22: " + evaluate_number(expr2));

const zero = make_stringify_expr(make_literal(0));
const expr3 = make_concat_expr(make_literal("hello"),
                               make_concat_expr(zero,
                                                make_literal("world")));
console.log("result should be hello0world: " + evaluate_string(expr3));

// not possible
//console.log(make_nadd(make_literal(1), make_literal("hello")));