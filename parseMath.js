// ----------------- Math Input Parser -----------------

/**
 * parseMath.js
 * Converts user-friendly math input to JS-evaluable expressions
 * Supports:
 * - Fractions (a/b)
 * - Powers (x^y)
 * - Square root (√)
 * - Pi (π)
 * - Basic arithmetic
 */

function parseMathInput(str){
    try{
        // Replace fractions like 3/4 with (3/4)
        str = str.replace(/(\d+)\/(\d+)/g, "($1/$2)");

        // Replace powers like x^3 with Math.pow(x,3)
        str = str.replace(/(\d+|\b\w+\b)\^(\d+)/g, "Math.pow($1,$2)");

        // Replace √ with Math.sqrt
        str = str.replace(/√(\d+|\w+)/g, "Math.sqrt($1)");

        // Replace π with Math.PI
        str = str.replace(/π/g, "Math.PI");

        // Replace × and ÷ with * and /
        str = str.replace(/×/g, "*").replace(/÷/g, "/");

        return str;
    } catch(e){
        console.error("Error parsing math input:", e);
        return str; // fallback
    }
}

// Example usage:
// let expr = parseMathInput("√16 + 3^2 + π");
// eval(expr) => 4 + 9 + 3.14159...