"use client";

import { useEffect, useRef, useState } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const toolbarButtonClass = "rounded border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500";

function normalizeHtml(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("a").forEach((link) => {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.style.setProperty("color", "blue", "important");
  });
  return doc.body.innerHTML.replace(/<br\s*\/?>/gi, "<br />");
}

export default function RichTextEditor({ value, onChange, className = "", placeholder = "Write section content..." }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [sourceMode, setSourceMode] = useState(false);
  const [htmlValue, setHtmlValue] = useState(value);
  const lastEditorValueRef = useRef(value);

  const publishEditorValue = (nextValue: string) => {
    const serializedValue = nextValue.replace(/<br\s*\/?>/gi, "<br />");
    lastEditorValueRef.current = serializedValue;
    onChange(serializedValue);
  };

  useEffect(() => {
    // Normalize existing links in the browser, never during server rendering.
    const normalizedValue = sourceMode ? value : normalizeHtml(value);
    if (normalizedValue !== value) {
      if (!sourceMode && editorRef.current) editorRef.current.innerHTML = normalizedValue;
      lastEditorValueRef.current = normalizedValue;
      onChange(normalizedValue);
      return;
    }

    // Parent updates from this editor should not rewrite contentEditable, which
    // would reset the browser caret. Only apply values that came from elsewhere.
    if (!sourceMode && value !== lastEditorValueRef.current && editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
    lastEditorValueRef.current = value;
  }, [value, sourceMode, onChange]);

  const applyCommand = (command: string, argument?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, argument);
    if (editorRef.current) publishEditorValue(editorRef.current.innerHTML);
  };

  const insertLineBreak = () => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();

    const selection = window.getSelection();
    if (selection?.rangeCount && selection.anchorNode && editor.contains(selection.anchorNode)) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const lineBreak = document.createElement("br");
      range.insertNode(lineBreak);
      range.setStartAfter(lineBreak);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      editor.append(document.createElement("br"));
    }

    publishEditorValue(editor.innerHTML);
  };

  const insertLink = () => {
    const editor = editorRef.current;
    const selection = window.getSelection();
    const savedRange = selection?.rangeCount ? selection.getRangeAt(0).cloneRange() : null;
    const rawUrl = window.prompt("Enter the link URL");
    if (!rawUrl) return;
    const url = rawUrl.trim();
    if (!/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(url)) {
      window.alert("Use a URL starting with http://, https://, mailto:, tel:, /, or #.");
      return;
    }
    if (!editor || !savedRange || !editor.contains(savedRange.commonAncestorContainer)) return;

    editor.focus();
    const activeSelection = window.getSelection();
    if (activeSelection) {
      activeSelection.removeAllRanges();
      activeSelection.addRange(savedRange);
    }

    const rangeNode = savedRange.commonAncestorContainer;
    const existingLink = rangeNode.nodeType === Node.ELEMENT_NODE
      ? (rangeNode as Element).closest("a")
      : rangeNode.parentElement?.closest("a");
    if (existingLink && editor.contains(existingLink)) {
      existingLink.href = url;
      existingLink.target = "_blank";
      existingLink.rel = "noopener noreferrer";
      existingLink.style.setProperty("color", "blue", "important");
      publishEditorValue(editor.innerHTML);
      return;
    }

    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.style.setProperty("color", "blue", "important");
    if (savedRange.collapsed) link.textContent = url;
    else link.append(savedRange.extractContents());
    savedRange.insertNode(link);
    savedRange.setStartAfter(link);
    savedRange.collapse(true);
    if (activeSelection) {
      activeSelection.removeAllRanges();
      activeSelection.addRange(savedRange);
    }
    publishEditorValue(editor.innerHTML);
  };

  const toggleSourceMode = () => {
    if (sourceMode) {
      const normalizedHtml = normalizeHtml(htmlValue);
      if (editorRef.current) editorRef.current.innerHTML = normalizedHtml;
      setHtmlValue(normalizedHtml);
      publishEditorValue(normalizedHtml);
    } else {
      const currentHtml = editorRef.current?.innerHTML ?? value;
      setHtmlValue(normalizeHtml(currentHtml));
    }
    setSourceMode((current) => !current);
  };

  const updateHtmlSource = (nextValue: string) => {
    setHtmlValue(nextValue);
    publishEditorValue(nextValue);
  };

  return (
    <div className={`overflow-hidden rounded-lg border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-primary-500 ${className}`}>
      <div className="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 p-2" aria-label="Text formatting">
        <button type="button" className={toolbarButtonClass} onMouseDown={(event) => event.preventDefault()} onClick={() => applyCommand("bold")} aria-label="Bold"><strong>B</strong></button>
        <button type="button" className={toolbarButtonClass} onMouseDown={(event) => event.preventDefault()} onClick={() => applyCommand("italic")} aria-label="Italic"><em>I</em></button>
        <button type="button" className={toolbarButtonClass} onMouseDown={(event) => event.preventDefault()} onClick={() => applyCommand("underline")} aria-label="Underline"><u>U</u></button>
        <button type="button" className={toolbarButtonClass} onMouseDown={(event) => event.preventDefault()} onClick={() => applyCommand("insertUnorderedList")}>Bulleted list</button>
        <button type="button" className={toolbarButtonClass} onMouseDown={(event) => event.preventDefault()} onClick={() => applyCommand("insertOrderedList")}>Numbered list</button>
        <button type="button" className={toolbarButtonClass} onMouseDown={(event) => event.preventDefault()} onClick={() => applyCommand("formatBlock", "<p>")}>Paragraph</button>
        <button type="button" className={toolbarButtonClass} onMouseDown={(event) => event.preventDefault()} onClick={() => applyCommand("formatBlock", "<h3>")}>Heading</button>
        <button type="button" className={toolbarButtonClass} onMouseDown={(event) => event.preventDefault()} onClick={insertLineBreak}>Line break</button>
        <button type="button" className={toolbarButtonClass} onMouseDown={(event) => event.preventDefault()} onClick={insertLink}>Insert link</button>
        <button type="button" className={toolbarButtonClass} onMouseDown={(event) => event.preventDefault()} onClick={() => applyCommand("removeFormat")}>Clear formatting</button>
        <button type="button" className={`${toolbarButtonClass} ml-auto`} onClick={toggleSourceMode} aria-pressed={sourceMode}>{sourceMode ? "Visual editor" : "HTML"}</button>
      </div>
      {sourceMode ? (
        <textarea
          aria-label="HTML source"
          className="min-h-28 w-full resize-y px-3 py-2 font-mono text-xs text-gray-900 outline-none focus:ring-2 focus:ring-primary-500"
          value={htmlValue}
          onChange={(event) => updateHtmlSource(event.target.value)}
          onBlur={() => {
            const normalizedHtml = normalizeHtml(htmlValue);
            setHtmlValue(normalizedHtml);
            publishEditorValue(normalizedHtml);
          }}
          placeholder="Write section content..."
        />
      ) : <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-label={placeholder}
        aria-multiline="true"
        data-placeholder={placeholder}
        className="min-h-28 whitespace-pre-wrap px-3 py-2 text-sm text-gray-900 outline-none empty:before:pointer-events-none empty:before:text-gray-400 empty:before:content-[attr(data-placeholder)] [&_a]:!text-blue-600 [&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:text-lg [&_h3]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_ol_li]:list-decimal [&_p]:mb-2"
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={(event) => publishEditorValue(event.currentTarget.innerHTML)}
        onBlur={(event) => {
          const normalizedHtml = normalizeHtml(event.currentTarget.innerHTML);
          event.currentTarget.innerHTML = normalizedHtml;
          publishEditorValue(normalizedHtml);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && event.shiftKey) {
            event.preventDefault();
            insertLineBreak();
          }
        }}
      />}
    </div>
  );
}
