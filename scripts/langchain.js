import { PromptTemplate } from "@langchain/core/prompts";
import { Ollama } from "@langchain/ollama";

// Define or import the config object
const config = {
    url: 'https://cm80i43mel2dut-11434.proxy.runpod.net/',
    model: "ph4:4k",
    temperature: 0,
    maxRetries: 2,
    // other params...
};

const generateModel = (modelConfig) => {
    let llm = new Ollama(modelConfig);
    return llm;
}

export const callLLM = async (promptTemplate, modelConfig) => {
    console.log(modelConfig);
    let llm = generateModel(modelConfig);
    let prompt = PromptTemplate.fromTemplate(promptTemplate);
    return prompt.pipe(llm).invoke(promptTemplate); // Use the user-defined prompt
}


