// Elements
const form = document.getElementById("tradeForm");
const message = document.getElementById("msg");

// Save trade
form.addEventListener("submit", async(e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if(!user) { return showMsg("Você não está logado!", true); }

    const trade = {
        ativo: form.ativo.value,
        setup: form.setup.value,
        data: form.data.value,
        resultado: parseFloat(form.resultado.value),
        createdAt: new Date(),
        userId: user.uid
    };

    try {
        await db.collection("trades").add(trade);
        showMsg("Trade salva com sucesso!");
        form.reset();
    } catch (err) {
        showMsg("Erro ao salvar trade.");
        console.log(err);
    }
});

function showMsg(text, error=false){
    message.innerText = text;
    message.style.color = error ? "red" : "green";
}
