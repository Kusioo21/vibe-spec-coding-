const CONFIG = {
    races: ['Człowiek', 'Elf', 'Krasnolud', 'Niziołek', 'Smocze Dziecię'],
    classes: {
        'Wojownik': { hd: 10, prime: 'STR' },
        'Mag': { hd: 6, prime: 'INT' },
        'Łotrzyk': { hd: 8, prime: 'DEX' },
        'Kleryk': { hd: 8, prime: 'WIS' }
    }
};

const DnDEngine = {
    rollStat() {
        let rolls = [1,1,1,1].map(() => Math.floor(Math.random() * 6) + 1);
        return rolls.sort().slice(1).reduce((a, b) => a + b, 0);
    },
    
    getModifier(score) {
        return Math.floor((score - 10) / 2);
    },

    generateCharacterData(className) {
        const scores = Array.from({length: 6}, () => this.rollStat()).sort((a,b) => b-a);
        const stats = { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 };
        const main = CONFIG.classes[className].prime;
        
        stats[main] = scores.shift();
        Object.keys(stats).forEach(k => { if(stats[k] === 0) stats[k] = scores.shift(); });
        
        return {
            stats,
            hp: CONFIG.classes[className].hd + this.getModifier(stats.CON),
            ac: 10 + this.getModifier(stats.DEX)
        };
    }
};