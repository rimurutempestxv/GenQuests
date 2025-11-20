// --- MATRIX FX (RESTORED) ---
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.onresize = resize; resize();

const chars = 'GENSYN01';
const drops = Array(Math.floor(canvas.width/20)).fill(1);

function draw() {
    ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff9d'; 
    ctx.font = '14px monospace';
    
    drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i*20, y*20);
        if(y*20 > canvas.height && Math.random() > 0.98) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(draw, 50);
setInterval(() => document.getElementById('sys-time').innerText = new Date().toLocaleTimeString(), 1000);

// --- MASSIVE DATASET (25+ Questions) ---
const allQuestions = [
    // REAL WORLD
    { cat: "Real World // Economics", q: "Why would a developer choose Gensyn over AWS/Google Cloud?", opts: ["Gensyn has cooler branding", "Market-based pricing on idle hardware is significantly cheaper (up to 80%)", "AWS is banning AI models", "Gensyn runs on quantum computers"], ans: 1 },
    { cat: "Real World // Hardware", q: "What vast, untapped resource does Gensyn primarily aim to unlock?", opts: ["Supercomputers at NASA", "Idle consumer GPUs (gamers) and underutilized data center racks", "Smartphones only", "Bitcoin mining ASICs"], ans: 1 },
    { cat: "CodeAssist // Privacy", q: "CodeAssist runs a model locally on your machine. What is the main real-world benefit?", opts: ["It mines crypto while you code", "Your private code never leaves your machine (Zero Data Leakage)", "It requires no RAM", "It automatically fixes all bugs"], ans: 1 },
    { cat: "Real World // Latency", q: "Is Gensyn appropriate for real-time, millisecond inference (hosting a chatbot)?", opts: ["Yes, it is faster than light", "No, Gensyn is currently optimized for training and fine-tuning, not low-latency inference", "Yes, but only on Tuesdays", "No, it only supports images"], ans: 1 },

    // TECH: VERDE & SECURITY
    { cat: "Tech // Verde", q: "How does Gensyn verify work without re-running the whole job (which would double the cost)?", opts: ["It trusts the most expensive node", "Probabilistic Proof-of-Learning & Optimistic Verification", "The CEO checks it manually", "Using Zero-Knowledge Proofs for everything (too slow)"], ans: 1 },
    { cat: "Tech // Pinpoint", q: "If a 'Whistleblower' challenges a 'Solver', what protocol finds the exact error?", opts: ["The Pinpoint Protocol (Binary search on execution trace)", "The Consensus Protocol", "The Gossip Protocol", "The IPFS Protocol"], ans: 0 },
    { cat: "Tech // Whistleblower", q: "What is the incentive for a 'Whistleblower' node to check work?", opts: ["They do it for charity", "They stake tokens to earn a 'Jackpot' reward if they find an error", "They get paid a salary", "They earn Bitcoin"], ans: 1 },
    { cat: "Security // Slashing", q: "What happens to a Solver who is caught submitting fake results?", opts: ["They get a warning email", "They are 'slashed' (their staked tokens are burned/seized)", "They are banned from Discord", "Nothing happens"], ans: 1 },
    { cat: "Security // Lazy Solver", q: "What is the 'Lazy Solver' problem?", opts: ["A node that goes offline", "A node that tries to skip computation and guess the result to save energy", "A node with slow internet", "A node that refuses to update"], ans: 1 },

    // TECH: RL SWARM & SAPO
    { cat: "Tech // RL Swarm", q: "In the 'RL Swarm', training happens across many devices. What networking issue does 'NoLoCo' solve?", opts: ["Internet censorship", "The high latency of global synchronization (All-Reduce)", "Lost passwords", "GPU overheating"], ans: 1 },
    { cat: "Tech // Sapo", q: "Gensyn's SAPO protocol optimizes bandwidth by sharing what data instead of gradients?", opts: ["Rollouts (Experience/Trajectory data)", "Raw Model Weights", "Private Keys", "Video streams"], ans: 0 },
    { cat: "Tech // Heterogeneity", q: "What does 'Heterogeneous Compute' mean in the context of Gensyn?", opts: ["All computers must be identical", "The network can utilize different types of GPUs/Devices (Nvidia, AMD, Apple) simultaneously", "Only Linux is supported", "Training happens on one machine"], ans: 1 },

    // DEEP TECH & ARCHITECTURE
    { cat: "Deep Tech // RepOps", q: "Why did Gensyn need to build 'RepOps' (Reproducible Operations)?", opts: ["To make floating point math deterministic across different GPUs (Nvidia/AMD)", "To make Python faster", "To encrypt data", "To compress models"], ans: 0 },
    { cat: "Application // BlockAssist", q: "BlockAssist demonstrated an AI agent learning to play which game via the protocol?", opts: ["Fortnite", "Minecraft", "Chess", "Doom"], ans: 1 },
    { cat: "Architecture // Roles", q: "Which of these is NOT a core role in the Gensyn Protocol?", opts: ["Submitter", "Solver", "Verifier", "Miner"], ans: 3 },
    { cat: "Architecture // Layer 1", q: "Is Gensyn an ERC-20 token on Ethereum?", opts: ["Yes, it runs on Uniswap", "No, it is a sovereign Layer-1 blockchain based on Substrate (Polkadot SDK)", "It is a Bitcoin sidechain", "It is a Solana dApp"], ans: 1 },
    { cat: "Economics // Market", q: "Who determines the price of compute power on the network?", opts: ["Gensyn Corporation", "A dynamic auction/market mechanism based on supply and demand", "The US Government", "The Ethereum Foundation"], ans: 1 },
    { cat: "Philosophy", q: "What is the ultimate goal of the Gensyn Protocol?", opts: ["To pump a token", "To build the world's largest decentralized supercomputer for ML", "To destroy cloud computing", "To make video games faster"], ans: 1 },
    { cat: "Research // Parallelism", q: "To train large models across distributed devices, what technique replaces simple data parallelism?", opts: ["Model Parallelism & Pipelining", "Bluetooth Tethering", "Zip Compression", "USB Sticks"], ans: 0 },
    { cat: "Tech // Verification Cost", q: "What is the 'Verifier's Dilemma'?", opts: ["Verifiers can't find the download button", "Verification costs resources, so rational verifiers might skip checks unless incentivized properly", "Verifiers run out of hard drive space", "Verifiers prefer Proof of Work"], ans: 1 },
    { cat: "Protocol // Trust", q: "Gensyn is a 'Trustless' protocol. What does this mean?", opts: ["You cannot trust anyone", "You don't need to know or trust the person providing the GPU; the code/math guarantees the result", "There is no security", "It only works between friends"], ans: 1 },
    { cat: "Tech // Data", q: "How is training data handled in a decentralized learning job?", opts: ["It is emailed to the solver", "It is typically streamed from decentralized storage (like IPFS/Arweave) or sharded securely", "It is ignored", "It is printed on paper"], ans: 1 },
    { cat: "Tech // Consensus", q: "Gensyn uses Substrate. What consensus mechanism does the chain itself use for block production?", opts: ["Proof of Work (like Bitcoin)", "NPoS (Nominated Proof of Stake)", "Proof of History", "Proof of Burn"], ans: 1 },
    { cat: "Application // LLMs", q: "Why are LLMs (Large Language Models) specifically hard to train on decentralized networks?", opts: ["They are too smart", "They require massive bandwidth for communication between GPU clusters (Inter-connect bottleneck)", "Text files are too big", "They speak different languages"], ans: 1 }
];

// --- GAME STATE LOGIC ---
// Select 12 random questions for this session
const sessionQuestions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 12);

let user = "Anon";
let qIdx = 0;
let score = 0;
let timer;
const TIME_SEC = 15;

function authenticate() {
    const input = document.getElementById('username');
    if(!input.value.trim()) return;
    user = input.value;
    document.getElementById('display-name').innerText = user.toUpperCase();
    
    document.getElementById('view-login').classList.add('hidden');
    document.getElementById('view-intro').classList.remove('hidden');
}

function startQuiz() {
    document.getElementById('view-intro').classList.add('hidden');
    document.getElementById('view-quiz').classList.remove('hidden');
    loadQ();
}

function loadQ() {
    if(qIdx >= sessionQuestions.length) return finish();

    const data = sessionQuestions[qIdx];
    document.getElementById('q-cat').innerText = data.cat;
    document.getElementById('q-text').innerText = data.q;
    
    const cont = document.getElementById('options-container');
    cont.innerHTML = '';

    data.opts.forEach((opt, i) => {
        const div = document.createElement('div');
        div.className = 'opt-card';
        div.innerHTML = `<strong>[${i}]</strong> ${opt}`;
        div.onclick = () => answer(i, div);
        cont.appendChild(div);
    });

    runTimer();
}

function runTimer() {
    const bar = document.getElementById('timer-bar');
    bar.style.width = '0%';
    bar.style.background = '#00ff9d';
    let w = 0;
    
    clearInterval(timer);
    timer = setInterval(() => {
        w += 100 / (TIME_SEC * 10);
        bar.style.width = w + '%';
        if(w > 70) bar.style.background = '#ff3355';
        if(w >= 100) {
            clearInterval(timer);
            answer(-1, null);
        }
    }, 100);
}

function answer(choice, el) {
    clearInterval(timer);
    const correct = sessionQuestions[qIdx].ans;
    const cards = document.querySelectorAll('.opt-card');
    
    cards.forEach(c => c.style.pointerEvents = 'none');

    if(choice === correct) {
        if(el) el.classList.add('correct');
        score++;
    } else {
        if(el) el.classList.add('wrong');
        cards[correct].classList.add('correct');
    }

    setTimeout(() => {
        qIdx++;
        loadQ();
    }, 1200);
}

function finish() {
    document.getElementById('view-quiz').classList.add('hidden');
    document.getElementById('view-results').classList.remove('hidden');
    document.getElementById('score-display').innerText = `${score} / ${sessionQuestions.length}`;

    const msg = document.getElementById('roast-msg');
    const pct = score / sessionQuestions.length;

    if(pct === 1) {
        msg.innerText = `> "Incredible, ${user}. You didn't just pass verification, you rewrote the protocol. You are the H100 now."`;
    } else if(pct >= 0.8) {
        msg.innerText = `> "Solid metrics, ${user}. You're ready for mainnet. Just watch out for floating point errors."`;
    } else if(pct >= 0.5) {
        msg.innerText = `> "${user}, you're like a pre-trained model with no fine-tuning. You get the gist, but the loss function is still high."`;
    } else if(pct >= 0.2) {
        msg.innerText = `> "Yikes, ${user}. You're hallucinating more than a chatbot from 2018. Go read the docs before you burn any compute credits."`;
    } else {
        msg.innerText = `> "Total system failure. ${user}, are you running your neural net on a smart fridge? Please disconnect."`;
    }
}

// Enter key support
document.getElementById('username').addEventListener('keypress', (e) => {
    if(e.key === 'Enter') authenticate();
});

