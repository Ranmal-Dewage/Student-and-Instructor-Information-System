import {useDropzone} from "react-dropzone";
import React, {useMemo} from "react";
import {MDBIcon} from "mdbreact";

export function StyledDropzone(props) {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles
    } = useDropzone();

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject
    ]);

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <div>
            <div {...getRootProps({style})}>
                <input {...getInputProps()}/>
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <input className="mt-1" type="button" value="save" onClick={() => props.getFiles(acceptedFiles)}/>
            {props.saved && <MDBIcon icon="check" className="ml-3"/>}
            <aside>
                <label className="grey-text pt-1">Files :</label>
                <ul>
                    {files}
                </ul>
            </aside>
        </div>
    );
}

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};