import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "quill/dist/quill.core.css";
import { Box } from '@chakra-ui/react';
import '../../styles/editor.css'

function BlogTextEditor({childData, initialValues}: {childData: any, initialValues: string}) {
    const modules = {
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
          [{ 'size': [] }],
          [{ 'align': [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['link', 'image', 'video'],
          ['clean']
        ],
      };
      const formats = [
        'header',
        'font',
        'size',
        'align',
        'bold',
        'italic',
        'code',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'color',
        'background',
        'link',
        'image',
        'video',
        'clean'
      ];
    const [savedEdit, setSavedEdit] = useState<string>(initialValues);

    const handleChange = (content: string) => {
      setSavedEdit(content);
      // console.log(content);
      // console.log(value);
      childData(content);
      console.log(childData(content));
    };
  return (
    <>
      <Box h={'100%'}>
      <ReactQuill 
        value={savedEdit}
        theme='snow' 
        modules={modules}
        formats={formats}
        onChange={handleChange} placeholder='create blog...' style={{height: '90%'}}
      />
          
      </Box>
      
    </>
  )
}



export default BlogTextEditor;
