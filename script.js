let modoDeJogo
let quantidadeDeCartas
let vidas
let minutos, segundos, intervalo
let vidasHUD = document.getElementById("vidas")
let tempoHUD = document.getElementById("tempo")
let temporizador = document.querySelector(".temporizador")
let escolhas = document.querySelectorAll(".escolha")
let lobby = document.querySelector("#cartaslobby")
let aviso = document.getElementById("aviso")
let cartasViradas = []
let encontradas = []
let imagens = ["images/pikachu.png", "images/bulbassaur.png", "images/charmander.png", "images/squirtle.png", "images/cartepie.png", "images/weedle.png", "images/pidgey.png", "images/rattata.png", "images/sandshrew.png", "images/butterfree.png", "images/clefairy.png", "images/vulpix.png", "images/jigglypuff.png", "images/zubat.png", "images/oddish.png", "images/paras.png", "images/venonat.png", "images/diglett.png", "images/meowth.png", "images/psyduck.png"]
let pokemons1 = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle", "Caterpie"]
let pokemons2 = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle", "Caterpie", "Weedle", "Pidgey", "Rattata", "Sandshrew", "ButterFree"]
let pokemons3 = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle", "Caterpie", "Weedle", "Pidgey", "Rattata", "Sandshrew", "ButterFree", "Clefairy", "Vulpix", "Jigglypuff", "Zubat", "Oddish", "Paras", "Venonat", "Diglett", "Meowth", "Psyduck"]
function modo(x){
    if (x==1){
        modoDeJogo="normal"
    }
    else if(x==2){
        modoDeJogo="com vidas"
    }
    else if(x==3){
        modoDeJogo="com tempo"
    }
    return modoDeJogo
}
function quantidade(y){
    if(y==1){
        quantidadeDeCartas=5
        vidas=7
        minutos=0
        segundos=31
    }
    if(y==2){
        quantidadeDeCartas=10
        vidas=13
        minutos=1
        segundos=31
    }
    if(y==3){
        quantidadeDeCartas=20
        vidas=15
        minutos=3
        segundos=1
    }
    return quantidadeDeCartas
}
function criarCartas(){
    if (!modoDeJogo || !quantidadeDeCartas) {
        aviso.textContent = "Escolha o modo de jogo e a quantidade de cartas!"
        setTimeout(()=>{aviso.style.display="none"}, 2000)
        return
    }
    lobby.innerHTML=""
    lobby.style.display="flex"
    for (let i = 0; i < quantidadeDeCartas; i++) {
        let carta1, carta2
        if(quantidadeDeCartas==5){
            carta1 = 
                `<div class="cartas" data-nome="${pokemons1[i]}" onclick="virarCarta(this)">
                    <div class="carta-flipper">
                    <div class="carta-frente"><img src="${imagens[i]}"></div>
                        <div class="carta-verso">?</div>
                    </div>
                </div>`
            carta2 = 
                `<div class="cartas" data-nome="${pokemons1[i]}" onclick="virarCarta(this)">
                    <div class="carta-flipper">
                    <div class="carta-frente"><img src="${imagens[i]}"></div>
                        <div class="carta-verso">?</div>
                    </div>
                </div>`
        }
        else if(quantidadeDeCartas==10){
            carta1 = 
                `<div class="cartas" data-nome="${pokemons2[i]}" onclick="virarCarta(this)">
                    <div class="carta-flipper">
                    <div class="carta-frente"><img src="${imagens[i]}"></div>
                        <div class="carta-verso">?</div>
                    </div>
                </div>`
            carta2 = 
                `<div class="cartas" data-nome="${pokemons2[i]}" onclick="virarCarta(this)">
                    <div class="carta-flipper">
                    <div class="carta-frente"><img src="${imagens[i]}"></div>
                        <div class="carta-verso">?</div>
                    </div>
                </div>`
        }
        else if(quantidadeDeCartas==20){
            carta1 = 
                `<div class="cartas" data-nome="${pokemons3[i]}" onclick="virarCarta(this)">
                    <div class="carta-flipper">
                    <div class="carta-frente"><img src="${imagens[i]}"></div>
                        <div class="carta-verso">?</div>
                    </div>
                </div>`
            carta2 = 
                `<div class="cartas" data-nome="${pokemons3[i]}" onclick="virarCarta(this)">
                    <div class="carta-flipper">
                    <div class="carta-frente"><img src="${imagens[i]}"></div>
                        <div class="carta-verso">?</div>
                    </div>
                </div>`
        }
        lobby.innerHTML += carta1 + carta2
    }
}
function embaralhar(array){
    var m=array.length , i , t
    while (m){
        i=Math.floor(Math.random()* m--)
        t = array[m]
        array[m] = array[i]
        array[i] = t
    }
    return array
}
function virarCarta(carta){
    carta.classList.toggle("virada")
}
function clicou(e){
    let carta = e.currentTarget
    if(cartasViradas.length < 2 && !carta.classList.contains("virada")){
        cartasViradas.push(carta)
        if(cartasViradas.length == 2){
            let carta1 = cartasViradas[0].dataset.nome
            let carta2 = cartasViradas[1].dataset.nome
            if(carta1 === carta2){
                cartasViradas.forEach(carta =>{
                    carta.classList.remove("errada")
                    carta.classList.add("encontrada")
                    carta.setAttribute("onclick", "")
                    carta.removeEventListener("click", clicou)
                    cartasViradas = []
                    encontradas.push(carta)
                })
                if(encontradas.length===(quantidadeDeCartas*2)){
                    aviso.textContent = "Parabéns, você capturou todos os pokémons"
                    aviso.style.display = "block"
                    clearInterval(intervalo)
                    escolhas.forEach(botoes =>{botoes.classList.remove("desativado")})
                    setTimeout(() => {
                        aviso.style.display="none"
                    },6000)
}
            }
            else{
                cartasViradas.forEach(carta =>{if(carta.classList.contains("errada")){carta.classList.remove("errada")}})
                setTimeout(() => {
                    cartasViradas.forEach(carta =>{
                        virarCarta(carta)
                        carta.classList.add("errada")
                    })
                    cartasViradas = []
                }, 1000)
                let coracoesDOM = vidasHUD.querySelectorAll(".coracoes")
                if(coracoesDOM.length >= 0){coracoesDOM[coracoesDOM.length - 1].remove()}
            }
        }
    }
    if(coracoesDOM.length==0){
        aviso.textContent="Suas vidas acabaram"
        aviso.style.display="block"
        let cartas = Array.from(document.querySelectorAll(".cartas"))
        cartas.forEach(carta => {
            carta.removeEventListener("click", clicou)
        })
        setTimeout(() => {aviso.style.display="none"}, 6000)
    }
}
function tempo(x){
    if (segundos == 0) {
        if (minutos == 0) {
            clearInterval(intervalo)
            aviso.textContent = "Tempo esgotado!"
            aviso.style.display = "block"
            setTimeout(() =>{
            aviso.style.display = "none"
            tempoHUD.style.display = "none"
            }, 10000)
            let cartas = Array.from(document.querySelectorAll(".cartas"))
            cartas.forEach(carta => {
                carta.setAttribute("onclick", "")
                carta.removeEventListener("click", clicou)
                carta.classList.remove("virada")
                return
            })
            escolhas.forEach(botoes =>{botoes.classList.remove("desativado")})
            return
        } else {
            minutos--
            segundos = 59
        }
    } else {
        segundos--
    }
    let minStr = minutos < 10 ? "0" + minutos : minutos
    let segStr = segundos < 10 ? "0" + segundos : segundos
    x.innerHTML = `<div class="temporizador"><p>${minStr}:${segStr}</p></div>`
}
function jogar() {
    if(modoDeJogo==="com vidas"){
        vidasHUD.innerHTML = ""
        tempoHUD.innerHTML = ""
        for(let i=0; i<vidas; i++){
            let coracao = document.createElement("img")
            coracao.classList.add("coracoes")
            coracao.src= `images/vidas.png`
            vidasHUD.appendChild(coracao)
        }
    }
    else if(modoDeJogo==="com tempo"){
        vidasHUD.innerHTML = ""
        escolhas.forEach(botoes => {
            botoes.classList.add("desativado")
        })
        let tempoHUD = document.getElementById("tempo")
        tempoHUD.innerHTML= ""
        tempo(tempoHUD)
        clearInterval(intervalo)
        setTimeout(() =>{intervalo = setInterval(() => tempo(tempoHUD), 1000)}, 1000)
    }
    let cartas = Array.from(document.querySelectorAll(".cartas"))
    cartas.forEach(carta => {
        carta.classList.remove("encontrada")
        virarCarta(carta)
    })
    let cartasEmbaralhadas = embaralhar(cartas)
    lobby.innerHTML = ""
    cartasEmbaralhadas.forEach(carta => {
        lobby.appendChild(carta);
        carta.addEventListener("click", clicou)
    })
    cartasViradas = [];
}