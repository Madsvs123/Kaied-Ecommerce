import {
  Box,
  useTheme,
  TextField,
  Button,
  Typography,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const validationSchema = yup.object().shape({
  name: yup.string().max(30).required("category name required"),
  description: yup.string().max(200, "too long"),
});

const initialValues = {
  name: "",
  description: "",
};

const AddCategory = () => {
  const { palette } = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const data = JSON.stringify(values);
      await axios
        .post("http://localhost:3001/category/add", data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  });

  return (
    <Box component={Paper} p="1rem" width={isNonMobileScreen ? "50%" : "100%"}>
      <Box mb="1rem">
        <Typography
          variant="h2"
          fontWeight={500}
          sx={{ color: palette.neutral.dark }}
        >
          Add Category
        </Typography>
      </Box>
      <Box>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="name"
            value={values.name}
            onChange={handleChange}
            fullWidth
            sx={{ mb: "1rem" }}
            error={Boolean(errors.name) && touched.name}
            helperText={touched.name && errors.name}
          />
          <TextField
            name="description"
            label="Description"
            value={values.description}
            fullWidth
            onChange={handleChange}
            sx={{ mb: "1rem" }}
            multiline={true}
            rows={6}
            error={Boolean(errors.description) && touched.description}
            helperText={touched.description && errors.description}
          />
          <Button variant="contained" fullWidth type="submit" size="large">
            Add
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddCategory;
