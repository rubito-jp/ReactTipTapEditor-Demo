"use client";

/* eslint-disable unicorn/no-null */
/* eslint-disable quotes */
import { useCallback, useState } from "react";

import RichTextEditor, { BaseKit } from "reactjs-tiptap-editor";

// import { locale } from "reactjs-tiptap-editor/locale-bundle";
import {
  BubbleMenuTwitter,
  BubbleMenuKatex,
  BubbleMenuExcalidraw,
  BubbleMenuMermaid,
  BubbleMenuDrawer,
} from "reactjs-tiptap-editor/bubble-extra";

import { Blockquote } from "reactjs-tiptap-editor/blockquote";
import { Bold } from "reactjs-tiptap-editor/bold";
import { BulletList } from "reactjs-tiptap-editor/bulletlist";
import { Code } from "reactjs-tiptap-editor/code";
import { CodeBlock } from "reactjs-tiptap-editor/codeblock";
import { Color } from "reactjs-tiptap-editor/color";
import { ColumnActionButton } from "reactjs-tiptap-editor/multicolumn";
import { Emoji } from "reactjs-tiptap-editor/emoji";
import { FontFamily } from "reactjs-tiptap-editor/fontfamily";
import { FontSize } from "reactjs-tiptap-editor/fontsize";
import { Heading } from "reactjs-tiptap-editor/heading";
import { Highlight } from "reactjs-tiptap-editor/highlight";
import { History } from "reactjs-tiptap-editor/history";
import { HorizontalRule } from "reactjs-tiptap-editor/horizontalrule";
import { Iframe } from "reactjs-tiptap-editor/iframe";
import { Image } from "reactjs-tiptap-editor/image";
import { Italic } from "reactjs-tiptap-editor/italic";
import { LineHeight } from "reactjs-tiptap-editor/lineheight";
import { Link } from "reactjs-tiptap-editor/link";
import { OrderedList } from "reactjs-tiptap-editor/orderedlist";
import { SlashCommand } from "reactjs-tiptap-editor/slashcommand";
import { Strike } from "reactjs-tiptap-editor/strike";
import { Table } from "reactjs-tiptap-editor/table";
import { TaskList } from "reactjs-tiptap-editor/tasklist";
import { TextAlign } from "reactjs-tiptap-editor/textalign";
import { TextUnderline } from "reactjs-tiptap-editor/textunderline";

import "reactjs-tiptap-editor/style.css";
import "prism-code-editor-lightweight/layout.css";
import "prism-code-editor-lightweight/themes/github-dark.css";

import "katex/dist/katex.min.css";
import "easydrawer/styles.css";
import "react-image-crop/dist/ReactCrop.css";
import "@excalidraw/excalidraw/index.css";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUp } from 'lucide-react';
const extensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 50_000,
    },
  }),
  History,
  FontFamily,
  Heading.configure({ spacer: true }),
  FontSize,
  Bold,
  Italic,
  TextUnderline,
  Strike,
  Emoji,
  Color.configure({ spacer: true }),
  Highlight,
  BulletList,
  OrderedList,
  TextAlign.configure({ types: ["heading", "paragraph"], spacer: true }),

  LineHeight,
  TaskList.configure({
    spacer: true,
    taskItem: {
      nested: true,
    },
  }),
  Link,
  Image.configure({
    upload: (files: File) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files));
        }, 500);
      });
    },
  }),
  Iframe,
  Blockquote,
  SlashCommand,
  HorizontalRule,
  Code.configure({
    toolbar: false,
  }),
  CodeBlock,
  ColumnActionButton,
  Table,
];

const DEFAULT = ``;
function debounce(func: any, wait: number) {
  let timeout: any;
  return function (...args: any[]) {
    clearTimeout(timeout);
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export function ReactTipTapEditor() {
  const [content, setContent] = useState(DEFAULT);
   const [isPublishing, setIsPublishing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const onValueChange = useCallback(
    debounce((value: any) => {
      setContent(value);
      setHasChanges(true);  
    }, 300),
    []
  );

  async function handleSaveContentToDatabase() {
    if (isPublishing) return;
    setIsPublishing(true);
    console.log("Publishing content:", content);
    // simulate network delay
    await new Promise((r) => setTimeout(r, 1500));
    setIsPublishing(false);
    setHasChanges(false); // disable button until next change
  }
 
  return (
    <> 
<div className="  py-10">
 
  <Tabs defaultValue="editor" className=" ">
    <div className="flex justify-between">
        <TabsList>
    <TabsTrigger value="editor">Editor</TabsTrigger>
    <TabsTrigger value="preview">Preview</TabsTrigger>
  </TabsList>
  <Button
            onClick={handleSaveContentToDatabase}
            disabled={isPublishing || !hasChanges}
            className={`text-sm ${
              isPublishing || !hasChanges
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <FileUp className="mr-1 h-4 w-4" />
            {isPublishing ? "Publishing..." : "Publish"}
          </Button>
    </div>

  <TabsContent value="editor"> <RichTextEditor
        //@ts-ignore
        output="html"
        content={content as any}
        onChangeContent={onValueChange}
        extensions={extensions}
        dark={false}
        disabled={false}
        bubbleMenu={{
          //@ts-ignore
          render({ extensionsNames, editor, disabled }, bubbleDefaultDom) {
            return (
              <>
                {bubbleDefaultDom}

                {extensionsNames.includes("twitter") ? (
                  <BubbleMenuTwitter
                    disabled={disabled}
                    editor={editor}
                    key="twitter"
                  />
                ) : null}
                {extensionsNames.includes("katex") ? (
                  <BubbleMenuKatex
                    disabled={disabled}
                    editor={editor}
                    key="katex"
                  />
                ) : null}
                {extensionsNames.includes("excalidraw") ? (
                  <BubbleMenuExcalidraw
                    disabled={disabled}
                    editor={editor}
                    key="excalidraw"
                  />
                ) : null}
                {extensionsNames.includes("mermaid") ? (
                  <BubbleMenuMermaid
                    disabled={disabled}
                    editor={editor}
                    key="mermaid"
                  />
                ) : null}
                {extensionsNames.includes("drawer") ? (
                  <BubbleMenuDrawer
                    disabled={disabled}
                    editor={editor}
                    key="drawer"
                  />
                ) : null}
              </>
            );
          },
        }}
      /></TabsContent>
  <TabsContent value="preview">{typeof content === "string" && (
        <div
          className="prose prose-neutral dark:prose-invert max-w-none mt-6 p-4 rounded-md border border-gray-200 bg-white
              prose-img:mx-auto prose-img:block"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}</TabsContent>
</Tabs>
 

      
</div>
    
    </>
  );
}
