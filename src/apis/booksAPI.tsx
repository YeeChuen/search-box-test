export const getBooks = async (input: string) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${input}&startIndex=0&maxResults=20`;
  const data = await fetch(url).then((res) => res.json());
  return data.items;
};
