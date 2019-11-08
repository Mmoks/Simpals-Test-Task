import React from "react";
import styled, { css } from "styled-components";
import useForm from "react-hook-form";

const Button = styled.button`
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  ${({ primary }) =>
    primary &&
    css`
      color: #fff;
      background-color: #007bff;
      border-color: #007bff;
    `}
`;
const Form = styled.form`
  ${({ centerElements }) =>
    centerElements &&
    css`
      margin: 0 auto;
    `}
    &:hover ${Button} {
      background-color: #0573e8;
      border-color: #0573e8;
    }
`;
const ErrorMessage = styled.span`
  color: red;
  display: block;
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 11px;
`;
const invalidTagsError =
  "Введите как минимум два тега разделенных через запятую";

const ContentForm = ({ addNewArticle }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data, e) => {
    addNewArticle(data);
    e.target.reset();
  };

  const validateTags = tags => {
    const tagsArray = tags.split(",");
    return (
      tagsArray.filter(tag => !!tag.trim()).length >= 2 || invalidTagsError
    );
  };

  const checkForDublicates = tags => {
    const sortedTags = tags.split(",").sort();
    const dublicated = sortedTags.filter(
      (tag, index) =>
        sortedTags[index + 1] && tag.trim() === sortedTags[index + 1].trim()
    );
    return !dublicated.length
      ? true
      : `Вы ввели один или более  повторящихся тегов: ${dublicated
          .reverse()
          .join(",")}`;
  };

  return (
    <Form
      id="post-add"
      className="col-lg-4"
      centerElements
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={"form-group " + (errors.title ? "has-error" : "")}>
        <input
          type="text"
          className="form-control"
          name="title"
          placeholder="заголовок"
          ref={register({ required: true })}
        />
        {errors.title && (
          <ErrorMessage className="help-block">
            Это поле обязательное
          </ErrorMessage>
        )}
      </div>
      <div className={"form-group " + (errors.body ? "has-error" : "")}>
        <input
          type="text"
          className="form-control"
          name="body"
          placeholder="запись"
          ref={register({ required: true })}
        />
        {errors.body && (
          <ErrorMessage className="help-block">
            Это поле обязательное
          </ErrorMessage>
        )}
      </div>
      <div className={"form-group " + (errors.tags ? "has-error" : "")}>
        <input
          type="text"
          className="form-control"
          name="tags"
          placeholder="тег, еще тег"
          ref={register({
            validate: tags => validateTags(tags) && checkForDublicates(tags)
          })}
        />
        {errors.tags && (
          <ErrorMessage className="help-block">
            {errors.tags.message}
          </ErrorMessage>
        )}
      </div>
      <Button type="submit" primary>
        Добавить
      </Button>
    </Form>
  );
};

export default ContentForm;
