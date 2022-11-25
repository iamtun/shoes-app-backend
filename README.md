# Run Project
- create file config.env
```
    PORT=...
    MONGODB_URI=...

    CLOUDINARY_NAME= ...
    CLOUDINARY_KEY= ...
    CLOUDINARY_SECRET= ...
```

# 1. install libraries

-   `npm i dependency-name` -> dependency
-   `npm i -D dependency-name` -> devDependency

# 2. steps

-   init models
-   init controllers
-   init routers
-   config app
-   start

# 3. use cloudinary
-   sign up
-   add config with type nodejs to env
-   install libraries: ` npm install cloudinary multer multer-storage-cloudinary`
-   config:

    ```js
    import cloudinary from "cloudinary";
    import { CloudinaryStorage } from "multer-storage-cloudinary";
    import multer from "multer";

    cloudinary.v2;

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
    });

    const storage = new CloudinaryStorage({
        cloudinary,
        allowedFormats: ["jpg", "png"],
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    });

    const uploadCloud = multer({ storage });

    export default { uploadCloud, cloudinary };
    ```

-   router: use middleware to pare file

    ```js
    router
        .route("/")
        .post(
            uploadCloud.uploadCloud.array("files", 5),
            ProductController.createProduct
        );
    ```

-   controller: get files pared to upload

    ```js
    const files = req.files;
    const linkImages = [];
    for (const file of files) {
        const result = await uploadCloud.cloudinary.uploader.upload(file.path);
        linkImages.push(result.url);
    }
    ```
