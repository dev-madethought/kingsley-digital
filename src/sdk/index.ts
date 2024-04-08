export const getSteps = async () =>
  fetch("/api/nodes", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((e) => e.json())
