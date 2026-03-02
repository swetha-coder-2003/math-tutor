// ----------------- 12th Maths Solver -----------------
const Math12th = {

    // 1️⃣ Algebra - Quadratic Equations
    algebra: function(input){
        let steps = [];
        try{
            let match = input.match(/([+-]?\d*)x\^2([+-]\d*)x([+-]?\d+)/);
            if(!match) return ["Invalid quadratic input"];
            let a = Number(match[1]||1), b = Number(match[2]), c = Number(match[3]);
            let D = b*b - 4*a*c;
            let r1 = (-b + Math.sqrt(D))/(2*a);
            let r2 = (-b - Math.sqrt(D))/(2*a);
            steps.push(`Equation: ${a}x^2 + ${b}x + ${c} = 0`);
            steps.push(`Discriminant D = ${D}`);
            steps.push(`Roots: x1 = ${r1}, x2 = ${r2}`);
            return steps;
        }catch(e){ return ["Error solving quadratic equation"]; }
    },

    // 2️⃣ Calculus - Derivative
    differentiation: function(input){
        let steps = [];
        try{
            let match = input.match(/(\d*)x\^(\d+)/);
            if(!match) return ["Invalid derivative input"];
            let coeff = Number(match[1]||1), power = Number(match[2]);
            let newCoeff = coeff*power, newPower = power-1;
            steps.push(`Function: ${coeff}x^${power}`);
            steps.push(`Derivative: ${newCoeff}x^${newPower}`);
            return steps;
        }catch(e){ return ["Error in differentiation"]; }
    },

    // 3️⃣ Integration - Indefinite
    integration: function(input){
        let steps = [];
        try{
            let match = input.match(/(\d*)x\^(\d+)/);
            if(!match) return ["Invalid integration input"];
            let coeff = Number(match[1]||1), power = Number(match[2]);
            let newPower = power + 1;
            let newCoeff = coeff / newPower;
            steps.push(`Function: ${coeff}x^${power}`);
            steps.push(`Indefinite Integral: ${newCoeff}x^${newPower} + C`);
            return steps;
        }catch(e){ return ["Error in integration"]; }
    },

    // 4️⃣ Vectors - Dot Product
    vectorsDot: function(input){
        let steps = [];
        try{
            let nums = input.match(/-?\d+/g).map(Number);
            if(nums.length<6) return ["Enter two 3D vectors"];
            let [a1,a2,a3,b1,b2,b3] = nums;
            let dot = a1*b1 + a2*b2 + a3*b3;
            steps.push(`Vectors: A(${a1},${a2},${a3}), B(${b1},${b2},${b3})`);
            steps.push(`Dot Product = ${dot}`);
            return steps;
        }catch(e){ return ["Error in vector dot product"]; }
    },

    // 5️⃣ Vectors - Cross Product
    vectorsCross: function(input){
        let steps = [];
        try{
            let nums = input.match(/-?\d+/g).map(Number);
            if(nums.length<6) return ["Enter two 3D vectors"];
            let [a1,a2,a3,b1,b2,b3] = nums;
            let cx = a2*b3 - a3*b2;
            let cy = a3*b1 - a1*b3;
            let cz = a1*b2 - a2*b1;
            steps.push(`Vectors: A(${a1},${a2},${a3}), B(${b1},${b2},${b3})`);
            steps.push(`Cross Product = (${cx}, ${cy}, ${cz})`);
            return steps;
        }catch(e){ return ["Error in vector cross product"]; }
    },

    // 6️⃣ Geometry - Area of Circle
    geometryCircle: function(input){
        let steps = [];
        try{
            let r = Number(input);
            let area = Math.PI*r*r;
            steps.push(`Radius = ${r}`);
            steps.push(`Area = πr² = ${area.toFixed(2)}`);
            return steps;
        }catch(e){ return ["Error in circle geometry"]; }
    },

    // 7️⃣ Probability - Simple
    probability: function(input){
        let steps = [];
        try{
            let nums = input.match(/\d+/g).map(Number);
            if(nums.length<2) return ["Enter favourable & total outcomes"];
            let P = nums[0]/nums[1];
            steps.push(`Favourable = ${nums[0]}, Total = ${nums[1]}`);
            steps.push(`Probability = ${P}`);
            return steps;
        }catch(e){ return ["Error in probability calculation"]; }
    },

    // 8️⃣ Sequence - AP / GP
    sequence: function(input){
        let steps = [];
        try{
            let match = input.match(/AP: (\d+), d=(\d+), n=(\d+)/);
            if(match){
                let a = Number(match[1]), d = Number(match[2]), n = Number(match[3]);
                let nth = a + (n-1)*d;
                let sum = (n/2)*(2*a + (n-1)*d);
                steps.push(`AP: a=${a}, d=${d}, n=${n}`);
                steps.push(`nth term = ${nth}`);
                steps.push(`Sum of n terms = ${sum}`);
            } else {
                steps.push("Provide AP as: 'AP: a=2, d=3, n=5'");
            }
            return steps;
        }catch(e){ return ["Error in AP/GP calculation"]; }
    },

    // 9️⃣ Linear Programming (Basic)
    linearProgramming: function(input){
        let steps = [];
        steps.push("Linear Programming solver under development. Enter constraints & objective function.");
        return steps;
    },

    // 10️⃣ Differential Equations
    differentialEquations: function(input){
        let steps = [];
        steps.push("Differential Equation solver under development. Enter in dy/dx format.");
        return steps;
    },

    // 11️⃣ Trigonometry (Basic)
    trigonometry: function(input){
        let steps = [];
        try{
            // simple sin/cos/tan evaluation
            input = input.replace(/sin/g,'Math.sin').replace(/cos/g,'Math.cos').replace(/tan/g,'Math.tan');
            let val = eval(input);
            steps.push(`Expression: ${input}`);
            steps.push(`Value = ${val}`);
            return steps;
        }catch(e){ return ["Error in trigonometry"]; }
    },

    // 12️⃣ Relations & Functions
    relationsFunctions: function(input){
        let steps = [];
        steps.push("Relations & Functions solver under development. Enter specific function.");
        return steps;
    }

};