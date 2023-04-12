package com.memepatentoffice.mpoffice.domain.user.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserWalletUpdateRequest {
    private Long userId;;
    private String walletAddress;
}
