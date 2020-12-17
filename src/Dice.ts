import IDice from "./IDice";

class Dice implements IDice {
    constructor(private numberOfSides: number){}

    roll(): number{
        return 1 + Math.floor(Math.random() * this.numberOfSides)
    }
}

export default Dice