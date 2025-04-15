export const getData = async () => {
    const res = await fetch("../data.json");
    const results = await res.json();

    return results;
};