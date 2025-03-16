export const useColorGenerator = (createdBy: number) => {
    const hash = (createdBy * 2654435761) % 360;
    const h = (hash + 137) % 360;
    return `hsl(${h}, 70%, 50%)`;
};