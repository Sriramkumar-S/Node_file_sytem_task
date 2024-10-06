import fs from 'fs'



export const createFiles = (folderpath, fileName, fileContent, callBack = () => { }) => {
    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath);
        fs.writeFile(`${folderpath}/${fileName}`, fileContent, () => {
            console.log(`File ${fileName} created successfully.`);
            callBack();
        });
    }
}

export const getFiles = (folderpath, successFn, errorFn) => {
    fs.readdir(folderpath, (err, files) => {
        if (err) {
            console.error('Error reading files:', err);
            errorFn(err);;
        } else {
            successFn(files);
        }
    });
}