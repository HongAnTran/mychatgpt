import React, { useRef, useEffect } from 'react';
import hljs from 'highlight.js';

import 'highlight.js/styles/default.css';

// eslint-disable-next-line react/prop-types
const CodeBlock = ({ language, code }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    // hljs.highlightBlock(codeRef.current);
    hljs.highlightElement(codeRef.current)
  }, []);

  return (
    <div style={{backgroundColor:'black' , padding:20}}>

    <pre>
      <code ref={codeRef} className={language + 'hljs-dark'} >
        {code}
      </code>
    </pre>
    </div>

  );
};

export default CodeBlock;