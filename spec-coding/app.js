const UI = {
    init() {
        const rSel = document.getElementById('racePicker');
        const cSel = document.getElementById('classPicker');
        
        CONFIG.races.forEach(r => rSel.innerHTML += `<option>${r}</option>`);
        Object.keys(CONFIG.classes).forEach(c => cSel.innerHTML += `<option>${c}</option>`);

        document.getElementById('btnGen').addEventListener('click', () => this.render());
        document.getElementById('btnPdf').addEventListener('click', () => this.print());
        
        this.render();
    },

    render() {
        const race = document.getElementById('racePicker').value;
        const cls = document.getElementById('classPicker').value;
        const data = DnDEngine.generateCharacterData(cls);

        document.getElementById('viewRace').innerText = race;
        document.getElementById('viewClass').innerText = cls;
        document.getElementById('valHP').innerText = data.hp;
        document.getElementById('valAC').innerText = data.ac;

        const grid = document.getElementById('statGrid');
        grid.innerHTML = '';
        Object.entries(data.stats).forEach(([name, val]) => {
            const m = DnDEngine.getModifier(val);
            grid.innerHTML += `<div class="stat-item"><b>${name}</b><br>${val} (${m >= 0 ? '+' + m : m})</div>`;
        });
    },

    print() {
        const element = document.getElementById('sheet-to-print');
        html2pdf().from(element).set({ margin: 10, filename: 'SpecCharacter.pdf' }).save();
    }
};

UI.init();