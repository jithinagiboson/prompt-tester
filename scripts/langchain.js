import { JsonOutputParser, StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { Ollama } from "@langchain/ollama";
import { useLoadingState } from '../composables/states'; // Import loading state

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

export const callLLM = async (promptTemplate, modelConfig, responseFormat) => {
    const isLoading = useLoadingState(); // Get loading state
    isLoading.value = true; // Set loading state to true

    try {
        console.log(modelConfig);
        let llm = generateModel(modelConfig);
        let prompt = PromptTemplate.fromTemplate(promptTemplate);
        let parser = new StringOutputParser();
        
        if (responseFormat == 'json') {
            llm = generateModel({ ...modelConfig, format: 'json' });
            parser = new JsonOutputParser();
        }
        
        return await prompt.pipe(llm).pipe(parser).invoke(); // Use the user-defined prompt
    } finally {
        isLoading.value = false; // Reset loading state
    }
}
