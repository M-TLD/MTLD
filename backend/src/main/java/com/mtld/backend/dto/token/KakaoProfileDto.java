package com.mtld.backend.dto.token;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * created by seongmin on 2022/09/14
 * updated by seongmin on 2022/09/15
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class KakaoProfileDto {

    public Long id;
    public String connected_at;
    public Properties properties;
    public KakaoAccount kakao_account;

    @Data
    public static class Properties {
        public String nickname;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class KakaoAccount {
        public Boolean profile_nickname_needs_agreement;
        public Boolean email_needs_agreement;
        public Boolean is_email_valid;
        public Boolean is_email_verified;
        public Boolean has_email;
        public String email;
    }
}
