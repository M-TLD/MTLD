package com.mtld.backend.service.diary;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.mtld.backend.dto.diary.RecordRequestDto;
import com.mtld.backend.dto.diary.WalkingDetailRequestDto;
import com.mtld.backend.dto.diary.WalkingDetailResponseDto;
import com.mtld.backend.dto.diary.WalkingRequestDto;
import com.mtld.backend.entity.UploadFile;
import com.mtld.backend.entity.User;
import com.mtld.backend.entity.auth.RoleType;
import com.mtld.backend.entity.diary.Record;
import com.mtld.backend.entity.diary.Walking;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.exception.AuthException;
import com.mtld.backend.exception.BadRequestException;
import com.mtld.backend.exception.NoContentException;
import com.mtld.backend.repository.DogRepository;
import com.mtld.backend.repository.UploadFileRepository;
import com.mtld.backend.repository.diary.RecordRepository;
import com.mtld.backend.repository.diary.WalkingRepository;
import com.mtld.backend.repository.user.UserRepository;
import com.mtld.backend.service.diary.DiaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * created by seongmin on 2022/09/13
 * updated by seongmin on 2022/09/20
 */
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class DiaryServiceImpl implements DiaryService {

    private final WalkingRepository walkingRepository;
    private final RecordRepository recordRepository;
    private final UserRepository userRepository;
    private final DogRepository dogRepository;
    private final UploadFileRepository uploadFileRepository;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3Client amazonS3Client;

    @Override
    @Transactional
    public void writeWalking(Long uid, WalkingRequestDto walkingDto) {
        User user = userRepository.findById(uid).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        Dog dog = dogRepository.findById(walkingDto.getDogId()).orElseThrow(() -> new BadRequestException("유효하지 않은 반려견입니다."));
        Walking walking = Walking.builder()
                .walkingTime(walkingDto.getWalkingTime())
                .diaryDate(walkingDto.getDiaryDate())
                .distance(walkingDto.getDistance())
                .dog(dog)
                .user(user)
                .build();
        walkingRepository.save(walking);
    }

    @Override
    @Transactional
    public Long writeRecord(Long uid, RecordRequestDto recordDto, List<MultipartFile> images) {
        User user = userRepository.findById(uid).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        LocalDate diaryDate = LocalDate.parse(recordDto.getDiaryDate(), DateTimeFormatter.ISO_DATE);

        List<String> filePathList = new ArrayList<>();
        List<String> originFileName = new ArrayList<>();

        try {
            images.forEach(image -> {
                String originName = image.getOriginalFilename();
                originFileName.add(originName);
                String fileName = createFileName(originName);
                ObjectMetadata objectMetadata = new ObjectMetadata();
                objectMetadata.setContentType(image.getContentType());
                objectMetadata.setContentLength(image.getSize());

                try (InputStream inputStream = image.getInputStream()) {
                    amazonS3Client.putObject(
                            new PutObjectRequest(bucket, fileName, inputStream,
                                    objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead)
                    );
                    String imagePath = amazonS3Client.getUrl(bucket, fileName).toString();
                    filePathList.add(imagePath);
                } catch (IOException e) {
                    throw new IllegalStateException("파일 업로드에 실패했습니다.");
                }

            });
        } catch (NullPointerException e) {
            log.info("이미지 없는 요청");
        }

        List<UploadFile> uploadFiles = new ArrayList<>();
        for (int i = 0; i < originFileName.size(); i++) {
            uploadFiles.add(UploadFile.builder()
                    .name(originFileName.get(i))
                    .url(filePathList.get(i))
                    .build());
        }
        Record record = Record
                .builder()
                .diaryDate(diaryDate)
                .mainText(recordDto.getMainText())
                .user(user)
                .build();
        recordRepository.save(record);
        uploadFiles.forEach(record::addUploadFile);
        return record.getId();
    }

    // 유니크한 파일 이름 생성
    private String createFileName(String originalFileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(originalFileName));
    }

    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new BadRequestException("잘못된 형식의 파일 입니다");
        }
    }

    @Override
    public WalkingDetailResponseDto getWalkingDetail(Long uid, WalkingDetailRequestDto dto) {
        User user = userRepository.findById(uid).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        Dog dog = dogRepository.findByIdAndUser(dto.getDogId(), user).orElseThrow(() -> new AuthException("권한이 없습니다."));
        Walking result = walkingRepository.findByDiaryDateBetweenAndDog(dto.getDiaryDate(), dto.getDiaryDate(), dog).orElseThrow(() -> new NoContentException("산책일지가 없습니다."));
        return WalkingDetailResponseDto.of(result);
    }
}
