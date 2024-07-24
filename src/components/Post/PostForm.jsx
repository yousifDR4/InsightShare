import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Happines from "../../UI/Happines";

const PostForm = () => {
  const initialValues = {
    content: "",
  };

  const validationSchema = Yup.object({
    content: Yup.string()
      .required("Required")
      .test(
        "is-not-only-whitespace",
        "Content must be at least 1 non-whitespace character long",
        function (value) {
          return value && value.trim().length > 0;
        }
      )
      .default(""), // Providing a default value as an empty string
  });

  const onSubmit = (values, { resetForm }) => {
    console.log("Form data", values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form className="w-full pt-3">
          <div className="mb-4">
            {console.log(formik)}
            <Field
              as="textarea"
              id="content"
              name="content"
              placeholder="What's on your mind?"
              className="resize-none h-36 outline-none w-full p-2 px-4 border-t border-gray-300 d focus:outline-none "
            />
          </div>
          <div className="flex px-4 w-full py-3">
            {" "}
            <span className="w-20">
              <Happines />
            </span>{" "}
          </div>

          <div className="flex px-4 py-4">
            <button
              disabled={!formik.values.content}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 w-full rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600"
            >
              Post
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;
