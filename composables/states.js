// export const useShowPopUp= useState("showpopup",()=>false)


// import { useState } from 'nuxt/app';

export const useShowPopUp = () => useState("showpopup", () => false);
export const useModelConfig=()=>useState('modelConfig',()=>ref({
    model: 'phi4:4k',
    baseUrl: 'https://2sdy5yq6l56pes-11434.proxy.runpod.net',
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
    ,format:'json'
  }))
export const useResponse = () => useState('response', () => 'default');
export const useResponseFormat = () => useState('responseFormat', () => 'json');
export const useResponseTime = () => useState('responseTime', () => '');