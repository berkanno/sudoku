import { defineStore } from "pinia";
import { ref } from "vue";

export const useMainStore = defineStore("mainStore", () => {

    // const sudokuList = ref([] as number[])
    
    const createSudokuList= () => {
      let sudokuList = [] as number[][]
      for (let y = 0; y < 3; y++) {
        sudokuList[y] = []
        const verticalValue = (Math.ceil((y + 1) / 3) - 1)
        console.log(y,verticalValue,"YYYYYYYYYYYYYYYYYYYYYYYYYY")
        sleep(1000)
        for (let x = 0; x < 9; x++) {
            const startSliceValue = (Math.ceil((x + 1)  / 3) - 1) * 3
            let number = 1
            let isWhileOut = true
            while(isWhileOut) {
                number = randomCreateNumberBetweenOneAndNine()
                isWhileOut = sudokuList[y].includes(number)
                if(y > 0 && !isWhileOut) {
                    for (let z = y; -1 < z; z--) {
                        console.log(z, y,(y === 2 && (sudokuList[0].slice(startSliceValue,startSliceValue + 3).includes(number) || sudokuList[1].slice(startSliceValue,startSliceValue + 3).includes(number))),number,"JDFKGLDFLGMLKDNLDKGM")
                       if(((y === 2 && (sudokuList[0].slice(startSliceValue,startSliceValue + 3).includes(number) || sudokuList[1].slice(startSliceValue,startSliceValue + 3).includes(number))) || (y === 1 && sudokuList[0].slice(startSliceValue,startSliceValue + 3).includes(number))) && !isWhileOut && verticalValue === 0){
                         isWhileOut = true
                        } else if (verticalValue === 1 && !isWhileOut && (sudokuList[y - z][x] === number || (y === 4 && sudokuList[3].slice(startSliceValue,startSliceValue + 3).includes(number)) || (y === 5 && (sudokuList[4].slice(startSliceValue,startSliceValue + 3).includes(number) || sudokuList[3].slice(startSliceValue,startSliceValue + 3).includes(number))))) {
                            isWhileOut = true
                        }
                    }
                }
            }
            sudokuList[y].push(number)
        }
       
      }
        console.log(sudokuList,"asdada")
    }

    const sleep = (delay:number) => {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
    }

    const randomCreateNumberBetweenOneAndNine = () => {
        let number = Number(Math.floor(Math.random()*10))
        while (number === 0) {
            number = Number(Math.floor(Math.random()*10))
        }
        return number
    }

    return { createSudokuList }
})