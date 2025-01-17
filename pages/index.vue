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
      </div>
    </header>
<main :class="viewOption === 'input' || viewOption === 'output' ? 'relative inset-0 z-0' : 'pt-20 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4'">
      <InputSection v-if="viewOption === 'input'" />
      <OutputSection v-if="viewOption === 'output'" :response="response" :responseFormat="responseFormat" :responseTime="responseTime" />
      <InputSection v-if="viewOption === 'both'" />
      <OutputSection v-if="viewOption === 'both'" :response="response" :responseFormat="responseFormat" :responseTime="responseTime" />
    </main>

    <OllamaConfig v-if="showPopup" @closeConfig="toggleConfig" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useShowPopUp } from '../composables/states'; // Adjust the path as necessary
import { callLLM } from '~/scripts/langchain';
import InputSection from '../components/InputSection.vue'; // Import the new InputSection component

const showPopup = useShowPopUp();
const modelConfig = useModelConfig();
const response = useResponse();
const responseFormat = useResponseFormat();
const responseTime = useResponseTime();
const viewOption = useViewOption() // Default to show both sections
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}
</style>
