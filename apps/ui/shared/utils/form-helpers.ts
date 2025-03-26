export const requiredRule = { required: { value: true, message: "This field is required" } };
export const emailRule = {
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email address",
  },
};
