// define claculator class
class calculator {

    constructor(current , perv) {
        this.currentNum = current;
        this.pervNum = perv;
        this.allClear();
    }

    allClear(){
        this.currentOperand= '';
        this.pervOperand = "";
        this.currentOprate = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0 , -1);
    }

    addNumber(number){
        if (number == "." && this.currentOperand.includes(".")) {return}
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOprate(opration){
        if(this.currentOperand == "") {return}
        if (this.pervOperand !== "") {
            this.action();
        }
        this.currentOprate = opration;
        this.pervOperand = this.currentOperand
        this.currentOperand = "";
    }

    updateNumber(){
        this.currentNum.innerText = this.currentOperand;
        if (this.currentOprate != null) {
            this.pervNum.innerText =
            ` ${this.pervOperand} ${this.currentOprate}`;
        }else{
            this.pervNum.innerText = this.pervOperand;
        }
    }

    action(){
        let answer;
        const prev = parseFloat(this.pervOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)){return}
        if (this.pervNum.innerText !== "") {
            switch (this.currentOprate) {
                case "+":
                    answer = prev  + current;
                    break;
                case "-":
                    answer = prev  - current;
                    break;
                case "*":
                    answer = prev  * current;
                    break;
                case "/":
                    answer = prev  / current;
                    break;  
                default:
                    return;
            }
            this.currentOperand = answer;
            this.pervOperand = "";
            this.currentOprate = undefined;
        }
    }
}

// get elements
const numbers = document.querySelectorAll("[number]");
const operations = document.querySelectorAll("[operation]");
const equle = document.querySelector("[equle]");
const allClearBtn = document.querySelector(".allclear");
const del = document.querySelector('.delete');
const perv = document.querySelector('.perv');
const current = document.querySelector('.numbers');

// create a new class 
const cal = new calculator(current , perv);

// add numbers
numbers.forEach( number => {
    number.addEventListener('click',()=>{
        cal.addNumber(number.innerText);
        cal.updateNumber();
    })
})

// choose opretin
operations.forEach(operate => {
    operate.addEventListener('click',()=>{
        cal.chooseOprate(operate.innerText);
        cal.updateNumber();
    })
})

// all clear button
allClearBtn.addEventListener('click' , ()=>{
    cal.allClear();
    cal.updateNumber();
});

// all clear button
del.addEventListener("click" , ()=>{
    cal.delete();
    cal.updateNumber();
})

equle.addEventListener('click' , ()=>{
    cal.action();
    cal.updateNumber();
})