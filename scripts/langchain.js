import { JsonOutputParser, StringOutputParser } from "@langchain/core/output_parsers";
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

export const callLLM = async (promptTemplate, modelConfig, responseFormat, currentTab) => {
    // let appState= useAppState()
    // // let memorizedCurrentTab=appState.value[saveIndex]
    // let currentTab = appState.value[saveIndex]
    currentTab.isLoading = true; // Set loading state to true

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
        currentTab.isLoading = false; // Reset loading state
    }
}
