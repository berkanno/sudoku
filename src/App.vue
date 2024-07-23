<template>
  <v-app>
    <v-main>
      <v-card class="fill-height">
        <v-card-text>
          <v-row class="flex-column">
            <v-col class="d-flex justify-center" >
              <v-btn @click="createSudokuList()">Başla</v-btn>
            </v-col>
            <v-col class="px-10">
              <v-row v-for="(number,index) in sudokuListTable" :key="index" :class="getRowDynamicClass(index)" >
                <v-col v-for="(i, cIndex) in 9" :key="cIndex" class="pa-5 text-h6 d-flex align-center justify-center" :class="getColDynamicClass(cIndex)">
                  <v-row justify="center">
                  <v-col v-if="number[i-1].isShow" cols="auto">
                  {{  number[i-1].value }}
                  </v-col>
                    <v-col v-else cols="auto">
                    -
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col v-if="logList.length" cols="12" class="px-10 d-flex justify-center">
               <v-card  width="60%">
                  <v-card-text>
                      <v-row v-for="(item,index) in logList" :key="index">
                        <v-col :class="item.class" >{{ item.text }}</v-col>
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

const mainStore = useMainStore();
const { createSudokuList, getRowDynamicClass, getColDynamicClass } = mainStore;
const { sudokuList, sudokuListTable, logList} = storeToRefs(mainStore);
</script>
