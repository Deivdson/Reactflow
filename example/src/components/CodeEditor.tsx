import styled from "styled-components";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/themes/prism-dark.css";

const EditWrap = styled.div`
  background-color: whitesmoke;
  height: 10em;
  width: 20em;
`;

export default function CodeEditor(props: any) {
  return (
    <EditWrap>
      <Editor
        value={props.code}
        onValueChange={(code) => props.onChange(code)}
        highlight={(code) => highlight(code, languages.html)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12
        }}
      />
    </EditWrap>
  );
}
