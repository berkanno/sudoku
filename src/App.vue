<template>
  <v-app>
    <v-main>
      <v-card class="fill-height">
        <v-card-text>
          <v-row class="flex-column">
            <v-col>
              <v-btn @click="createSudokuList()">Başla</v-btn>
            </v-col>
            <v-col>
              <v-btn>Sıfırla</v-btn>
            </v-col>
            <!-- <v-col>
            {{ sudokuList }}
            </v-col> -->
            <v-col>
              <v-row v-for="number in sudokuList" :key="number">
                <v-col v-for="i in 10" :key="i">
                  {{ number[i-1] }}
                </v-col>
              </v-row>
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
const { createSudokuList } = mainStore;
const { sudokuList } = storeToRefs(mainStore);
</script>
