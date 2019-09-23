import React, { useState, useEffect, useRef } from 'react';
import CM from 'codemirror';
import 'codemirror/mode/jsx/jsx';
// import 'codemirror/keymap/vim';

export default function Editor({ value = '', onChange }) {
    const ref = useRef();
    const valueRef = useRef();
    const editorRef = useRef();
    useEffect(() => {
        const editor = CM(ref.current, {
            value: value,
            mode:  'jsx',
            theme: 'mdn-like',
            autofocus: true,
            lineWrapping: true,
            inputStyle: 'contenteditable',
            lineNumbers: true,
            gutters: ['CodeMirror-linenumbers', 'breakpoints'],
            // keyMap: 'vim',
        });

        editor.on('changes', () => {
            const code = editor.getValue();
            onChange(code);
            valueRef.current = code;
        });

        valueRef.current = value;
        editorRef.current = editor;
    }, []);

    useEffect(() => {
        if (valueRef.current !== value) {
            editorRef.current.setValue(value);
        }
    }, [value]);

    return (
        <div ref={ref} />
    );
}
