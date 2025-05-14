export const useShowPopUp = () => useState("showpopup", () => false);
export const useLoadingState = () => useState("isLoading", () => false);

export const useModelConfig = () => useState('modelConfig', () => ref({
    provider: 'ollama', // 'ollama' or 'openai'
    // Ollama fields
    model: 'phi4:4k',
    baseUrl: 'https://ie3ukzqc9wrws5-11434.proxy.runpod.net',
    temperature: 0,
    maxRetries: 2,
    seed: 41,
    keepAlive: '-1m',
    numContext: 2048,
    topK: 100,
    numPredict: 1000,
    verbose: false,
    stopSequences: '',
    stream: false,
    // OpenAI fields
    openAIApiKey: "",

    openAIModel: 'gpt-3.5-turbo',
    openAITemperature: 0.7,
    openAIMaxTokens: 1024
}));

const defaultAppstateValue = {
    tabName: 'Tab 1',
    variables: [],
    prompt: '',
    response: '',
    responseFormat: 'json',
    responseTime: '',
    isLoading: false
};

export const defaultAppstate = defaultAppstateValue;
export const useAppState = () => useState('appState', () => ref([defaultAppstateValue])); // Initialize with one default tab

export const useSelectedTabIndex = () => useState('selectedTabIndex', () => ref(0)); // Track the selected tab index

export const useVariables = () => useState('variables', () => ref([]));  
export const useResponse = () => useState('response', () => 'default');
export const useResponseFormat = () => useState('responseFormat', () => 'json');
export const useResponseTime = () => useState('responseTime', () => '');
export const useViewOption = () => useState('viewOption', () => 'both');
export const usePrompt = () => useState('prompt', () => ref(''));
