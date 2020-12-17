import Dice from "./Dice";
import IDice from "./IDice";

describe('Dice', ()=>{
    describe('roll', ()=> {
        it(`returns a random number between 1 
        and the number of sides inclusive`, ()=>{
            // Arrange
            const numberOfSides: number = 6;

            const dice: IDice = new Dice(numberOfSides)

            // Act
            const result = dice.roll()

            // Assert
            expect(result >= 1).toBe(true)
            expect(result <= numberOfSides).toBe(true)
        })
    })
})