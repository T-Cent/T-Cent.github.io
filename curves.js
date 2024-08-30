const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function multiply (vector, scalar) {
    return [vector[0]*scalar, vector[1]*scalar];
}

let P1 = [20, 300];
let P2 = [300, 300];
let P3 = [10, 30];

ctx.beginPath()
for (let i = 0; i < 100; i=i+5) {
    let t = i/100
    let A = multiply(P1, (1-t)**3);
    let B = multiply(P2, 2*t*(1-t));
    let C = multiply(P3, t**2);
    ctx.moveTo(A[0]+B[0]+C[0], A[1]+B[1]+C[1]);
    
    let t_ = i/100 + 0.05
    let A_ = multiply(P1, (1-t_)**3);
    let B_ = multiply(P2, 2*t*(1-t_));
    let C_ = multiply(P3, t_**2);
    ctx.lineTo(A_[0]+B_[0]+C_[0], A_[1]+B_[1]+C_[1]);
    
}
ctx.stroke()