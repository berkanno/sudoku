import { defineStore } from "pinia";
import { ref } from "vue";

export const useMainStore = defineStore("mainStore", () => {
  const sudokuList = ref([] as number[][])

  const createSudokuList = () => {
    sudokuList.value = [];
    let number = 1;
    [0,1,2,3,4,5,6,7,8].forEach(y => {
      sudokuList.value[y] = [];
      for (let x = 0; x < 9; x++) {
        const startSliceValue = (Math.ceil((x + 1) / 3) - 1) * 3;
        if([0,1,2].includes(y)) {
          number = createNumber([...(sudokuList.value[y] ?? []), ...([1,2].includes(y) ? [...sudokuList.value[0].slice(startSliceValue,startSliceValue+3)] : []), ...([2].includes(y) ? [...sudokuList.value[1].slice(startSliceValue,startSliceValue+3)] : [])])
          // number = createNumber([...(sudokuList.value[y] ?? [])])
          sudokuList.value[y].push(number);
        } else if ([3,4,5].includes(y)) {
          number = createNumber([...[sudokuList.value[0][x],sudokuList.value[1][x],sudokuList.value[2][x]],...(sudokuList.value[y] ?? []), ...([4,5].includes(y) ? [...sudokuList.value[3].slice(startSliceValue,startSliceValue+3)] : []), ...([5].includes(y) ? [...sudokuList.value[4].slice(startSliceValue,startSliceValue+3)] : [])])
          sudokuList.value[y].push(number);
        } else if ([6,7,8].includes(y)) {
          number = createNumber([...[sudokuList.value[0][x],sudokuList.value[1][x],sudokuList.value[2][x],sudokuList.value[3][x],sudokuList.value[4][x],sudokuList.value[5][x]],...(sudokuList.value[y] ?? []), ...([7,8].includes(y) ? [...sudokuList.value[6].slice(startSliceValue,startSliceValue+3)] : []), ...([8].includes(y) ? [...sudokuList.value[7].slice(startSliceValue,startSliceValue+3)] : [])])
          sudokuList.value[y].push(number);
        }
      }
    })
    if(sudokuList.value.some(e => e.includes(undefined))) createSudokuList()
  };

  const sleep = (delay: number) => {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  };
  const createNumber = (excludeList?: number[]) => {
    let randomSpecificNumberList = [1,2,3,4,5,6,7,8,9]
    randomSpecificNumberList = randomSpecificNumberList.filter((e: number) => !(excludeList ?? []).filter(element => element != undefined).includes(e))
    const findNumberIndexRandom = randomSpecificNumberList.length === 1 ? 0 : Math.floor(Math.random() * (randomSpecificNumberList.length - 1 + 1)) + 0
    return randomSpecificNumberList[findNumberIndexRandom]
  }

  return { createSudokuList, sudokuList };
});
