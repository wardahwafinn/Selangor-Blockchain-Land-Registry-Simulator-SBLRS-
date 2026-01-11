const fs = require('fs');
const path = require('path');
const ledgerPath = path.join(__dirname, '../ledger.json');

class LandContract {
    // Helper to read ledger
    readLedger() {
        const data = fs.readFileSync(ledgerPath);
        return JSON.parse(data);
    }

    // Helper to write to ledger
    writeLedger(data) {
        fs.writeFileSync(ledgerPath, JSON.stringify(data, null, 2));
    }

    // Function 1: Register New Land
    registerLand(id, location, owner, area) {
        let ledger = this.readLedger();
        if (ledger.worldState[id]) {
            throw new Error(`Land Plot ${id} already exists.`);
        }

        const landRecord = { id, location, owner, area };
        ledger.worldState[id] = landRecord;
        ledger.transactions.push({ type: "REGISTER", id, timestamp: new Date() });
        
        this.writeLedger(ledger);
        return `Land Plot ${id} successfully registered to ${owner}.`;
    }

    // Function 2: Transfer Title
    transferTitle(id, newOwner) {
        let ledger = this.readLedger();
        if (!ledger.worldState[id]) {
            throw new Error(`Land Plot ${id} not found.`);
        }

        const oldOwner = ledger.worldState[id].owner;
        ledger.worldState[id].owner = newOwner;
        ledger.transactions.push({ type: "TRANSFER", id, from: oldOwner, to: newOwner, timestamp: new Date() });

        this.writeLedger(ledger);
        return `Ownership of Plot ${id} transferred from ${oldOwner} to ${newOwner}.`;
    }

    // Function 3: Query Land
    queryLand(id) {
        let ledger = this.readLedger();
        return ledger.worldState[id] || "No record found.";
    }

    // Function 4: Delete Land
    deleteLand(id) {
        let ledger = this.readLedger();
        if (!ledger.worldState[id]) {
            throw new Error(`Land Plot ${id} not found.`);
        }

        delete ledger.worldState[id];
        ledger.transactions.push({ type: "DELETE", id, timestamp: new Date() });

        this.writeLedger(ledger);
        return `Land Plot ${id} has been deleted from the registry.`;
    }
}

module.exports = LandContract;