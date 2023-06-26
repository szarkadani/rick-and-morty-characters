export const getStatusColor = (status: string): string => {
  if (status === "Alive") {
    return "green";
  } else if (status === "Dead") {
    return "red";
  } else {
    return "lightgray";
  }
};
