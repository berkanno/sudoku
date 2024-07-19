<template>
  <v-app>
    <v-main>
      <v-card class="fill-height" >
        <v-card-text>
          <v-row class="flex-column" >
            <v-col>
               <v-btn @click="createSudokuList()" >Başla</v-btn>
            </v-col>
            <v-col>
               <v-btn>Sıfırla</v-btn>
            </v-col>
            <v-col>

            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useMainStore } from "@/store/mainStore"
const mainStore = useMainStore()
const { createSudokuList } = mainStore
</script>
