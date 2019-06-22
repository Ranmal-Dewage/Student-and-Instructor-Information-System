	/**
	 * 
	 */
	package com.sliit.af.service.impl;
	
	import java.io.IOException;
	import java.net.MalformedURLException;
	import java.nio.file.Files;
	import java.nio.file.Path;
	import java.nio.file.Paths;
	import java.nio.file.StandardCopyOption;
	import java.util.Objects;
	
	import org.springframework.beans.factory.annotation.Value;
	import org.springframework.core.io.Resource;
	import org.springframework.core.io.UrlResource;
	import org.springframework.stereotype.Service;
	import org.springframework.util.StringUtils;
	import org.springframework.web.multipart.MultipartFile;
	
	import com.sliit.af.exception.FileStorageException;
	import com.sliit.af.exception.MyFileNotFoundException;
	import com.sliit.af.service.FileService;
	
	/**
	 * @author vimukthi_r
	 *
	 */
	@Service
	public class FileServiceImpl implements FileService {
	
		@Value("${file.upload-dir:./uploads}")
		private String uploadDir;
		private Path fileStorageLocation = null;
	
		public void generateFileStorageLocation(String uploadDir) {
			try {
				this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
				Files.createDirectories(this.fileStorageLocation);
			} catch (Exception e) {
				throw new FileStorageException("Could not create the directory where the uploaded files will be stored.");
			}
		}
	
		@Override
		public String storeFile(MultipartFile file) {
			// Normalize file name
			String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		try {
			if(Objects.isNull(fileStorageLocation)) {
				generateFileStorageLocation(this.uploadDir);
			}
			// Check if the file's name contains invalid characters
			if (fileName.contains("..")) {
				throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
			}

			// Copy file to the target location (Replacing existing file with the same name)
			Path targetLocation = this.fileStorageLocation.resolve(fileName);
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

			return fileName;
		} catch (IOException ex) {
			throw new FileStorageException("Could not store file " + fileName + ". Please try again!");
		}
	}

	@Override
	public Resource loadFileAsResource(String fileName) {
		try {
			if(Objects.isNull(fileStorageLocation)) {
				generateFileStorageLocation(this.uploadDir);
			}
			Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
			Resource resource = new UrlResource(filePath.toUri());
			if (resource.exists()) {
				return resource;
			} else {
				throw new MyFileNotFoundException("File not found " + fileName);
			}
		} catch (MalformedURLException ex) {
			throw new MyFileNotFoundException("File not found " + fileName);
		}
	}
}
