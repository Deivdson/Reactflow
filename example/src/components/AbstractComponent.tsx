import { Card, H5 } from "@blueprintjs/core";

export default function AbstractComponent(props: any) {
  return (
    <Card elevation={4}>
      <H5>{props.title}</H5>
      {props.children}
    </Card>
  );
}
