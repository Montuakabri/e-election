import React, { useState } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import ModalClose from "@mui/joy/ModalClose";

const AddButton = ({ title, inputTitles, inputTypes, onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(
    inputTitles.reduce((acc, title, index) => {
      acc[title] = {
        type: inputTypes[index],
        value: "",
      };
      return acc;
    }, {})
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: { ...prevData[name], value },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formValues = Object.values(formData).map((field) => field.value);
    if (onSubmit) {
      onSubmit(formValues); // Pass an array of form values
    }
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        {title}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose onClose={() => setOpen(false)} />
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            Fill in the information
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {inputTitles.map((title, index) => (
                  <FormControl key={index}>
                    <FormLabel>{title}</FormLabel>
                    <Input
                      type={formData[title].type} // Access type from formData
                      autoFocus={index === 0}
                      value={formData[title].value}
                      onChange={handleInputChange}
                      name={title} // Use name attribute for easier form handling
                      required
                    />
                  </FormControl>
                ))}
                <Button type="submit">{title}</Button>
              </Stack>
            </form>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default AddButton;
