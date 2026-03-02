// script.js (Full Replacement Version)

// ---------- DOM Elements ----------
const inputProblem = document.getElementById("inputProblem");
const solveProblemBtn = document.getElementById("solveProblemBtn");
const resultDiv = document.getElementById("result");
const stepsDiv = document.getElementById("steps");

const amountInput = document.getElementById("amountInput");
const percentInput = document.getElementById("percentInput");
const solvePercentBtn = document.getElementById("solvePercentBtn");
const outputPercent = document.getElementById("outputPercent");

const cameraBtn = document.getElementById("cameraBtn");
const cameraPreview = document.getElementById("cameraPreview");

const lastTopicsButtons = document.getElementById("lastTopicsButtons");
const historyDiv = document.getElementById("historyDiv");

let history = [];

// ---------- Aptitude Functions ----------
const perc = {
    increaseByPercentage: (amount, percent) => amount + (amount*percent/100),
    decreaseByPercentage: (amount, percent) => amount - (amount*percent/100)
};

const hcf = {
    gcd: (a,b)=>!b?a:hcf.gcd(b,a%b),
    lcm: (a,b)=> (a*b)/hcf.gcd(a,b)
};

const profitLoss = {
    profit: (cp, sp) => sp-cp,
    loss: (cp, sp) => cp-sp,
    profitPercent: (cp, sp) => ((sp-cp)/cp)*100,
    lossPercent: (cp, sp) => ((cp-sp)/cp)*100
};

// ---------- 12th Maths Functions ----------
const algebra = {
    solveQuadratic: (a,b,c)=>{
        let D = b*b - 4*a*c;
        if(D<0) return "No real roots";
        let r1 = (-b + Math.sqrt(D))/(2*a);
        let r2 = (-b - Math.sqrt(D))/(2*a);
        return [r1,r2];
    }
};

const calculus = {
    derivative: (coef,power)=> power===0?0: coef*power+"x^"+(power-1),
    integrate: (coef,power)=> (coef/(power+1))+"x^"+(power+1)
};

// ---------- OCR Function ----------
async function recognizeFromCanvas(canvas){
    try{
        const { data:{ text } } = await Tesseract.recognize(canvas,'eng',{logger:m=>console.log(m)});
        return text;
    } catch(err){ console.error(err); return ""; }
}

// ---------- Main Problem Solve ----------
solveProblemBtn.addEventListener("click", ()=>{
    const problem = inputProblem.value.trim();
    if(!problem){ alert("Enter a problem"); return; }

    let solution="", stepByStep="";

    try {
        // ✅ Arithmetic expression support
        if(/^[0-9+\-*/().\s]+$/.test(problem)){
            solution = eval(problem);
            stepByStep = `Simple arithmetic calculation: ${problem}`;
        } 
        else if(problem.toLowerCase().includes("quadratic")){
            solution = algebra.solveQuadratic(1,-3,2);
            stepByStep = "Step 1: Identify a,b,c → Step 2: Compute discriminant → Step 3: Solve roots";
        } 
        else if(problem.toLowerCase().includes("derivative")){
            solution = calculus.derivative(5,3);
            stepByStep = "Step 1: Apply power rule → Step 2: Multiply coefficient";
        } 
        else if(problem.toLowerCase().includes("percentage")){
            solution = "Use Percentage Calculator below.";
            stepByStep = "Enter amount and percent to calculate increase/decrease.";
        } 
        else { 
            solution="Problem type not recognized."; 
            stepByStep="Use keywords like 'quadratic','derivative','percentage' or type arithmetic expression (e.g., 9+9)";
        }
    } catch(e){
        solution="Error evaluating problem.";
        stepByStep="";
    }

    resultDiv.innerHTML = `<b>Result:</b> ${solution}`;
    stepsDiv.innerHTML = `<b>Step-by-step:</b> ${stepByStep}`;

    history.push(problem);
    updateHistory();
});

// ---------- Percentage Calculator ----------
solvePercentBtn.addEventListener("click", ()=>{
    const amount = parseFloat(amountInput.value);
    const percent = parseFloat(percentInput.value);
    if(isNaN(amount)||isNaN(percent)){ alert("Enter valid numbers"); return; }
    const increased = perc.increaseByPercentage(amount, percent);
    const decreased = perc.decreaseByPercentage(amount, percent);
    outputPercent.innerHTML = `<p>Increase ${amount} by ${percent}%: ${increased}</p>
                               <p>Decrease ${amount} by ${percent}%: ${decreased}</p>`;
});
function solveTrainProblem(problem){
    problem = problem.toLowerCase();

    // Match train length
    const lengthMatch = problem.match(/(\d+(\.\d+)?)\s*m/);
    const trainLength = lengthMatch ? parseFloat(lengthMatch[1]) : 0;

    // Match man speed
    const speedMatch = problem.match(/running at (\d+(\.\d+)?)\s*km\/hr/);
    const manSpeed = speedMatch ? parseFloat(speedMatch[1])*1000/3600 : 0;

    // Match time
    const timeMatch = problem.match(/in (\d+(\.\d+)?)\s*seconds?/);
    const t = timeMatch ? parseFloat(timeMatch[1]) : 0;

    if(trainLength && t){
        const trainSpeed = trainLength/t + manSpeed; // in m/s
        const trainSpeedKmHr = (trainSpeed*3600/1000).toFixed(2);
        return `Train speed = ${trainSpeedKmHr} km/hr`;
    } else {
        return "Cannot recognize problem";
    }
}

// Example:
let problem = "train 125 m long passes a man, running at 5 km/hr in the same direction in which the train is going, in 10 seconds.";
console.log(solveTrainProblem(problem)); // ✅ Train speed = 50 km/hr

// ---------- Camera OCR ----------
cameraBtn.addEventListener("click", async ()=>{
    cameraPreview.style.display="block";
    const stream = await navigator.mediaDevices.getUserMedia({video:true});
    cameraPreview.srcObject = stream;

    setTimeout(async ()=>{
        const canvas=document.createElement("canvas");
        canvas.width=cameraPreview.videoWidth;
        canvas.height=cameraPreview.videoHeight;
        canvas.getContext("2d").drawImage(cameraPreview,0,0,canvas.width,canvas.height);

        const text = await recognizeFromCanvas(canvas);
        inputProblem.value = text;

        stream.getTracks().forEach(track=>track.stop());
        cameraPreview.style.display="none";
    },3000);
});
/* Voice Input */
const voiceBtn = document.createElement("button");
voiceBtn.textContent = "🎤 Speak Problem";
voiceBtn.style.margin="5px";
document.getElementById("appContainer").insertBefore(voiceBtn, document.getElementById("cameraBtn"));

let recognition;
if('webkitSpeechRecognition' in window){
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    voiceBtn.addEventListener("click", ()=>{
        recognition.start();
    });

    recognition.onresult = function(event){
        const transcript = event.results[0][0].transcript;
        inputProblem.value = transcript;
    }

    recognition.onerror = function(event){
        console.error("Speech recognition error", event.error);
    }
} else {
    voiceBtn.disabled = true;
    voiceBtn.textContent = "🎤 Voice Not Supported";
}
// ---------- Speak Result Function ----------
function speakResult(text){
    if('speechSynthesis' in window){
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'en-US';
        window.speechSynthesis.speak(utter);
    } else {
        console.log("Speech Synthesis not supported in this browser");
    }
}

// ---------- Modify Solve Problem Button ----------
solveProblemBtn.addEventListener("click", ()=>{
    const problem = inputProblem.value.trim();
    if(!problem){ alert("Enter a problem"); return; }

    let solution="", stepByStep="";

    try {
        if(/^[0-9+\-*/().\s]+$/.test(problem)){
            solution = eval(problem);
            stepByStep = `Simple arithmetic calculation: ${problem}`;
        } 
        else if(problem.toLowerCase().includes("quadratic")){
            solution = algebra.solveQuadratic(1,-3,2);
            stepByStep = "Step 1: Identify a,b,c → Step 2: Compute discriminant → Step 3: Solve roots";
        } 
        else if(problem.toLowerCase().includes("derivative")){
            solution = calculus.derivative(5,3);
            stepByStep = "Step 1: Apply power rule → Step 2: Multiply coefficient";
        } 
        else if(problem.toLowerCase().includes("percentage")){
            solution = "Use Percentage Calculator below.";
            stepByStep = "Enter amount and percent to calculate increase/decrease.";
        } 
        else { 
            solution="Problem type not recognized."; 
            stepByStep="Use keywords like 'quadratic','derivative','percentage' or type arithmetic expression (e.g., 9+9)";
        }
    } catch(e){
        solution="Error evaluating problem.";
        stepByStep="";
    }

    resultDiv.innerHTML = `<b>Result:</b> ${solution}`;
    stepsDiv.innerHTML = `<b>Step-by-step:</b> ${stepByStep}`;

    // ✅ Speak Result
    speakResult(solution.toString());

    history.push(problem);
    updateHistory();
});

// ---------- History / Quick Recall ----------
function updateHistory(){
    historyDiv.innerHTML="";
    lastTopicsButtons.innerHTML="";

    history.slice(-5).forEach(item=>{
        const btn=document.createElement("button");
        btn.textContent=item;
        btn.addEventListener("click",()=>{ inputProblem.value=item; });
        lastTopicsButtons.appendChild(btn);
    });

    history.forEach(item=>{
        const p=document.createElement("p");
        p.textContent=item;
        historyDiv.appendChild(p);
    });
}
// Voice output
function speakResult(text){
    if('speechSynthesis' in window){
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'en-US';
        window.speechSynthesis.speak(utter);
    }
}

// Solve button
solveProblemBtn.addEventListener("click", ()=>{
    const problem = inputProblem.value.trim();
    if(!problem){ 
        alert("Enter a problem"); 
        return; 
    }

    let solution = "";
    let steps = [];

    // 1️⃣ Simple arithmetic
    if(/^[0-9+\-*/().\s]+$/.test(problem)){
        const numbers = problem.split(/([+\-*/])/); // split numbers & operators
        let temp = parseFloat(numbers[0]);
        steps.push(`Start with ${temp}`);

        for(let i=1; i<numbers.length; i+=2){
            const op = numbers[i];
            const num = parseFloat(numbers[i+1]);
            steps.push(`Operation: ${temp} ${op} ${num}`);

            if(op === '+') temp += num;
            if(op === '-') temp -= num;
            if(op === '*') temp *= num;
            if(op === '/') temp /= num;
        }
        solution = temp;
    } 
    // 2️⃣ Quadratic example (placeholder)
    else if(problem.toLowerCase().includes("quadratic")){
        steps.push("Solving quadratic: ax^2 + bx + c = 0");
        solution = algebra.solveQuadratic(1,-3,2); // example function
        steps.push(`Solution: ${solution.join(", ")}`);
    } 
    else {
        solution = "Problem type not recognized.";
        steps.push(solution);
    }

    // Display result
    resultDiv.innerHTML = solution;

    // Display step-by-step
    stepsDiv.innerHTML = steps.map((s,i)=>`Step ${i+1}: ${s}`).join("<br>");

    // Voice output
    speakResult(solution.toString());
});
