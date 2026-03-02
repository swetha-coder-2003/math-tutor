// ----------------- Math Aptitude Solver -----------------
const MathAptitude = {

    // 1️⃣ HCF & LCM
    hcfLcm: function(input){
        let steps = [];
        try{
            let nums = input.match(/\d+/g).map(Number);
            if(nums.length<2) return ["Enter at least 2 numbers"];

            const hcf = (a,b)=> b===0?a:hcf(b,a%b);
            const lcm = (a,b)=> a*b/hcf(a,b);

            let h = nums.reduce(hcf);
            let l = nums.reduce(lcm);

            steps.push(`Numbers: ${nums.join(", ")}`);
            steps.push(`HCF: ${h}`);
            steps.push(`LCM: ${l}`);
            return steps;
        }catch(e){ return ["Invalid input for HCF/LCM"]; }
    },

    // 2️⃣ Percentages
    percentages: function(input){
        let steps = [];
        try{
            let nums = input.match(/\d+(\.\d+)?/g).map(Number);
            if(nums.length>=2){
                let result = (nums[0]*nums[1])/100;
                steps.push(`${nums[1]}% of ${nums[0]} = ${result}`);
            }
            return steps;
        }catch(e){ return ["Invalid input for Percentages"]; }
    },

    // 3️⃣ Profit & Loss
    profitLoss: function(input){
        let steps = [];
        try{
            let nums = input.match(/\d+(\.\d+)?/g).map(Number);
            if(nums.length>=2){
                let SP = nums[0], CP = nums[1];
                let profit = SP-CP;
                let loss = CP-SP;
                if(profit>=0){
                    steps.push(`Cost Price = ${CP}, Selling Price = ${SP}`);
                    steps.push(`Profit = ${profit}`);
                    steps.push(`Profit % = ${(profit/CP*100).toFixed(2)}%`);
                } else {
                    loss = Math.abs(loss);
                    steps.push(`Cost Price = ${CP}, Selling Price = ${SP}`);
                    steps.push(`Loss = ${loss}`);
                    steps.push(`Loss % = ${(loss/CP*100).toFixed(2)}%`);
                }
            }
            return steps;
        }catch(e){ return ["Invalid input for Profit/Loss"]; }
    },

    // 4️⃣ Time, Speed, Distance
    timeSpeedDistance: function(input){
        let steps = [];
        try{
            let nums = input.match(/\d+(\.\d+)?/g).map(Number);
            if(nums.length>=2){
                let distance = nums[0], time = nums[1];
                let speed = distance/time;
                steps.push(`Distance = ${distance}, Time = ${time}`);
                steps.push(`Speed = Distance / Time = ${speed}`);
            }
            return steps;
        }catch(e){ return ["Invalid input for Time, Speed, Distance"]; }
    },

    // 5️⃣ Time & Work
    timeWork: function(input){
        let steps = [];
        try{
            let nums = input.match(/\d+/g).map(Number); 
            if(nums.length<2) return ["Enter at least 2 values"];
            let work = nums[0], days = nums[1];
            let rate = work/days;
            steps.push(`Work = ${work}, Days = ${days}`);
            steps.push(`One day work = ${rate}`);
            return steps;
        }catch(e){ return ["Invalid input for Time & Work"]; }
    },

    // 6️⃣ Simple & Compound Interest
    interest: function(input){
        let steps = [];
        try{
            let nums = input.match(/\d+(\.\d+)?/g).map(Number);
            if(nums.length<3) return ["Enter Principal, Rate, Time"];
            let P = nums[0], R = nums[1], T = nums[2];
            let SI = (P*R*T)/100;
            let CI = P*(Math.pow((1+R/100),T)-1);
            steps.push(`Principal = ${P}, Rate = ${R}%, Time = ${T}`);
            steps.push(`Simple Interest = ${SI.toFixed(2)}`);
            steps.push(`Compound Interest = ${CI.toFixed(2)}`);
            return steps;
        }catch(e){ return ["Invalid input for Interest"]; }
    },

    // 7️⃣ Ratio, Proportion & Averages
    ratioProportion: function(input){
        let steps = [];
        try{
            let nums = input.match(/\d+(\.\d+)?/g).map(Number);
            if(nums.length<2) return ["Enter 2 numbers for ratio"];
            let gcd = (a,b)=>b===0?a:gcd(b,a%b);
            let r = nums[0]/nums[1];
            steps.push(`Numbers: ${nums[0]} and ${nums[1]}`);
            steps.push(`Ratio = ${nums[0]}/${nums[1]} = ${r}`);
            return steps;
        }catch(e){ return ["Invalid input for Ratio/Proportion"]; }
    },

    averages: function(input){
        let steps = [];
        try{
            let nums = input.match(/\d+(\.\d+)?/g).map(Number);
            let sum = nums.reduce((a,b)=>a+b,0);
            let avg = sum/nums.length;
            steps.push(`Numbers: ${nums.join(", ")}`);
            steps.push(`Average = ${avg}`);
            return steps;
        }catch(e){ return ["Invalid input for Average"]; }
    },

    // 8️⃣ Misc (Calendar, Clocks, Boat & Stream)
    misc: function(input){
        let steps = [];
        steps.push("Miscellaneous topic solver under development. Enter specific formula.");
        return steps;
    }
};