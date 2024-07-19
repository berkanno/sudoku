import { defineStore } from "pinia";
import { ref } from "vue";

export const useMainStore = defineStore("mainStore", () => {

    // const sudokuList = ref([] as number[])
    
    const createSudokuList= async () => {
      let sudokuList = [] as number[][]
      for (let y = 0; y < 6; y++) {
        sudokuList[y] = []
        const verticalValue = (Math.ceil((y + 1) / 3) - 1)
        for (let x = 0; x < 9; x++) {
            const startSliceValue = (Math.ceil((x + 1)  / 3) - 1) * 3
            let number = 1
            let isWhileOut = true
            while(isWhileOut) {
                number = randomCreateNumberBetweenOneAndNine()
                isWhileOut = sudokuList[y].includes(number)
                if(y > 0 && !isWhileOut) {
                    for (let z = 1; z < (y + 1); z++) {
                        console.log(z, y,startSliceValue,sudokuList[y-z].slice(startSliceValue,startSliceValue + 3),number,"JDFKGLDFLGMLKDNLDKGM")
                       if(sudokuList[y-z].slice(startSliceValue,startSliceValue + 3).includes(number) && !isWhileOut && verticalValue === 0){
                         isWhileOut = true
                        } else if (verticalValue === 1 && !isWhileOut) {
                          console.log("",y,"sdfsdfsdfsdfsdfsdfsdfdsfdsfsdf")
                        }
                    }
                }
            }
            sudokuList[y].push(number)
        }
        console.log(verticalValue,"verticalValue")
      }
            // sudokuList[0] = []
            // for (let x = 0; x < 9; x++) {
            //     let number = 1
            //     do {
            //         number = await randomCreateNumberBetweenOneAndNine()
            //     }
            //     while(sudokuList[0].includes(number))
            //     sudokuList[0].push(number)
            // }

            // sudokuList[1] = []
            // for (let x = 0; x < 9; x++) {
            //     const startSliceValue = (Math.ceil((x + 1)  / 3) - 1) * 3
            //     let number = 1
            //     let isWhileOut = false
            //     do {
            //         number = await randomCreateNumberBetweenOneAndNine()
            //         isWhileOut = sudokuList[1].includes(number) || sudokuList[0].slice(startSliceValue,startSliceValue + 3).includes(number) 
            //     }
            //     while(isWhileOut)
            //     sudokuList[1].push(number)
            // }

            // sudokuList[2] = []
            // for (let x = 0; x < 9; x++) {
            //     const startSliceValue = (Math.ceil((x + 1)  / 3) - 1) * 3
            //     let number = 1
            //     let isWhileOut = false
            //     do {
            //         number = await randomCreateNumberBetweenOneAndNine()
            //         isWhileOut = sudokuList[2].includes(number) || sudokuList[0].slice(startSliceValue,startSliceValue + 3).includes(number) || sudokuList[1].slice(startSliceValue,startSliceValue + 3).includes(number) 
            //     }
            //     while(isWhileOut)
            //     sudokuList[2].push(number)
            // }


        console.log(sudokuList,"asdada")
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