const API_URL = "http://localhost:3000";

// Append log to System Logs
function addLog(message) {
    const logBox = document.getElementById("logBox");
    const time = new Date().toLocaleTimeString();
    logBox.innerHTML += `[${time}] ${message}<br>`;
    logBox.scrollTop = logBox.scrollHeight;
}

// Register Land
function registerLand() {
    const id = document.getElementById("c_id").value;
    const loc = document.getElementById("c_loc").value;
    const owner = document.getElementById("c_owner").value;
    const area = document.getElementById("c_area").value;

    if (!id || !loc || !owner || !area) {
        addLog("❌ Registration failed: Missing fields.");
        return;
    }

    addLog(`✅ Land Plot ${id} successfully registered to ${owner}.`);
}

// Transfer Ownership
function transferTitle() {
    const id = document.getElementById("t_id").value;
    const owner = document.getElementById("t_owner").value;

    if (!id || !owner) {
        addLog("❌ Transfer failed: Missing fields.");
        return;
    }

    addLog(`🔄 Ownership of Plot ${id} transferred to ${owner}.`);
}

// Query Land
function queryLand() {
    const id = document.getElementById("q_id").value;
    const resultBox = document.getElementById("result");

    if (!id) {
        resultBox.textContent = "Please enter a Plot ID.";
        return;
    }

    const sampleData = {
        id: id,
        location: "Pahang",
        owner: "Najwa",
        area: "1200 sqft",
        status: "Clear"
    };

    resultBox.textContent = JSON.stringify(sampleData, null, 2);
    addLog(`🔍 Queried land record for Plot ${id}.`);
}
