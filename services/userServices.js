export const addUserService = async (userData) => {
  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    return data; // send success/error back
  } catch (error) {
    console.error("Service error:", error);
    return { success: false, error: "Network error" };
  }
};
