import { PromptTemplate } from "@langchain/core/prompts";

// Define or import the config object
const config = {
    url: 'https://cm80i43mel2dut-11434.proxy.runpod.net/',
    model: "ph4:4k",
    temperature: 0,
    maxRetries: 2,
    // other params...
};

const llm = new Ollama({
    baseUrl: config.url,
    model: config.model,
    temperature: config.temperature,
    maxRetries: config.maxRetries,
    // other params...
});



const generateModel = (modelConfig) => {
    let llm = new Ollama(modelConfig);
    return llm;
}

export const callLLM = async (promptTemplate, modelConfig) => {
    llm = generateModel(modelConfig);
    let prompt = PromptTemplate.fromTemplate(promptTemplate);
    return prompt.pipe(llm).invoke();
}

// Wrap the invocation in an async function
const run = async () => {
    const result = await callLLM("1+2", config);
    console.log(result);
};

run();
