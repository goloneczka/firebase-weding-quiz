import { admin } from "../firebase.js";

const storage = admin.storage();

export const getRandomImageNameByBucket = async (bucketName, answersCount) => {
  const bucketPath = bucketName + "/";
  const treshold = 0.4 + (0.5 - answersCount * 0.1);
  if (Math.random() > treshold) return bucketPath;

  const fileNames = await getAllImageNamesByBucket(bucketName);
  const randomIndex = Math.floor(Math.random() * fileNames.length);
  return fileNames[randomIndex];
};

export const getAllImageNamesByBucket = async (bucketName) => {
  const bucketPath = bucketName + "/";
  const [files] = await storage.bucket().getFiles({ prefix: bucketPath });
  return files.map((f) => f.name).filter((name) => name !== bucketPath);
};
