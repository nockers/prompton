import { getStorage, ref, uploadBytes } from "firebase/storage"
import { createDocId } from "interface/utils/createDocId"

export const useFileUpload = () => {
  const uploadFile = async (file: File) => {
    const docId = createDocId()
    const storage = getStorage()
    const storageRef = ref(storage, docId)
    await uploadBytes(storageRef, file)
    return docId
  }

  return [uploadFile] as const
}
