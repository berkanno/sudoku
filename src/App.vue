<template>
  <v-app>
    <v-main>
      <v-card class="fill-height">
        <v-card-text>
          <v-row class="flex-column">
            <v-col class="d-flex justify-center">
              <v-btn @click="createSudokuList()">Başla</v-btn>
            </v-col>
            <v-col class="px-10">
              <v-row
                v-for="(number, index) in sudokuListTable"
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
                    <v-col v-if="number[i - 1].isShow" cols="auto text-grey-darken-2">
                      {{ number[i - 1].value }}
                    </v-col>
                    <v-col
                      v-else-if="
                        !number[i - 1].isShow && !number[i - 1].isAnswerTrue
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
                      {{ number[i - 1].value }}
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              v-if="logList.length"
              cols="12"
              class="px-10 d-flex justify-center"
            >
              <v-card width="60%">
                <v-card-text class="overflow-y-auto" style="max-height: 300px">
                  <v-row v-for="(item, index) in logList" :key="index">
                    <v-col class="py-0" :class="item.class">{{
                      item.text
                    }}</v-col>
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
import { ref } from "vue"

const mainStore = useMainStore();
const { createSudokuList, getRowDynamicClass, getColDynamicClass } = mainStore;
const { sudokuList, sudokuListTable, logList } = storeToRefs(mainStore);

const isFinishedDialog = ref(false)

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
    isFinishedDialog.value = !sudokuListTable.value.some(
      (e: { value: number; isShow: boolean; isAnswerTrue: boolean }[]) =>
        e.some(
          (element: {
            value: number;
            isShow: boolean;
            isAnswerTrue: boolean;
          }) => element.isAnswerTrue === false
        )
    );
  } else {
    logList.value.push({
      text: `YANLIŞ BİLDİNİZ. => ${answerValue}`,
      class: "text-red-darken-1 text-center text-overline",
    });
  }
};
</script>
