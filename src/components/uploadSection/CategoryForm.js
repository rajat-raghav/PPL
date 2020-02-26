import React from 'react';
import PropTypes from 'prop-types';

const CategoryForm = props => {
  const { categoryUploadHandler } = props;
  return (
    <div>
      <form onSubmit={categoryUploadHandler}>
        <input type="text" name="newcategory" required />
        <input type="submit" name="submit" />
      </form>
    </div>
  );
};
CategoryForm.propTypes = {
  categoryUploadHandler: PropTypes.func
};

export default CategoryForm;