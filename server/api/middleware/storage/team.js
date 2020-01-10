const multer = require("multer");
const path = require("path");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    keyFilename: path.join(__dirname, `../../config/${process.env.GCP_APPLICATIONS_KEYFILE}`),
});

// dev
storage.getBuckets()
// .then(buckets => console.log(buckets))
.catch(err => {
    console.log(err);
});

const getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;

exports.multer = multer({
    storage: multer.memoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB max size
    },
});

exports.uploadToGCP = (req, res, next) => {
    if (!req.file) {
        return next();
    }

    const bucketName = process.env.DEFAULT_BUCKET || "team-applications";
    const bucket = storage.bucket(bucketName);
    const gcloudFile = `${req.file.originalname}-${Date.now()}`;
    const file = bucket.file(gcloudFile);

    const stream = file.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
    });

    stream.on("error", err => {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on("finish", () => {
        req.file.cloudStorageObject = gcloudFile;

        return file.makePublic()
        .then(() => {
            req.file.gcloudUrl = getPublicUrl(bucketName, gcloudFile);
            next();
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        }); 
    });

    stream.end(req.file.buffer);
};