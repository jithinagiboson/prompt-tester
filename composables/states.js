export const useShowPopUp = () => useState("showpopup", () => false);
export const useLoadingState = () => useState("isLoading", () => false);





export const useModelConfig=()=>useState('modelConfig',()=>ref({
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
    stopSequences: ''
    ,stream:false

  }))
export const useVariables = () => useState('variables', () => ref([]));  
export const useResponse = () => useState('response', () => 'default');
export const useResponseFormat = () => useState('responseFormat', () => 'json');
export const useResponseTime = () => useState('responseTime', () => '');
export const useViewOption = () => useState('viewOption', () => 'both');
export const usePrompt = () => useState('prompt', () => ref(''));


