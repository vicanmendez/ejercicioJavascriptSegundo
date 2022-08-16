
function elementsOverlap(el1, el2) {
    /*
    getBoundingClientRect() retorna el tamaño y la posición del elemento en el documento.
    https://developer.mozilla.org/es/docs/Web/API/Element/getBoundingClientRect
    */
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();

    //Por DeMorgan, podemos usar varias AND, o usar la negación de las OR
    if (domRect1.top < domRect2.bottom && domRect1.right > domRect2.left && domRect1.bottom > domRect2.top && domRect1.left < domRect2.right) {
        return true;_
    }
    return false;
    /*
    return !(
      domRect1.top > domRect2.bottom ||
      domRect1.right < domRect2.left ||
      domRect1.bottom < domRect2.top ||
      domRect1.left > domRect2.right
    );
    */
  }

window.addEventListener("load", function() {
    // Inicializamos el juego
    var mira = document.getElementById("mira");
    var areaDeJuego = document.getElementById("areaDeJuego");
    var target = document.getElementById("target");    
    var targetPosX = 0;
    var clicks = 0;                                  

    //Al pasar el mouse sobre el area de juego, ocultamos el cursor y mostramos la mira
    areaDeJuego.addEventListener("mouseover", function() {
        this.style.cursor = "none";
        mira.style.display = "block";
    });

    //Al salir del area de juego, mostramos el cursor y ocultamos la mira
    areaDeJuego.addEventListener("mouseout", function() {
        this.style.cursor = "default";
        mira.style.display = "none";
    });


    //Al mover el mouse, actualizamos la posicion de la mira
    document.addEventListener("mousemove", function(event) {
        //Posición X aleatoria
        targetPosX += Math.random() * 10;
        if(targetPosX > 900) {
            targetPosX = 0;
        }
        var x = event.clientX;
        var y = event.clientY;
        //console.log("Posición X: " + x + " Posición Y:" + y);
        mira.style.left = x + "px";
        mira.style.top = y + "px";
        target.style.left  = targetPosX +  "px";
    });

    areaDeJuego.addEventListener("click", function() {
        clicks += 1;
        document.getElementById("contador").innerHTML = "Clicks: " + clicks;  
    });
    
    document.addEventListener("click", function() {
        //Check if target element overlaps with the mira element 
        if(elementsOverlap(target, mira)) {
            alert("¡Has acertado!");
            target.style.display = "none";
        }
        
    });
    

});