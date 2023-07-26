import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const routes = ["./server.js"];

// swaggerAutogen(outputFile, routes);

const doc = {
    host: "", // by default: 'localhost:3000'
    basePath: "", // by default: '/'
};

swaggerAutogen()(outputFile, routes, doc);
