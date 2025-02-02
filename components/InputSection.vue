<template>
  <section 
    :class="
      viewOption === 'input'
        ? 'relative inset-0 bg-white p-6'
        : 'bg-white p-6 rounded-lg shadow-md'
    "
  >
    <h2 class="text-2xl font-bold mb-4">Input Section</h2>
    
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
const viewOption = useViewOption(); // Default to showing both sections

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


const convertToDoubleBraces=(input)=> {
    // Convert the input object to a JSON string
    let jsonString = JSON.stringify(input, null, 4);
    
    // Replace the single braces with double braces
    jsonString = jsonString.replace(/{/g, '{{').replace(/}/g, '}}');
    
    return jsonString;
}
// const submitPrompt = async () => {
//   // Parse variables into an object
//   const variablesObj = {};
//   variables.value.forEach((variable) => {
//     const trimmedName = variable.name.trim(); // Trim whitespace from variable name
//     if (trimmedName && variable.value) {
//       variablesObj[trimmedName] = convertToDoubleBraces(variable.value);
//     }
//   });

//   // Replace variables in the prompt
//   let formattedPrompt = prompt.value;
//   for (const [key, value] of Object.entries(variablesObj)) {
//     formattedPrompt = formattedPrompt.replace(new RegExp(`{${key}}`, "g"), value);
//   }







const submitPrompt = async () => {
  
  let saveIndex=selectedTabIndex.value
 
  let memorisedSelectedTab= appState.value[saveIndex]
 // Parse variables into an object
 const variablesObj = {};
 let variables=currentTab.value.variables
  variables.forEach((variable) => {
    const trimmedName = variable.name.trim(); // Trim whitespace from variable name
    if (trimmedName && variable.value) {
      variablesObj[trimmedName] = convertToDoubleBraces(variable.value);
    }
  });

  // Replace variables in the prompt
  let formattedPrompt = memorisedSelectedTab.prompt;
  for (const [key, value] of Object.entries(variablesObj)) {
    formattedPrompt = formattedPrompt.replace(new RegExp(`{${key}}`, "g"), value);
  }
  


  console.log(memorisedSelectedTab)
  // const formattedPrompt = memorisedSelectedTab.prompt; // Get prompt from current tab
  const responseFormat = memorisedSelectedTab.responseFormat; // Get response format from current tab
 
  try {
    const startTime = performance.now();
    let llmResponse = await callLLM(
      formattedPrompt,
      modelConfig.value,
      responseFormat, // Use currentTab's response format
      memorisedSelectedTab // Pass currentTab to manage loading state
    );
    const endTime = performance.now();
    memorisedSelectedTab.responseTime = ((endTime - startTime) / 1000).toFixed(3) + 's'; // Store response time in currentTab
    memorisedSelectedTab.response = memorisedSelectedTab.responseFormat == "json" ? JSON.stringify(llmResponse, null, 4) : llmResponse; // Store response in currentTab
  } catch (error) {
    memorisedSelectedTab.response = error; // Store error in currentTab
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


