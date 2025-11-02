'use client';

/* eslint-disable unicorn/no-null */
/* eslint-disable quotes */
import { useCallback, useState } from 'react'

import RichTextEditor, { BaseKit } from 'reactjs-tiptap-editor'

import { locale } from 'reactjs-tiptap-editor/locale-bundle'
import {
  BubbleMenuTwitter,
  BubbleMenuKatex,
  BubbleMenuExcalidraw,
  BubbleMenuMermaid,
  BubbleMenuDrawer
} from 'reactjs-tiptap-editor/bubble-extra';

import { Attachment } from 'reactjs-tiptap-editor/attachment';
import { Blockquote } from 'reactjs-tiptap-editor/blockquote';
import { Bold } from 'reactjs-tiptap-editor/bold';
import { BulletList } from 'reactjs-tiptap-editor/bulletlist';
import { Clear } from 'reactjs-tiptap-editor/clear';
import { Code } from 'reactjs-tiptap-editor/code';
import { CodeBlock } from 'reactjs-tiptap-editor/codeblock';
import { Color } from 'reactjs-tiptap-editor/color';
import { ColumnActionButton } from 'reactjs-tiptap-editor/multicolumn';
import { Emoji } from 'reactjs-tiptap-editor/emoji';
import { ExportPdf } from 'reactjs-tiptap-editor/exportpdf';
import { ExportWord } from 'reactjs-tiptap-editor/exportword';
import { FontFamily } from 'reactjs-tiptap-editor/fontfamily';
import { FontSize } from 'reactjs-tiptap-editor/fontsize';
import { FormatPainter } from 'reactjs-tiptap-editor/formatpainter';
import { Heading } from 'reactjs-tiptap-editor/heading';
import { Highlight } from 'reactjs-tiptap-editor/highlight';
import { History } from 'reactjs-tiptap-editor/history';
import { HorizontalRule } from 'reactjs-tiptap-editor/horizontalrule';
import { Iframe } from 'reactjs-tiptap-editor/iframe';
import { Image } from 'reactjs-tiptap-editor/image'; 
import { ImportWord } from 'reactjs-tiptap-editor/importword';
import { Indent } from 'reactjs-tiptap-editor/indent';
import { Italic } from 'reactjs-tiptap-editor/italic';
import { LineHeight } from 'reactjs-tiptap-editor/lineheight';
import { Link } from 'reactjs-tiptap-editor/link';
import { Mention } from 'reactjs-tiptap-editor/mention';
import { MoreMark } from 'reactjs-tiptap-editor/moremark';
import { OrderedList } from 'reactjs-tiptap-editor/orderedlist';
import { SearchAndReplace } from 'reactjs-tiptap-editor/searchandreplace';
import { SlashCommand } from 'reactjs-tiptap-editor/slashcommand';
import { Strike } from 'reactjs-tiptap-editor/strike';
import { Table } from 'reactjs-tiptap-editor/table';
import { TableOfContents } from 'reactjs-tiptap-editor/tableofcontent';
import { TaskList } from 'reactjs-tiptap-editor/tasklist';
import { TextAlign } from 'reactjs-tiptap-editor/textalign';
import { TextUnderline } from 'reactjs-tiptap-editor/textunderline';
import { Video } from 'reactjs-tiptap-editor/video';
import { TextDirection } from 'reactjs-tiptap-editor/textdirection';
import { Katex } from 'reactjs-tiptap-editor/katex';
import { Drawer } from 'reactjs-tiptap-editor/drawer';
import { Excalidraw } from 'reactjs-tiptap-editor/excalidraw';
import { Twitter } from 'reactjs-tiptap-editor/twitter';
import { Mermaid } from 'reactjs-tiptap-editor/mermaid';

import 'reactjs-tiptap-editor/style.css'
import 'prism-code-editor-lightweight/layout.css';
import "prism-code-editor-lightweight/themes/github-dark.css"

import 'katex/dist/katex.min.css'
import 'easydrawer/styles.css'
import 'react-image-crop/dist/ReactCrop.css';
import "@excalidraw/excalidraw/index.css";

function convertBase64ToBlob(base64: string) {
  const arr = base64.split(',')
  const mime = arr[0]!.match(/:(.*?);/)![1]
  const bstr = atob(arr[1]!)
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  //@ts-ignore
  return new Blob([u8arr], { type: mime })
}

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
  TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
 
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
          resolve(URL.createObjectURL(files))
        }, 500)
      })
    },
  }), 
  Blockquote,
  SlashCommand,
  HorizontalRule,
  Code.configure({
    toolbar: false,
  }),
  CodeBlock,
  ColumnActionButton,
  Table,
  
 
]

const DEFAULT = ``

function debounce(func: any, wait: number) {
  let timeout: any
  return function (...args: any[]) {
    clearTimeout(timeout)
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

export function ReactTipTapEditor() {
  const [content, setContent] = useState(DEFAULT)
  const [theme, setTheme] = useState('light')
  const [disable, setDisable] = useState(false)
  const [lang, setlang] = useState('vi');

  const onValueChange = useCallback(
    debounce((value: any) => {
      setContent(value)
    }, 300),
    [],
  )


  return (  
<>
          <select value={lang} onChange={(e) => {
            setlang(e.target.value);
            locale.setLang(e.target.value)
          }}>
            <option value="vi">Vietnamese</option>
            <option value="en">English</option>
            <option value="zh_CN">Chinese</option>
            <option value="pt_BR">Português</option>
            <option value="hu_HU">Hungarian</option>
            <option value="fi">Finnish</option>
          </select> 
          <button onClick={() => setDisable(!disable)}>{disable ? 'Editable' : 'Readonly'}</button>
          
         

        <RichTextEditor
        //@ts-ignore
          output="html"
          content={content as any}
          onChangeContent={onValueChange}
          extensions={extensions}
          dark={theme === 'dark'}
          disabled={disable} 
          bubbleMenu={{
            //@ts-ignore
            render({ extensionsNames, editor, disabled }, bubbleDefaultDom) {
              return <>
                {bubbleDefaultDom}

                {extensionsNames.includes('twitter') ? <BubbleMenuTwitter disabled={disabled}
                  editor={editor}
                  key="twitter"
                /> : null}
                {extensionsNames.includes('katex') ? <BubbleMenuKatex disabled={disabled}
                  editor={editor}
                  key="katex"
                /> : null}
                {extensionsNames.includes('excalidraw') ? <BubbleMenuExcalidraw disabled={disabled}
                  editor={editor}
                  key="excalidraw"
                /> : null}
                {extensionsNames.includes('mermaid') ? <BubbleMenuMermaid disabled={disabled}
                  editor={editor}
                  key="mermaid"
                /> : null}
                {extensionsNames.includes('drawer') ? <BubbleMenuDrawer disabled={disabled}
                  editor={editor}
                  key="drawer"
                /> : null}
              </>
            },
          }}
        />

        {typeof content === 'string' && (
          <textarea
            className="textarea"
            readOnly
            style={{
              marginTop: 20,
              height: 500,
              width: '100%',
              borderRadius: 4, 
            }}
            value={content}
          />
        )}
    </>
  )
}
 