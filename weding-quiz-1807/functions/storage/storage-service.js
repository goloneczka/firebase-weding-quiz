import { admin } from "../firebase.js";

const storage = admin.storage();

export const getRandomImageNameByBucket = async (bucketName) => {
  const bucketPath = bucketName + "/";
  if (Math.random() < 0.6) return bucketPath;

  const [files] = await storage.bucket().getFiles({ prefix: bucketPath });
  const fileNames = files.map((f) => f.name).filter((name) => name !== bucketPath);
  const randomIndex = Math.floor(Math.random() * fileNames.length);
  return fileNames[randomIndex];
};
