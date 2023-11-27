export async function useApi(resource, params) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/${resource}${params}`)
    .then((res) => res.json())
    .catch((e) => {
      throw new Error(e);
    });
}
