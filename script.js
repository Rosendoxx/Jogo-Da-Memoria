let modoDeJogo;
let quantidadeDeCartas;
let lobby = document.querySelector("#cartaslobby");
let aviso = document.getElementById("aviso");
let cartasViradas = []
let imagens = ["images/pikachu.png", "images/bulbassaur.png", "images/charmander.png", "images/squirtle.png", "images/cartepie.png", "images/weedle.png", "images/pidgey.png", "images/rattata.png", "images/sandshrew.png", "images/butterfree.png", "images/clefairy.png", "images/vulpix.png", "images/jigglypuff.png", "images/zubat.png", "images/oddish.png", "images/paras.png", "images/venonat.png", "images/diglett.png", "images/meowth.png", "images/psyduck.png"]
let pokemons1 = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle", "Caterpie"];
let pokemons2 = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle", "Caterpie", "Weedle", "Pidgey", "Rattata", "Sandshrew", "ButterFree"];
let pokemons3 = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle", "Caterpie", "Weedle", "Pidgey", "Rattata", "Sandshrew", "ButterFree", "Clefairy", "Vulpix", "Jigglypuff", "Zubat", "Oddish", "Paras", "Venonat", "Diglett", "Meowth", "Psyduck"];
function modo(x){
    if (x==1){
        modoDeJogo="normal";
    }
    else if(x==2){
        modoDeJogo="com vidas";
    }
    else if(x==3){
        modoDeJogo="com tempo";
    }
    return modoDeJogo
}
function quantidade(y){
    if(y==1){
        quantidadeDeCartas=5;
    }
    if(y==2){
        quantidadeDeCartas=10;
    }
    if(y==3){
        quantidadeDeCartas=20;
    }
    return quantidadeDeCartas;
}
function criarCartas(){
    if (!modoDeJogo || !quantidadeDeCartas) {
        aviso.textContent = "Escolha o modo de jogo e a quantidade de cartas!";
        setTimeout(()=>{aviso.style.display="none"}, 2000)
        return;
    }

    lobby.innerHTML="";
    lobby.style.display="flex";
    for (let i = 0; i < quantidadeDeCartas; i++) {
        let carta1, carta2;
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
        lobby.innerHTML += carta1 + carta2;
    }
}
function embaralhar(array){
    var m=array.length , i , t;
    while (m){
        i=Math.floor(Math.random()* m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
function virarCarta(carta){
    carta.classList.toggle("virada");
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
                    carta.classList.add("encontrada")
                    carta.setAttribute("onclick", "")
                    carta.removeEventListener("click", clicou)
                    cartasViradas = []
                })
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
            }
        }
    }
}
function jogar() {
    let cartas = Array.from(document.querySelectorAll(".cartas"));
    cartas.forEach(carta => {
        carta.classList.remove("encontrada");
        virarCarta(carta)
    });
    let cartasEmbaralhadas = embaralhar(cartas);
    lobby.innerHTML = "";
    cartasEmbaralhadas.forEach(carta => {
        lobby.appendChild(carta);
        carta.addEventListener("click", clicou);
    });
    cartasViradas = [];
}