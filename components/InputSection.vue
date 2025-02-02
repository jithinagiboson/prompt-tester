<template>
  <section
    :class="
      viewOption === 'input'
        ? 'relative inset-0 bg-white p-6'
        : 'bg-white p-6 rounded-lg shadow-md'
    "
  >
    <h2 class="text-2xl font-bold mb-4">Input Section</h2>
    <div v-if="currentTab?.isLoading"><div class="spinner"></div></div>
    <div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Define Variables</label>
        <div
          v-for="(variable, index) in currentTab.variables"
          :key="index"
          class="flex items-center mb-2"
        >
          <input
            v-model="variable.name"
            type="text"
            class="flex-1 p-2 border rounded-lg"
            placeholder="Variable name"
          />
          <textarea
            v-model="variable.value"
            class="flex-1 p-2 border rounded-lg ml-2"
            placeholder="Variable value"
          ></textarea>
          <button
            @click="removeVariable(index)"
            class="text-red-500 hover:text-red-700 ml-2"
          >
            <i class="fas fa-trash-alt">X</i>
          </button>
        </div>
        <button @click="addVariable" class="mt-2 text-blue-500 hover:underline">
          + Add Variable
        </button>
      </div>
      <div class="mb-4">
        <label for="prompt" class="block text-gray-700 font-bold mb-2">Enter Your Prompt</label>
        <textarea
          id="prompt"
          v-model="currentTab.prompt"
          class="w-full p-2 border rounded-lg"
          rows="5"
        ></textarea>
      </div>
      <div class="mb-4">
        <button
          @click="submitPrompt"
          class="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Submit Prompt
        </button>
      </div>
    
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { callLLM } from "~/scripts/langchain";
const modelConfig = useModelConfig();
const appState = useAppState(); // Access global app state
const selectedTabIndex = useSelectedTabIndex(); // Track the selected tab index

const currentTab = computed(() => appState.value[selectedTabIndex.value]); // Reactive computed property for current tab

const addVariable = () => {
  currentTab.value.variables.push({ name: "", value: "" }); // Use current tab for variables
};

const removeVariable = (index) => {
  currentTab.value.variables.splice(index, 1);
};

const addTab = () => {
  appState.value.push({ name: "New Tab", variables: [], prompt: '' }); // Add new tab with default values
};

const removeTab = (index) => {
  appState.value.splice(index, 1); // Remove tab
};

const submitPrompt = async () => {
  const formattedPrompt = currentTab.value.prompt; // Get prompt from current tab

  try {
    const startTime = performance.now();
    let llmResponse = await callLLM(
      formattedPrompt,
      modelConfig.value,
      currentTab.value.responseFormat, // Use currentTab's response format
      currentTab.value // Pass currentTab to manage loading state
    );
    const endTime = performance.now();
    currentTab.value.responseTime = ((endTime - startTime) / 1000).toFixed(3) + 's'; // Store response time in currentTab
    currentTab.value.response = currentTab.value.responseFormat == "json" ? JSON.stringify(llmResponse, null, 4) : llmResponse; // Store response in currentTab
  } catch (error) {
    currentTab.value.response = error; // Store error in currentTab
  }
};

// Add keydown event listener for Ctrl + Enter
const handleKeydown = (event) => {
  if (event.ctrlKey && event.key === 'Enter') {
    submitPrompt();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});
</script>

<style>
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
