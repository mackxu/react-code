import InnerForm from "./Form";
import Item from "./Item";

type InnerFormProps = typeof InnerForm;

interface FormProps extends InnerFormProps {
  Item: typeof Item;
}

const Form = InnerForm as FormProps;
Form.Item = Item;

export default Form;
