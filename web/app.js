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

    fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, location: loc, owner, area })
    })
    .then(res => res.text())
    .then(result => {
        addLog(`✅ ${result}`);
        document.getElementById("c_id").value = "";
        document.getElementById("c_loc").value = "";
        document.getElementById("c_owner").value = "";
        document.getElementById("c_area").value = "";
    })
    .catch(err => addLog(`❌ Error: ${err.message}`));
}

// Transfer Ownership
function transferTitle() {
    const id = document.getElementById("t_id").value;
    const owner = document.getElementById("t_owner").value;

    if (!id || !owner) {
        addLog("❌ Transfer failed: Missing fields.");
        return;
    }

    fetch(`${API_URL}/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, newOwner: owner })
    })
    .then(res => res.text())
    .then(result => {
        addLog(`🔄 ${result}`);
        document.getElementById("t_id").value = "";
        document.getElementById("t_owner").value = "";
    })
    .catch(err => addLog(`❌ Error: ${err.message}`));
}

// Query Land
function queryLand() {
    const id = document.getElementById("q_id").value;
    const resultBox = document.getElementById("result");

    if (!id) {
        resultBox.textContent = "Please enter a Plot ID.";
        return;
    }

    fetch(`${API_URL}/query/${id}`)
        .then(res => res.json())
        .then(data => {
            if (data && data !== "No record found.") {
                resultBox.textContent = JSON.stringify(data, null, 2);
                addLog(`🔍 Queried land record for Plot ${id}.`);
            } else {
                resultBox.textContent = "No record found.";
                addLog(`⚠️ No record found for Plot ${id}.`);
            }
        })
        .catch(err => {
            resultBox.textContent = `Error: ${err.message}`;
            addLog(`❌ Query error: ${err.message}`);
        });
}

// Delete Land - NEW FUNCTION
function deleteLand() {
    const id = document.getElementById("d_id").value;

    if (!id) {
        addLog("❌ Delete failed: Missing Plot ID.");
        return;
    }

    if (!confirm(`Are you sure you want to delete land plot ${id}? This action cannot be undone.`)) {
        addLog(`⚠️ Delete operation cancelled for Plot ${id}.`);
        return;
    }

    fetch(`${API_URL}/delete/${id}`, {
        method: 'POST'
    })
    .then(res => res.text())
    .then(result => {
        addLog(`🗑️ ${result}`);
        document.getElementById("d_id").value = "";
    })
    .catch(err => addLog(`❌ Error: ${err.message}`));
}