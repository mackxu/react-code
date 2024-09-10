import { useRef } from "react";
import Form from "./Form";
import { Button, Checkbox, Input } from "antd";
import { FormRefApi } from "./Form/Form";

function App() {
  const form = useRef<FormRefApi>(null);
  const onFinish = (values: Record<string, any>) => {
    console.log(values);
  };
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          console.log(form.current?.getFieldsValue());
        }}
      >
        打印表单值
      </Button>

      <Button
        type="primary"
        onClick={() => {
          form.current?.setFieldsValue({
            username: "东东东",
          });
        }}
      >
        设置表单值
      </Button>
      <h1>表单组件</h1>
      <Form
        ref={form}
        initialValues={{ remember: true, username: "zhangsan" }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[
            { required: true, message: "请输入用户名!" },
            { max: 6, message: "长度不能大于 6" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>记住我</Checkbox>
        </Form.Item>
        <Form.Item>
          <div>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
}

export default App;
