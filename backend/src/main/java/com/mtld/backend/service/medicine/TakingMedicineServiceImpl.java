package com.mtld.backend.service.medicine;

import com.mtld.backend.dto.medicine.TakingMedicineRequestDto;
import com.mtld.backend.dto.medicine.TakingMedicineResponseDto;
import com.mtld.backend.dto.medicine.TakingMedicineUpdateRequestDto;
import com.mtld.backend.entity.user.User;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.entity.medicine.Medicine;
import com.mtld.backend.entity.medicine.TakingMedicine;
import com.mtld.backend.exception.AuthException;
import com.mtld.backend.exception.BadRequestException;
import com.mtld.backend.repository.dog.DogRepository;
import com.mtld.backend.repository.medicine.MedicineRepository;
import com.mtld.backend.repository.medicine.TakingMedicineRepository;
import com.mtld.backend.repository.user.UserRepository;
import com.mtld.backend.util.ConvertDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * created by myeongseok on 2022/09/21
 * updated by myeongseok on 2022/10/03
 */

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class TakingMedicineServiceImpl implements TakingMedicineService {

    private final UserRepository userRepository;

    private final DogRepository dogRepository;

    private final MedicineRepository medicineRepository;

    private final TakingMedicineRepository takingMedicineRepository;

    @Override
    public TakingMedicineResponseDto getTakingMedicineById(Long medicineId) {
        TakingMedicine takingMedicine = takingMedicineRepository.findById(medicineId).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        return TakingMedicineResponseDto.of(takingMedicine);
    }

    @Override
    public List<TakingMedicineResponseDto> getTakingMedicineByDog(Long userId, Long dogId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        Dog dog = dogRepository.findById(dogId).orElseThrow(() -> new BadRequestException("해당 반려견이 없습니다."));
        if (!dog.getUser().equals(user)) {
            throw new AuthException("권한이 없습니다.");
        }
        List<TakingMedicineResponseDto> takingMedicineResponseDtoList = new ArrayList<>();
        for (TakingMedicine takingMedicine : takingMedicineRepository.findByDog(dog)) {
            takingMedicineResponseDtoList.add(TakingMedicineResponseDto.of(takingMedicine));
        }
        return takingMedicineResponseDtoList;
    }

    @Override
    @Transactional
    public void registerTakingMedicine(Long userId, TakingMedicineRequestDto takingMedicineRequestDto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        Dog dog = dogRepository.findById(takingMedicineRequestDto.getDogId()).orElseThrow(() -> new BadRequestException("해당 반려견이 없습니다."));

        if (!dog.getUser().equals(user)) {
            throw new AuthException("권한이 없습니다.");
        }
        Medicine medicine = medicineRepository.findById(takingMedicineRequestDto.getMedicineId()).orElseThrow(() -> new BadRequestException("해당 접종이 없습니다."));
        if (takingMedicineRepository.findByDogAndMedicine(dog, medicine) != null) {
            throw new BadRequestException("이미 약 섭취에 대한 정보가 저장이 되어 있습니다.");
        }
        TakingMedicine takingMedicine = TakingMedicine.builder().medicine(medicine).dog(dog).expectDate(ConvertDate.stringToDate(takingMedicineRequestDto.getExpectDate())).build();

        takingMedicineRepository.save(takingMedicine);
    }

    @Override
    @Transactional
    public void updateTakingMedicine(Long userId, TakingMedicineUpdateRequestDto takingMedicineUpdateRequestDto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        TakingMedicine takingMedicine = takingMedicineRepository.findById(takingMedicineUpdateRequestDto.getId()).orElseThrow(() -> new BadRequestException("해당 반려견이 없습니다."));
        Dog dog = dogRepository.findById(takingMedicine.getDog().getId()).orElseThrow(() -> new BadRequestException("해당 반려견이 없습니다."));
        if (!dog.getUser().equals(user)) {
            throw new AuthException("권한이 없습니다.");
        }

        takingMedicine.update(takingMedicineUpdateRequestDto);
    }

    @Override
    @Transactional
    public void deleteTakingMedicine(Long userId, Long takingMedicineId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        TakingMedicine takingMedicine = takingMedicineRepository.findById(takingMedicineId).orElseThrow(() -> new BadRequestException("해당 반려견이 없습니다."));
        Dog dog = dogRepository.findById(takingMedicine.getDog().getId()).orElseThrow(() -> new BadRequestException("해당 반려견이 없습니다."));
        if (!dog.getUser().equals(user)) {
            throw new AuthException("권한이 없습니다.");
        }
        takingMedicineRepository.delete(takingMedicine);
    }
}
