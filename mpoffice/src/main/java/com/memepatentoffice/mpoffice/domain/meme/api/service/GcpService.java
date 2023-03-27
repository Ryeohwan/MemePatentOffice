package com.memepatentoffice.mpoffice.domain.meme.api.service;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Transactional
public class GcpService {
    @Autowired
    private Storage storage;

    public String uploadFile(MultipartFile file) throws IOException {
        BlobId blobId = BlobId.of("mpoffice", file.getOriginalFilename());
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(file.getContentType()).build();
        storage.create(blobInfo, file.getInputStream());

        // 하드코딩 죄송함돠ㅠㅠ
        String front = "https://storage.googleapis.com/";
        String buck = storage.get("mpoffice", file.getOriginalFilename()).getBucket() + "/";
        String arr = blobId.getName().replaceAll(" ","%20");
        String result = front + buck + arr;

        return result;
    }
}
