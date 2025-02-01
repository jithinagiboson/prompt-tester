<template>
  <div id="app" class="bg-gray-100">
    <header class="relative top-0 left-0 w-full bg-blue-600 text-white p-4 shadow-md z-10">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">Prompt Testing GUI</h1>
        <div>
          <button @click="viewOption = 'input'" class="bg-blue-700 text-white px-4 py-2 rounded-lg">Input Section Only</button>
          <button @click="viewOption = 'output'" class="bg-blue-700 text-white px-4 py-2 rounded-lg ml-2">Output Section Only</button>
          <button @click="viewOption = 'both'" class="bg-blue-700 text-white px-4 py-2 rounded-lg ml-2">Both Sections</button>
        </div>
        <button @click="showPopup=!showPopup" class="bg-blue-700 text-white px-4 py-2 rounded-lg">
          <i class="fas fa-cog"></i> Settings
        </button>
        <button @click="addTab" class="bg-green-600 text-white px-4 py-2 rounded-lg ml-2">Add Tab</button>
      </div>
    </header>
    <main class="pt-20 container mx-auto">
  
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Select Tab</label>
        <div class="flex mb-2">
          <button
            v-for="(tab, index) in appState"
            :key="index"
            @click="selectedTabIndex = index"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
          >
            {{ tab.tabName }}
          </button>
        </div>
      </div>
      <div class="tab" v-if="viewOption === 'both'">
        <div class="flex">
          <InputSection class="flex-1" />
          <OutputSection class="flex-1"  />
        </div>
      </div>
      <InputSection v-if="viewOption === 'input'" />
      <OutputSection v-if="viewOption === 'output'"  />
    </main>

    <OllamaConfig v-if="showPopup" @closeConfig="toggleConfig" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useShowPopUp, useAppState, defaultAppstate, useSelectedTabIndex } from '../composables/states'; // Adjust the path as necessary
import InputSection from '../components/InputSection.vue';
import OutputSection from '../components/OutputSection.vue';

const showPopup = useShowPopUp();
const appState = useAppState();
const selectedTabIndex = useSelectedTabIndex(); // Track the selected tab index
const viewOption = ref('both'); // Default to showing both sections

const addTab = () => {
  let defaultValue=JSON.parse(JSON.stringify(defaultAppstate))
  defaultValue.tabName = `Tab ${appState.value.length + 1}`;
  appState.value.push(defaultValue);
};

// Initialize with one default tab

</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}

.flex {
  display: flex;
}

.flex-1 {
  flex: 1;
}
</style>
