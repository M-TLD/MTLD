package com.mtld.backend.service.vaccine;

import com.mtld.backend.dto.vaccine.VaccinationRequestDto;
import com.mtld.backend.dto.vaccine.VaccinationResponseDto;
import com.mtld.backend.dto.vaccine.VaccinationUpdateRequestDto;
import com.mtld.backend.entity.user.User;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.entity.vaccine.Vaccination;
import com.mtld.backend.entity.vaccine.Vaccine;
import com.mtld.backend.exception.AuthException;
import com.mtld.backend.exception.BadRequestException;
import com.mtld.backend.repository.dog.DogRepository;
import com.mtld.backend.repository.user.UserRepository;
import com.mtld.backend.repository.vaccine.VaccinationRepository;
import com.mtld.backend.repository.vaccine.VaccineRepositpry;
import com.mtld.backend.util.ConvertDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * created by myeongseok on 2022/09/24
 * updated by myeongseok on 2022/10/03
 */

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class VaccinationServiceImpl implements VaccinationService {

    private final UserRepository userRepository;

    private final DogRepository dogRepository;

    private final VaccineRepositpry vaccineRepositpry;

    private final VaccinationRepository vaccinationRepository;

    @Override
    public VaccinationResponseDto getVaccinationResponseDtoById(Long vaccinationId) {
        Vaccination vaccination = vaccinationRepository.findById(vaccinationId).get();

        return VaccinationResponseDto.of(vaccination);
    }

    @Override
    public List<VaccinationResponseDto> getVaccinationByDog(Long userId, Long dogId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        Dog dog = dogRepository.findById(dogId).orElseThrow(() -> new BadRequestException("해당 반려견이 없습니다."));
        if (!dog.getUser().equals(user)) {
            throw new AuthException("권한이 없습니다.");
        }
        List<VaccinationResponseDto> vaccinationResponseDtoList = new ArrayList<>();
        for (Vaccination vaccination : vaccinationRepository.findByDog(dog)) {
            vaccinationResponseDtoList.add(VaccinationResponseDto.of(vaccination));
        }
        return vaccinationResponseDtoList;
    }


    @Override
    @Transactional
    public void registerVaccination(Long userId, VaccinationRequestDto vaccinationRequestDto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        Dog dog = dogRepository.findById(vaccinationRequestDto.getDogId()).orElseThrow(() -> new BadRequestException("해당 반려견이 없습니다."));

        if (!dog.getUser().equals(user)) {
            throw new AuthException("권한이 없습니다.");
        }
        Vaccine vaccine = vaccineRepositpry.findById(vaccinationRequestDto.getVaccineId()).orElseThrow(() -> new BadRequestException("해당 약이 없습니다."));
        if(vaccinationRepository.findByDogAndVaccine(dog,vaccine) != null){
            throw new BadRequestException("이미 백신접종에 대한 정보가 저장이 되어 있습니다.");
        }
        Vaccination vaccination = Vaccination.builder().vaccine(vaccine).dog(dog).expectDate(ConvertDate.stringToDate(vaccinationRequestDto.getExpectDate())).build();

        vaccinationRepository.save(vaccination);
    }


    @Override
    @Transactional
    public void updateVaccination(Long userId, VaccinationUpdateRequestDto vaccinationUpdateRequestDto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        Vaccination vaccination = vaccinationRepository.findById(vaccinationUpdateRequestDto.getId()).orElseThrow(() -> new BadRequestException("해당 반려견이 없습니다."));
        Dog dog = dogRepository.findById(vaccination.getDog().getId()).orElseThrow(() -> new BadRequestException("해당 반려견이 없습니다."));
        if (!dog.getUser().equals(user)) {
            throw new AuthException("권한이 없습니다.");
        }

        vaccination.update(vaccinationUpdateRequestDto);
    }

    @Override
    @Transactional
    public void deleteVaccination(Long userId, Long vaccinationId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        Vaccination vaccination = vaccinationRepository.findById(vaccinationId).orElseThrow(() -> new BadRequestException("해당 반려견이 없습니다."));
        Dog dog = dogRepository.findById(vaccination.getDog().getId()).orElseThrow(() -> new BadRequestException("해당 반려견이 없습니다."));
        if (!dog.getUser().equals(user)) {
            throw new AuthException("권한이 없습니다.");
        }
        vaccinationRepository.delete(vaccination);


    }
}
