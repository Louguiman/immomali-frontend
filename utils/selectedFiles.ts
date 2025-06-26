// get multipe images
export default function selectedFiles(
  e: React.ChangeEvent<HTMLInputElement> | Event | null
): File[] | false {
  if (e) {
    const store: File[] = [];
    const files = (e.target as HTMLInputElement).files;
    if (!files) return false;
    for (let x = 0; x < files.length; x++) {
      store.push(files[x]);
    }
    return store;
  }
  return false;
}
