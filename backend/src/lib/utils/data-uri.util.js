import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    const perser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return perser.format(extName, file.buffer);
};

export default getDataUri;
