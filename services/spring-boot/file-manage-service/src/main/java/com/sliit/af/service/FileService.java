/**
 * 
 */
package com.sliit.af.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author vimukthi_r
 *
 */
public interface FileService {
	public String storeFile(MultipartFile file);

	public Resource loadFileAsResource(String fileName);
}
