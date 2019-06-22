/**
 * 
 */
package com.sliit.af.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.sliit.af.exception.MyFileNotFoundException;
import com.sliit.af.res.UploadFileResponse;
import com.sliit.af.service.FileService;

/**
 * @author vimukthi_r
 *
 */
@RestController
public class FileController {

	@Autowired
	private FileService fileService;

	@PostMapping("/uploadFile")
	public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {
		String fileName = null;
		String fileDownloadUri = null;
		try {
			fileName = fileService.storeFile(file);

			fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
					.path(fileName).toUriString();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
	}

	@PostMapping("/uploadMultipleFiles")
	public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
		return Arrays.asList(files).stream().map(file -> uploadFile(file)).collect(Collectors.toList());
	}

	@GetMapping("/downloadFile/{fileName:.+}")
	public ResponseEntity<Object> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
		String contentType = null;
		Resource resource = null;
		try {
			// Load file as Resource
			resource = fileService.loadFileAsResource(fileName);

			// Try to determine file's content type
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (MyFileNotFoundException ex) {
			return new ResponseEntity<>("File not found", HttpStatus.OK);
		} catch (IOException ex) {
			return new ResponseEntity<>("Sorry! something went wrong, try again.", HttpStatus.BAD_GATEWAY);
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
}
