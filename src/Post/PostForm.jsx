import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const PostForm = () => {
  const initialValues = {
    content: ''
  };

  const validationSchema = Yup.object({
    content: Yup.string().required('Required')
  });

  const onSubmit = (values, { resetForm }) => {
    console.log('Form data', values);
    resetForm();
  };

  return (
    
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">Create Post</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {formik => (
              <Form className="w-full">
                <div className="mb-4">
                  <Field
                    as="textarea"
                    id="content"
                    name="content"
                    placeholder="What's on your mind?"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Post
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
   
  );
};

export default PostForm;
