import yaml from "js-yaml";

const loadConfig = async () => {
  try {
    const response = await fetch("/config.yml");
    const text = await response.text();
    return yaml.load(text);
  } catch (error) {
    console.error("Failed to load config.yml:", error);
    return {};
  }
};

export default loadConfig;
