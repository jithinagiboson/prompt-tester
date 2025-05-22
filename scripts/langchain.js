import { JsonOutputParser, StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { Ollama } from "@langchain/ollama";
import { OpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// Define or import the config object
const config = {
    url: 'https://cm80i43mel2dut-11434.proxy.runpod.net/',
    model: "ph4:4k",
    temperature: 0,
    maxRetries: 2,
    openAIApiKey: "",
    // other params...
};

const generateModel = (modelConfig) => {
    if (modelConfig.provider === 'openai') {
        return new OpenAI({
            apiKey: modelConfig.openAIApiKey || config.openAIApiKey,
            model: modelConfig.openAIModel,
            temperature: modelConfig.openAITemperature,
            maxTokens: modelConfig.openAIMaxTokens
        });
    } else if (modelConfig.provider === 'google') {
        return new ChatGoogleGenerativeAI({
            model: modelConfig.googleModel,
            temperature: modelConfig.googleTemperature,
            maxOutputTokens: modelConfig.googleMaxOutputTokens,
            apiKey: modelConfig.googleApiKey
        });
    } else {
        return new Ollama(modelConfig);
    }
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
            if (modelConfig.provider === 'google') {
                llm = generateModel({ ...modelConfig, json: true });
            } else {
                llm = generateModel({ ...modelConfig, format: 'json' });
            }
            parser = new JsonOutputParser();
        }
        
        return await prompt.pipe(llm).pipe(parser).invoke(); // Use the user-defined prompt
    } finally {
        currentTab.isLoading = false; // Reset loading state
    }
}
