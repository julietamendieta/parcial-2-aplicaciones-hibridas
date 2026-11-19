import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDirectory = 'uploads/profiles';

if(!fs.existsSync(uploadDirectory)){
    fs.mkdirSync(uploadDirectory, {recursive: true});
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory)
    },
    filename: (req, file, cb) =>{
        const extension = path.extname(file.originalname);
        const { employee }= req;
        const fileName = `employee-${employee.id}-${extension}`;
        //Modificar el nombre
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(new Error('Formato de archivo no permitido.'), false);
    }
};

const upload = multer({ 
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

export default upload;