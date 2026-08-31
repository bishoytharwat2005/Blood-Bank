import { useState } from "react";

function useContact() {
const [formData, setFormData] = useState({
name: "",
email: "",
subject: "",
message: "",
});

const [submitted, setSubmitted] = useState(false);

const handleChange = (e) => {
setFormData((prev) => ({
...prev,
[e.target.name]: e.target.value,
}));
};

const handleSubmit = (e) => {
e.preventDefault();

setSubmitted(true);

setFormData({
  name: "",
  email: "",
  subject: "",
  message: "",
});

setTimeout(() => {
  setSubmitted(false);
}, 4000);

};

return {
formData,
submitted,
handleChange,
handleSubmit,
};
}

export default useContact;
