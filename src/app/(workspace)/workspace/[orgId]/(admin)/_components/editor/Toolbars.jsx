import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
    $getSelection,
    $isRangeSelection,
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    FORMAT_TEXT_COMMAND,
    UNDO_COMMAND,
    REDO_COMMAND,
} from "lexical";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { mergeRegister } from "@lexical/utils";
import { useDebouncedCallback } from "use-debounce";
import { Redo2, Strikethrough, Underline, Undo2 } from "lucide-react";
import { $generateHtmlFromNodes } from '@lexical/html';
import { $generateNodesFromDOM } from '@lexical/html';


function Divider() {
    return <div className="bg-slate-200/40 w-[1px] h-[20px]" />;
}


const empty = `{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`

export default function Toolbars({ value = empty, onChange }) {
    const [editor] = useLexicalComposerContext();
    const toolbarRef = useRef(null);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);

    useEffect(() => {
        console.log('Loading State')
        //const newState = editor?.parseEditorState(value || empty)
        //editor?.setEditorState(newState)
        // editor?.setEditable(true)
        // const parser = new DOMParser();
        // const dom = parser.parseFromString(value);


        const parser = new DOMParser();
        //const dom = parser.parseFromString(value, 'textHtmlMimeType');

        //const dom = new JSDOM(htmlString)


    }, [value])

    useEffect(() => {
        const removeUpdateListener = editor.registerUpdateListener(
            ({ editorState }) => {
                editorState.read(() => {
                    const htmlString = $generateHtmlFromNodes(editor, null);

                    console.log(htmlString)
                    onChange(htmlString)
                });
            }
        );
        return () => {
            removeUpdateListener();
        };
    }, [editor]);




    const $updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            // Update text format
            setIsBold(selection.hasFormat("bold"));
            setIsItalic(selection.hasFormat("italic"));
        }
    }, []);

    const handleSave = useDebouncedCallback((editor) => {

        //     // const removeUpdateListener = editor.registerUpdateListener(
        //     //     ({ editorState }) => {
        //     //         editorState.read(() => {
        //     //             const htmlString = $generateHtmlFromNodes(editor, null);

        //     //             console.log(htmlString)
        //     //             onChange(htmlString)
        //     //         });
        //     //     }
        //     // );
        //     // return () => {
        //     //     removeUpdateListener();
        //     // };
        //     // console.log(htmlString);
        //     //onChange(content)

        // const htmlString = $generateHtmlFromNodes(editor, null);


    }, 500);

    useEffect(() => {

        mergeRegister(
            editor.registerUpdateListener(
                ({ editorState, dirtyElements, dirtyLeaves }) => {
                    editorState.read(() => {
                        $updateToolbar();
                    });
                    if (dirtyElements.size === 0 && dirtyLeaves.size === 0) {
                        return;
                    }
                    //handleSave(JSON.stringify(editorState));
                }
            ),
            editor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => {
                    setCanUndo(payload);
                    return false;
                },
                1
            ),
            editor.registerCommand(
                CAN_REDO_COMMAND,
                (payload) => {
                    setCanRedo(payload);
                    return false;
                },
                1
            )
        );
    }, [editor, $updateToolbar]);

    const handleHeading = () => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                // Update text format
                $setBlocksType(selection, () => $createHeadingNode("h1"));
            }
        });
    };

    return (
        <div className=" space-x-3 border rounded mb-1 p-2 flex flex-row items-center">

            <div className="flex flex-row gap-6">
                <button
                    disabled={!canUndo}
                    onClick={() => {
                        editor.dispatchCommand(UNDO_COMMAND, undefined);
                    }}
                    className="toolbar-item spaced"
                    aria-label="Undo size-8 rounded-md"
                >
                    <i className="format undo" />
                    <Undo2 size={16} />
                </button>

                <button
                    disabled={!canRedo}
                    onClick={() => {
                        editor.dispatchCommand(REDO_COMMAND, undefined);
                    }}
                    className="toolbar-item size-8 rounded-md"
                    aria-label="Redo"
                >
                    <Redo2 size={16} />
                </button>
            </div>

            <Divider />

            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
                }}
                className={` size-8 rounded-md ${isBold ? "dark:bg-gray-100/40 bg-gray-600/40" : ""}`}
            >
                B
            </button>
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
                }}
                className={` size-8 rounded-md italic ${isItalic ? "dark:bg-gray-100/40 bg-gray-600/40" : ""
                    }`}
            >
                i
            </button>

            <button onClick={handleHeading} className={` size-8 rounded-md `}>
                h1
            </button>

            <Divider />

            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
                }}
                className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
                aria-label="Format Underline"
            >
                <Underline size={16} />
            </button>
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
                }}
                className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
                aria-label="Format Strikethrough"
            >
                <Strikethrough size={16} />
            </button>

        </div>
    );
}