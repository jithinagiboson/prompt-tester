<template>
  <div id="app" class="bg-gray-100">
    <header class="fixed top-0 left-0 w-full bg-blue-600 text-white p-4 shadow-md z-10">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">Prompt Testing GUI</h1>
        <button @click="showPopup=!showPopup" class="bg-blue-700 text-white px-4 py-2 rounded-lg">
          <i class="fas fa-cog"></i> Settings
        </button>
      </div>
    </header>
    <main class="pt-20 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      <section class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4">Input Section</h2>
        <div class="mb-4">
          <label for="prompt" class="block text-gray-700 font-bold mb-2">Enter Your Prompt</label>
          <textarea id="prompt" v-model="prompt" class="w-full p-2 border rounded-lg" rows="5"></textarea>
        </div>
        <div class="mb-4">
          <label for="history" class="block text-gray-700 font-bold mb-2">Select Previous Prompt</label>
          <select id="history" v-model="selectedHistory" class="w-full p-2 border rounded-lg">
            <option v-for="item in promptHistory" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
        <div class="mb-4">
          <button @click="submitPrompt" class="bg-green-600 text-white px-4 py-2 rounded-lg">Submit Prompt</button>
        </div>
      </section>
      <section class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4">Output Section</h2>
        <div class="mb-4">
          <label for="response" class="block text-gray-700 font-bold mb-2">AI Response</label>
          <textarea id="response" v-model="response" class="w-full p-2 border rounded-lg" rows="10"></textarea>
        </div>
        <div class="mb-4">
          <label for="format" class="block text-gray-700 font-bold mb-2">Response Format</label>
          <select id="format" v-model="responseFormat" class="w-full p-2 border rounded-lg">
            <option value="json">JSON</option>
            <option value="text">Plain Text</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="responseTime" class="block text-gray-700 font-bold mb-2">Response Time</label>
          <input id="responseTime" v-model="responseTime" type="text" class="w-full p-2 border rounded-lg" readonly>
        </div>
        <div class="mb-4">
          <button @click="exportResults" class="bg-blue-600 text-white px-4 py-2 rounded-lg">Export Results</button>
        </div>
      </section>
    </main>

    <OllamaConfig v-if="showPopup" @closeConfig="toggleConfig" />

    <!-- Models List Section -->
    <div class="bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 class="text-2xl font-bold mb-4">Available Models</h2>
      <ul>
        <li v-for="model in models" :key="model.digest" class="border-b py-2">
          <strong>Name:</strong> {{ model.name }}<br>
          <strong>Size:</strong> {{ model.size }} bytes<br>
          <strong>Modified At:</strong> {{ model.modified_at }}<br>
          <strong>Family:</strong> {{ model.details.family }}<br>
          <strong>Parameter Size:</strong> {{ model.details.parameter_size }}<br>
          <strong>Quantization Level:</strong> {{ model.details.quantization_level }}<br>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useShowPopUp } from '../composables/states'; // Adjust the path as necessary
const showPopup = useShowPopUp();
const prompt = ref('');
const selectedHistory = ref('');
const promptHistory = ref(['Prompt 1', 'Prompt 2', 'Prompt 3']);
const response = ref('');
const responseFormat = ref('json');
const responseTime = ref('');
const models = ref([]); // Define models variable

const submitPrompt = () => {
  // Logic to handle the prompt submission
  alert(`Prompt submitted: ${prompt.value}`);
};

const exportResults = () => {
  alert('Results exported!');
};
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}
</style>
