import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useMainStore = defineStore("mainStore", () => {
  const sudokuList = ref([] as (number | undefined)[][])
  const sudokuListTable = ref([] as ({value: number, isShow: boolean, isAnswerTrue: boolean})[][])
  const logList = ref([] as {text: string, class: string}[])

  const getRowDynamicClass = computed(()=> 
    (index: number)=> {
      if([0].includes(index)) return "border-t-lg border-b-0 border-e-0 border-s-0 border-t-black border-t-opacity-100"
      else if([2,5,8].includes(index)) return "border-b-lg border-t-0 border-e-0 border-s-0 border-b-black border-b-opacity-100"
      return ""
  })
  const getColDynamicClass = computed(()=> 
    (index: number)=> {
      if([0].includes(index)) return "border-t-sm border-b-sm border-e-sm border-black border-opacity-10 border-s-lg border-s-opacity-100"
      if([2,5,8].includes(index)) return "border-t-sm border-b-sm border-s-sm border-black border-opacity-10 border-e-lg border-e-opacity-100"
      return "border-sm border-black border-opacity-10"
  })

  const createSudokuList = () => {
    sudokuList.value = [];
    let number = 1;
    [0,1,2,3,4,5,6,7,8].forEach(y => {
      sudokuList.value[y] = [];
      for (let x = 0; x < 9; x++) {
        const startSliceValue = (Math.ceil((x + 1) / 3) - 1) * 3;
        let excludeList = [...(sudokuList.value[y] ?? [])]
        if([0,1,2].includes(y)) {
          excludeList.push(...([1,2].includes(y) ? [...sudokuList.value[0].slice(startSliceValue,startSliceValue+3)] : []))
          excludeList.push(...([2].includes(y) ? [...sudokuList.value[1].slice(startSliceValue,startSliceValue+3)] : []))
        } else if ([3,4,5].includes(y)) {
          excludeList.push(...[sudokuList.value[0][x],sudokuList.value[1][x],sudokuList.value[2][x]])
          excludeList.push(...([4,5].includes(y) ? [...sudokuList.value[3].slice(startSliceValue,startSliceValue+3)] : []))
          excludeList.push(...([5].includes(y) ? [...sudokuList.value[4].slice(startSliceValue,startSliceValue+3)] : []))
        } else if ([6,7,8].includes(y)) {
          excludeList.push(...[sudokuList.value[0][x],sudokuList.value[1][x],sudokuList.value[2][x],sudokuList.value[3][x],sudokuList.value[4][x],sudokuList.value[5][x]])
          excludeList.push(...([7,8].includes(y) ? [...sudokuList.value[6].slice(startSliceValue,startSliceValue+3)] : []))
          excludeList.push(...([8].includes(y) ? [...sudokuList.value[7].slice(startSliceValue,startSliceValue+3)] : []))
        }
        number = createSpecificRandomNumber(excludeList)
        sudokuList.value[y].push(number);
      }
    })
    if(sudokuList.value.some(e => e.includes(undefined))) createSudokuList()
    else sudokuList.value.forEach((e,i)=> {
      const randomNumberForIsShow = randomTwoNumberCreate(5)
      sudokuListTable.value[i] = [...e?.map(e => { return { value: (e as number), isShow: randomNumberForIsShow.includes((e as number)), isAnswerTrue: randomNumberForIsShow.includes((e as number))}})] 
    })
    logList.value = []
    logList.value.push({text: "SAYILAR YERLEŞTİRİLDİ", class: "text-orange-darken-1 text-center text-overline"})
    logList.value.push({text: "SUDOKUYU ÇÖZMEYE BAŞLAYABİLİRSİNİZ", class: "text-teal-darken-1 text-center text-overline"})
  };

  const createSpecificRandomNumber = (excludeList?: (number | undefined)[]) => {
    let randomSpecificNumberList = [1,2,3,4,5,6,7,8,9]
    randomSpecificNumberList = randomSpecificNumberList.filter((e: number) => !(excludeList ?? []).filter(element => element != undefined).includes(e))
    const findNumberIndexRandom = randomSpecificNumberList.length === 1 ? 0 : Math.floor(Math.random() * (randomSpecificNumberList.length - 1 + 1)) + 0
    return randomSpecificNumberList[findNumberIndexRandom]
  }
  
  const randomTwoNumberCreate = (sudokuLevel: number)=> {
    let randomSpecificNumberList = [1,2,3,4,5,6,7,8,9]
    let randomNumberToReturn = []
    for (let i = 0; i < sudokuLevel; i++) {
      randomNumberToReturn.push(randomSpecificNumberList[Math.floor(Math.random() * (randomSpecificNumberList.length - 1 + 1)) + 0])
      randomSpecificNumberList = randomSpecificNumberList.filter(e => !randomNumberToReturn.includes(e))
    }
    return randomNumberToReturn
  }

  return { sudokuList, sudokuListTable, getRowDynamicClass, getColDynamicClass, logList, createSudokuList };
});
