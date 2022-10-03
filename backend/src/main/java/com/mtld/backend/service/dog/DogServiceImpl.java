package com.mtld.backend.service.dog;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.mtld.backend.dto.dog.DogRequestDto;
import com.mtld.backend.dto.dog.DogResponseDetailDto;
import com.mtld.backend.dto.dog.DogUpdateRequestDto;
import com.mtld.backend.entity.user.User;
import com.mtld.backend.entity.dog.Breed;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.exception.AuthException;
import com.mtld.backend.exception.BadRequestException;
import com.mtld.backend.repository.dog.BreedRepository;
import com.mtld.backend.repository.dog.DogRepository;
import com.mtld.backend.repository.user.UserRepository;
import com.mtld.backend.util.ConvertDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * created by myeongSeok on 2022/09/14
 * updated by seongmin on 2022/10/30
 */
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class DogServiceImpl implements DogService {
    private final DogRepository dogRepository;
    private final UserRepository userRepository;
    private final BreedRepository breedRepository;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3Client amazonS3Client;

    @Override
    public Dog getDog(Long dogId) {
        Dog dog = dogRepository.findById(dogId).orElseThrow(() -> new BadRequestException("유효하지 않은 품종입니다."));
        return dog;
    }

    @Override
    public List<DogResponseDetailDto> getDogByUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));

        List<DogResponseDetailDto> dogResponseDetailDtoList = new ArrayList<>();
        for (Dog dog : dogRepository.findByUser(user)) {
            dogResponseDetailDtoList.add(DogResponseDetailDto.of(dog));
        }
        return dogResponseDetailDtoList;
    }

    @Override
    public DogResponseDetailDto getDogById(Long uid, Long dogId) {
        User user = userRepository.findById(uid).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        Dog dog = dogRepository.findById(dogId).orElseThrow(() -> new BadRequestException("해당 반려견이 없습니다."));
        if (!dog.getUser().equals(user)) {
            throw new AuthException("권한이 없습니다.");
        }
        return DogResponseDetailDto.of(dog);
    }

    @Override
    @Transactional
    public Long registerDog(Long userId, DogRequestDto dogRequestDto, MultipartFile image) {
        User user = userRepository.findById(userId).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        if (dogRepository.findByUser(user).size() >= 3)
            throw new BadRequestException("반려견을 3마리 이상 등록할 수 없습니다.");
        Breed breed = breedRepository.findByCode(dogRequestDto.getCode()).orElseThrow(() -> new BadRequestException("유효하지 않은 품종입니다."));
        Dog dog = Dog.builder()
                .name(dogRequestDto.getName())
                .birthdate(ConvertDate.stringToDate(dogRequestDto.getBirthdate()))
                .gender(dogRequestDto.getGender())
                .weight(dogRequestDto.getWeight())
                .neuter(dogRequestDto.isNeuter())
                .breed(breed).user(user)
                .build();
        dog.writeDisease(dogRequestDto.getDisease());

        if (image.isEmpty()) {
            return dogRepository.save(dog).getId();
        }

        String originName = image.getOriginalFilename();
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
            dog.uploadFile(imagePath, fileName);
        } catch (IOException e) {
            throw new IllegalStateException("파일(이미지) 업로드에 실패했습니다.");
        }
        return dogRepository.save(dog).getId();
    }

    @Override
    @Transactional
    public Long updateDog(Long userId, DogUpdateRequestDto dogUpdateRequestDto, MultipartFile image) {
        User user = userRepository.findById(userId).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        Dog dog = dogRepository.findById(dogUpdateRequestDto.getId()).orElseThrow(() -> new BadRequestException("해당 반려견이 없습니다."));
        if (!dog.getUser().equals(user)) {
            throw new AuthException("권한이 없습니다.");
        }
        dog.update(dogUpdateRequestDto);
        if (image.isEmpty()) {
            return dog.getId();
        }
        // 기존 이미지 삭제
        if (dog.getFileName() != null) {
            amazonS3Client.deleteObject(bucket, dog.getFileName());
        }

        String originName = image.getOriginalFilename();
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
            dog.uploadFile(imagePath, fileName);
        } catch (IOException e) {
            throw new IllegalStateException("파일(이미지) 업로드에 실패했습니다.");
        }
        return dog.getId();
    }

    @Override
    @Transactional
    public void deleteDog(Long userId, Long dogId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        Dog dog = dogRepository.findById(dogId).orElseThrow(() -> new BadRequestException("해당 반려견이 없습니다."));

        if (!dog.getUser().equals(user)) {
            throw new AuthException("권한이 없습니다.");
        }
        // 기존 이미지 삭제
        if (dog.getFileName() != null) {
            amazonS3Client.deleteObject(bucket, dog.getFileName());
        }

        dogRepository.delete(dog);
    }

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

}
