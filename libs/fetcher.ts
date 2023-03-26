const fetcher = async () => {
  const res = await fetch("/api/getMessage");
  const data = await res.json();
  const message: Message[] = data.message;
  return message;
};

export default fetcher;
