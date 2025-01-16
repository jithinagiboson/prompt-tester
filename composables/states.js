// export const useShowPopUp= useState("showpopup",()=>false)


// import { useState } from 'nuxt/app';

export const useShowPopUp = () => useState("showpopup", () => false);
export const useModelConfig=()=>useState('modelConfig',()=>ref({
    model: '',
    url: 'https://cm80i43mel2dut-11434.proxy.runpod.net',
    temperature: 0,
    maxRetries: 2,
    seed: 41,
    keepAlive: '-1m',
    numContext: 2048,
    topK: 100,
    numPredict: 1000,
    verbose: false,
    stopSequences: ''
  }))