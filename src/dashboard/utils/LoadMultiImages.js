import react, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Thumb from "./Thumb";
export default function MultiImage(props) {
	const [files, setFiles] = useState([]);
	const onDrop = useCallback((acceptedFiles) => {
		setFiles((prev) => [...prev, ...acceptedFiles]);
	}, []);
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

	const fileList = acceptedFiles.map((file) => (
		<li key={file.path}>
			<Thumb file={file} />
		</li>
	));

	return (
		<section className="container">
			<div
				style={{
					cursor: "pointer",
					background: "gray",
					height: "200px",
					border: "2px dashed blue",
				}}
				{...getRootProps({ className: "dropzone" })}
			>
				<input {...getInputProps()} />
				<p>Drag 'n' drop some files here, or click to select files</p>
			</div>
			<aside>
				<h4>Files</h4>
				<ul>{fileList}</ul>
			</aside>
		</section>
	);
}
