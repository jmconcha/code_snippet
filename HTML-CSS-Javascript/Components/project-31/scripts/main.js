"use strict";

window.addEventListener("load", function () {
    let outputScreen = this.document.getElementById("outputScreen");
    let buttons = document.getElementsByClassName("btn");

    function calculator() {
        switch (this.textContent) {
            case "AC":
                outputScreen.value = "";
                break;
            case "CE":
                if (!outputScreen.value) {
                    return;
                }
                
                outputScreen.value = outputScreen.value.slice(0, -1);
                break;
            case "=":
                if (!outputScreen.value) {
                    return;
                }

                {
                    let equation = outputScreen.value;
                    equation = equation.replace(/×/g, "*").replace(/÷/g, "/");
                    outputScreen.value = Math.round(
                        eval(equation) * 1000000) / 1000000;
                }
                break;
            case "%":
                if (!outputScreen.value) {
                    return;
                }

                {
                    let equation = outputScreen.value;

                    if (isNaN(equation)) {
                        return;
                    }

                    outputScreen.value = Number(outputScreen.value) / 100;
                }
                break;
            case "×":
            case "÷":
            case "+":
            case "-":
                {
                    let equation = outputScreen.value;

                    if (!equation) {
                        return;
                    }

                    if (isNaN(equation.slice(-1))) {
                        outputScreen.value = equation.slice(0, -1) + this.textContent;
                    } else {
                        outputScreen.value += this.textContent;
                    }
                }
                break;
            default:
                outputScreen.value += this.textContent;
        }
    }

    for (let button of buttons) {
        button.onclick = calculator;
    }
});