const historyBox = document.getElementById("tradesList");
const totalTrades = document.getElementById("totalTrades");
const totalProfit = document.getElementById("totalProfit");

auth.onAuthStateChanged(async user => {
    if(!user) return;

    db.collection("trades")
      .where("userId", "==", user.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        
        historyBox.innerHTML = "";
        let profit = 0;

        snapshot.forEach(doc => {
            const t = doc.data();
            profit += t.resultado;

            historyBox.innerHTML += `
                <div class="trade-item">
                    <b>${t.ativo}</b> - ${t.data} ➜ R$ ${t.resultado}
                </div>
            `;
        });

        totalTrades.innerText = snapshot.size;
        totalProfit.innerText = "R$ " + profit.toFixed(2);
    });
});
