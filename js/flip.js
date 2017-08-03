let button = document.getElementById('box');

button.addEventListener("click",spinBulba);

  console.log(button);

  function spinBulba() {
    console.log(this);
    let bulba = this;
    let degrees = 180;
    let id = setInterval(frame,10);
    function frame() {
      if (degrees <= 0){
        clearInterval(id);
      }
      else{
        degrees--;
        console.log(bulba);
        baby.style.transform = "rotateY("+degrees+"deg)"
    }
  }
}

//
// function move() {
//     var elem = document.getElementById("myBar");
//     var width = 1;
//     var id = setInterval(frame, 10);
//     function frame() {
//         if (width >= 100) {
//             clearInterval(id);
//         } else {
//             width++;
//             elem.style.width = width + '%';
//         }
//     }
// }
