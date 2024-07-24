<template>
  <v-app>
    <v-main>
      <v-card class="fill-height">
        <v-card-text>
          <v-row class="flex-column">
            <v-col class="d-flex justify-center">
              <v-btn @click="createSudokuList()" class="elevation-0" >Başla</v-btn>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn :color="(sudokuLevel === 3 ? 'red' : sudokuLevel === 5 ? 'orange' : 'teal') + '-darken-1'" v-bind="props" class="elevation-0 mx-3"
                    >{{ sudokuLevel === 3 ? "Zor" : sudokuLevel === 5 ? "Orta" : "Kolay"}}</v-btn
                  >
                </template>
                <v-list>
                  <v-row class="ma-4">
                    <v-col v-for="(xItem, xIndex) in [1,3,5]" :key="xIndex">
                      <v-btn @click="updateSudokuLevel(xItem)" :color="xItem === 1 ? 'red' : xItem === 3 ? 'orange' : 'teal' + '-darken-1'" >{{
                        xItem === 1 ? "Zor" : xItem === 3 ? "Orta" : "Kolay"
                      }}</v-btn>
                    </v-col>
                  </v-row>
                </v-list>
              </v-menu>
            </v-col>
            <v-col class="px-10">
              <v-row
                v-for="(number, index) in sudokuListTable.length
                  ? sudokuListTable
                  : defaultListBeforeStarting"
                :key="index"
                :class="getRowDynamicClass(index)"
              >
                <v-col
                  v-for="(i, cIndex) in 9"
                  :key="cIndex"
                  class="pa-5 text-h6 d-flex align-center justify-center"
                  :class="getColDynamicClass(cIndex)"
                >
                  <v-row justify="center">
                    <v-col
                      v-if="number[i - 1]?.isShow"
                      cols="auto text-grey-darken-2"
                    >
                      {{ number[i - 1].value }}
                    </v-col>
                    <v-col
                      v-else-if="
                        !number[i - 1]?.isShow && !number[i - 1]?.isAnswerTrue
                      "
                    >
                      <v-menu>
                        <template v-slot:activator="{ props }">
                          <v-btn
                            color="white"
                            v-bind="props"
                            class="elevation-0"
                            width="100%"
                            height="100%"
                          ></v-btn>
                        </template>
                        <v-list>
                          <v-row class="ma-4">
                            <v-col v-for="(xItem, xIndex) in 9" :key="xIndex">
                              <v-btn
                                @click="onAnswerClick(xItem, number[i - 1])"
                                >{{ xItem }}</v-btn
                              >
                            </v-col>
                          </v-row>
                        </v-list>
                      </v-menu>
                    </v-col>
                    <v-col v-else cols="auto text-blue-darken-1">
                      {{ number[i - 1]?.value ?? "" }}
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="px-10 d-flex justify-center">
              <v-card width="60%" height="300px">
                <v-card-text
                  v-if="logList.length"
                  class="overflow-y-auto"
                  style="max-height: 300px"
                >
                  <v-row v-for="(item, index) in logList" :key="index">
                    <v-col class="py-0" :class="item.class"
                      >{{ item.text }}
                      <v-btn
                        v-if="item.click"
                        variant="text"
                        class="text-overline text-decoration-underline"
                        @click="item.click"
                        >Başlat</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useMainStore } from "@/store/mainStore";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";

const mainStore = useMainStore();
const { createSudokuList, getRowDynamicClass, getColDynamicClass } = mainStore;
const { sudokuList, sudokuListTable, logList, sudokuLevel } =
  storeToRefs(mainStore);

const onAnswerClick = (
  answerValue: number,
  item: { value: number; isShow: boolean; isAnswerTrue: boolean }
) => {
  if (item.value === answerValue) {
    item.isAnswerTrue = true;
    logList.value.push({
      text: `DOĞRU BİLDİNİZ. => ${answerValue}`,
      class: "text-teal-darken-1 text-center text-overline",
    });
    const isFinished = !sudokuListTable.value.some(
      (e: { value: number; isShow: boolean; isAnswerTrue: boolean }[]) =>
        e.some(
          (element: {
            value: number;
            isShow: boolean;
            isAnswerTrue: boolean;
          }) => element.isAnswerTrue === false
        )
    );
    if (isFinished) {
      logList.value.push({
        text: `Sudokuyu Başarıyla Çözdünüz. Tekrar Oynamak İster Misiniz?`,
        class: "text-teal-darken-4 text-center text-h5",
        click: () => createSudokuList(),
      });
    }
  } else {
    logList.value.push({
      text: `YANLIŞ BİLDİNİZ. => ${answerValue}`,
      class: "text-red-darken-1 text-center text-overline",
    });
  }
};

const updateSudokuLevel = (value: number) => {
  sudokuLevel.value = value + 2
  logList.value.push({
    class: "text-grey-darken-1 text-center text-overline",
    text: `Seviye "${sudokuLevel.value === 3 ? "Zor" : sudokuLevel.value === 5 ? "Orta" : "Kolay"}" Olarak ayarlandı.`,
  });
}

const defaultListBeforeStarting = computed(() => {
  const returnList = []
  for (let i = 0; i < 8; i++) {
      returnList.push([])
  }
  return returnList
});
</script>
