export const makeNewMove = ({ newPositions }: { newPositions: string[][] }) => {
  return {
    type: "NEW_MOVE",
    payload: { newPositions },
  };
};
