<template>
  <section class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Input Section</h2>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2">Define Variables</label>
      <div v-for="(variable, index) in variables" :key="index" class="flex items-center mb-2">
        <input v-model="variable.name" type="text" class="flex-1 p-2 border rounded-lg" placeholder="Variable name">
        <textarea v-model="variable.value" class="flex-1 p-2 border rounded-lg ml-2" placeholder="Variable value"></textarea>
        <button @click="removeVariable(index)" class="text-red-500 hover:text-red-700 ml-2"><i class="fas fa-trash-alt">X</i></button>
      </div>
      <button @click="addVariable" class="mt-2 text-blue-500 hover:underline">+ Add Variable</button>
    </div>
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
</template>

<script setup>
import { ref } from 'vue';
import { callLLM } from '~/scripts/langchain';
const modelConfig = useModelConfig();
const response = useResponse();
const responseFormat = useResponseFormat();
const responseTime = useResponseTime();

const prompt = ref('');
const selectedHistory = ref('');
const promptHistory = ref(['Prompt 1', 'Prompt 2', 'Prompt 3']);
const variables = ref([]);




const addVariable = () => {
  variables.value.push({ name: '', value: '' });
};

const removeVariable = (index) => {
  variables.value.splice(index, 1);
};

const submitPrompt = async () => {
  // Parse variables into an object
  const variablesObj = {};
  variables.value.forEach(variable => {
    const trimmedName = variable.name.trim(); // Trim whitespace from variable name
    if (trimmedName && variable.value) {
      variablesObj[trimmedName] = variable.value;
    }
  });

  // Replace variables in the prompt
  let formattedPrompt = prompt.value;
  for (const [key, value] of Object.entries(variablesObj)) {
    formattedPrompt = formattedPrompt.replace(new RegExp(`{${key}}`, 'g'), value);
  }
  

  let llmRespsonse = await callLLM(formattedPrompt, modelConfig.value,responseFormat.value);
    if(responseFormat.value=="json")
    {
      response.value=JSON.stringify(llmRespsonse,null,4)
    }else{
      response.value=llmRespsonse
    }

};

</script>

<style scoped>
/* Add any specific styles for the InputSection component here */
</style>
