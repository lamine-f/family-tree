package com.fayefamily.persistance.services;


import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class UploadFileService  {

    private Timestamp timestamp = new Timestamp(System.currentTimeMillis());
    public HashMap<String, String> saveFile(MultipartFile file, String uploadDir, String destination) {
        HashMap<String, String> response = new HashMap<String, String>();
        if (!file.isEmpty()) {
            try {
//                uploadDir +=
//                        " ("
//                                + String.valueOf(timestamp)
//                                .replace(" ", "")
//                                .replace(":", "-")
//                                .replace(".", "-")
//                                + ")/";
                File dir = new File(uploadDir);
                if (!dir.exists())
                    dir.mkdirs();

                String filePath = uploadDir + destination;
                File destFile = new File( filePath );
                try {
                    file.transferTo( destFile );
                    response.put("message", "success");
                    response.put("fileUrl", filePath);
                    response.put("type", file.getContentType());
                    response.put("name", destination);
                    return response;

                } catch (IOException e) {
                    throw new RuntimeException(e);
                }

            } catch (Exception e) {
                response.put("message", "error directory not create");
                return response;
            }
        } else{
            response.put("message", "empty file");
            return response;
        }
    }

    public  HashMap< String, Object >  saveFiles(MultipartFile[] files, String uploadDir, String filesName) {
        List < HashMap<String, String> > fileUrls = new ArrayList<>();
        timestamp = new Timestamp(System.currentTimeMillis());

        HashMap< String, Object > response = new HashMap<>();
        int i = 1;
        for ( MultipartFile file : files ) {
            String dest = filesName+i++;
            fileUrls.add( this.saveFile( file, uploadDir+file.getContentType()+"/"+filesName, dest ) );
        }

        if ( fileUrls.isEmpty() ) {
            response.put("message", "no files");
            return response;
        }

        response.put("message", "success");
        response.put("data", fileUrls);

        return response;
    }
}