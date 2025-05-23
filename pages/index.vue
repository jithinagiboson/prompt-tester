<template>
  <div id="app" class="bg-gray-100">
    <header class="relative top-0 left-0 w-full bg-blue-600 text-white p-4 shadow-md z-10">
      <div class=" mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">Prompt Testing GUI</h1>
        <div>
          <button @click="viewOption = 'input'" class="bg-blue-700 text-white px-4 py-2 rounded-lg">Input Section Only</button>
          <button @click="viewOption = 'output'" class="bg-blue-700 text-white px-4 py-2 rounded-lg ml-2">Output Section Only</button>
          <button @click="viewOption = 'both'" class="bg-blue-700 text-white px-4 py-2 rounded-lg ml-2">Both Sections</button>
        </div>
        <button @click="showPopup=!showPopup" class="bg-blue-700 text-white px-4 py-2 rounded-lg">
          <i class="fas fa-cog"></i> Settings
        </button>
        <button @click="addTab" class="bg-green-600 text-white px-4 py-2 rounded-lg ml-2">
          <i class="fas fa-plus"></i> Add Tab
        </button>
      </div>
    </header>
    <main class="pt-5  mx-auto">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Select Tab</label>
        <div class="flex mb-2 overflow-x-auto">
          <div v-for="(tab, index) in appState" :key="index" class="relative flex items-center mb-2">
            <div :class="['flex items-center rounded-lg px-3 py-1 mr-2 border', selectedTabIndex === index ? 'bg-blue-200 border-blue-400' : 'bg-green-200 border-green-400']">
              <div v-if="tab?.isLoading">
                <div class="spinner h-4 w-4 md:h-6 md:w-6 animate-spin border-2 border-t-transparent border-gray-300 rounded-full"></div>
              </div>
              <input v-model="tab.tabName" @click="selectedTabIndex=index" class="text-black border  px-2 py-1" :class="[selectedTabIndex==index?'bg-blue-200 border-blue-400':'bg-green-200 rounded-lg']" />
              <button @click="removeTab(index)" class="ml-2 text-red-600 opacity-0 hover:opacity-100 transition duration-200">
                <i class="fas fa-times"></i> <!-- Remove icon -->
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="tab" v-if="viewOption === 'both'">
        <div class="flex">
          <InputSection class="flex-1" />
          <OutputSection class="flex-1"  />
        </div>
      </div>
<InputSection v-if="viewOption === 'input' && appState.length > 0" />
      <OutputSection v-if="viewOption === 'output'"  />
    </main>

    <ModelConfig v-if="showPopup"  />
    <DeleteConfirmationPopup 
      v-if="showDeleteConfirmation" 
      :onConfirm="confirmDeleteTab" 
      :onCancel="() => { showDeleteConfirmation = false; }" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useShowPopUp, useAppState, defaultAppstate, useSelectedTabIndex } from '../composables/states'; // Adjust the path as necessary
import InputSection from '../components/InputSection.vue';
import OutputSection from '../components/OutputSection.vue';

const showPopup = useShowPopUp(); // Use global popup state
const appState = useAppState();
const selectedTabIndex = useSelectedTabIndex(); // Track the selected tab index

const viewOption = useViewOption(); // Default to showing both sections

const addTab = () => {
  let defaultValue = JSON.parse(JSON.stringify(defaultAppstate));
  defaultValue.tabName = `Tab ${appState.value.length + 1}`;
  appState.value.push(defaultValue);
};

const showDeleteConfirmation = ref(false);
const tabToDelete = ref(null);

const confirmDeleteTab = () => {
  if (tabToDelete.value !== null) {
    appState.value.splice(tabToDelete.value, 1);
    tabToDelete.value = null;
  }
  showDeleteConfirmation.value = false;
};

const removeTab = (index) => {
  tabToDelete.value = index;
  showDeleteConfirmation.value = true;
};

const editTab = (index) => {
  // Logic to handle editing the tab name can be added here if needed
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

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;

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
