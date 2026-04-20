function robPostac() {
    let rasa = document.getElementById('r').value;
    let klasa = document.getElementById('c').value;
    document.getElementById('r_out').innerText = rasa;
    document.getElementById('c_out').innerText = klasa;

    let wyniki = [];
    for(let i=0; i<6; i++) {
        let rzuty = [Math.floor(Math.random()*6)+1, Math.floor(Math.random()*6)+1, Math.floor(Math.random()*6)+1, Math.floor(Math.random()*6)+1];
        rzuty.sort().shift();
        wyniki.push(rzuty.reduce((a,b) => a+b));
    }
    wyniki.sort((a,b) => b-a);

    let s = { STR: wyniki[2], DEX: wyniki[3], CON: wyniki[1], INT: wyniki[4], WIS: wyniki[5], CHA: wyniki[0] };
    
    if(klasa === 'Wojownik') s.STR = wyniki[0];
    if(klasa === 'Mag') s.INT = wyniki[0];
    if(klasa === 'Łotrzyk') s.DEX = wyniki[0];

    let html = "";
    for(let cecha in s) {
        let mod = Math.floor((s[cecha] - 10) / 2);
        html += `<div class="stat-line">${cecha}: ${s[cecha]} (${mod >= 0 ? '+' + mod : mod})</div>`;
    }
    document.getElementById('stats-area').innerHTML = html;

    let conMod = Math.floor((s.CON - 10) / 2);
    let hpBase = (klasa === 'Wojownik' ? 10 : (klasa === 'Mag' ? 6 : 8));
    document.getElementById('hp').innerText = hpBase + conMod;
    document.getElementById('ac').innerText = 10 + Math.floor((s.DEX - 10) / 2);
}

function pobierzPDF() {
    const element = document.getElementById('karta');
    html2pdf().from(element).save('vibe-character.pdf');
}