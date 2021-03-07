const yup = require("yup");
yup.addMethod(yup.object, "datevalidate", function (formats, parseStrict) {
  return this.test(function (value, originalValue) {
    const date = new Date(
      Date.parse(value.month + " " + value.day + ", " + value.year)
    );

    const isValidDate = Boolean(+date) && date.getDate() == value.day;
    console.log();
    return isValidDate
      ? value
      : this.createError({
          path: "Date",
          message: "Date invalid",
          params: value,
        });
  });
});
const schema = yup.object().shape({
  email: yup.string().email().required("No email provided."),
  password: yup
    .string()
    .required("No password provided.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_-])[A-Za-z\d@$!%*#?&_-]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  username: yup.string().required("No usernam provided."),
  birth_date: yup.object().datevalidate("Date is not valid."),
});

module.export = schema;
