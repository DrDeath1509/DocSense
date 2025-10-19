const SSL = "http";
const PORT = "3000";
const DOMAIN = "192.168.0.101";

const Server = SSL + "://" + DOMAIN + ":" + PORT;

const APIs = Server + "/" + "api";

export const URL_Grammar = APIs + "/" + "grammar";
export const URL_Summarize = APIs + "/" + "summarize";