export const fetchProfileInfo = async (id: number) => {
  try {
    const res = await fetch(`https://dummyjson.com/users/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch user with id ${id}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null; // or throw error again
  }
};
